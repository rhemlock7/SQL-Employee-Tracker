// Bring in libraries so we can use them
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Import the prompts created from their specific js files.
const introPrompt = require('./src/introPrompt');
const roleChanges = require('./src/roleChanges');
const addDepartment = require('./src/newDepartment');
const addEmployee = require('./src/addEmployee');
const updateEmployeeRole = require('./src/updateEmployeeRole');

// Create the connection to my SQL database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'rootroot',
    database: 'business_db'
});

// First Prompt asking what the user wants to receive
const firstPrompt = async () => {
    const introAnswers = await inquirer.prompt(introPrompt);

    switch (introAnswers.options) {

        // * COMPLETE
        case 'View All Employees':
            console.log('Selecting all employees');
            // Query database
            db.query('SELECT * FROM all_employee_data', function (err, results) {
                console.table(results);
                firstPrompt();
                return;
            });
            break;

        // * COMPLETE
        case 'Add Employee':
            // User prompts
            const employeeAnswers = await inquirer.prompt(addEmployee);

            // Formatted user inputs
            const firstName = employeeAnswers.firstName;
            const lastName = employeeAnswers.lastName;
            const employeeRole = employeeAnswers.employeeRole;
            const manager = employeeAnswers.manager;

            const splitManagerName = manager.split(' ');
            const managerFirstName = splitManagerName[0];
            const managerLastName = splitManagerName[1];

            // Get the role ID based on user input
            db.query('SELECT id FROM roles WHERE title=?', [employeeRole], function (err, results) {
                if (err) {
                    console.error(err);
                    firstPrompt();
                    return;
                }

                let roleID = results[0].id;

                // Get the manager ID based on user input
                db.query('SELECT id FROM employees WHERE first_name = ? AND last_name = ?', [managerFirstName, managerLastName], function (err, results) {
                    if (err) {
                        console.error(err);
                        firstPrompt()
                        return;
                    }

                    // If managerID has a value greater than 0, let the variable hold the result. Otherwise set the value to null for the database.
                    let managerID = results.length > 0 ? results[0].id : null;


                    db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleID, managerID], function (err, results) {
                        if (err) {
                            console.error(err);
                            firstPrompt()
                            return;
                        }
                        console.log(`Successfully added ${firstName} as an employee!`)
                        firstPrompt();
                    })
                })
            });

            break;

        // * COMPLETE
        case 'Update Employee Role':
            console.log('Updating Employee Role');

            const updatedRole = await inquirer.prompt(updateEmployeeRole);
            const employeeToUpdate = updatedRole.employeeToUpdate;
            const roleResponse = updatedRole.updatedRole;

            const splitEmpName = employeeToUpdate.split(' ');
            const empFirstName = splitEmpName[0];
            const empLastName = splitEmpName[1];

            // Get the role ID based on user input
            db.query('SELECT id FROM roles WHERE title = ?', [roleResponse], function (err, results) {
                if (err) {
                    console.error(err);
                    process.exit();
                }

                let roleID = results[0].id;

                db.query('UPDATE employees AS e ' +
                    'INNER JOIN (SELECT id FROM employees WHERE first_name = ? AND last_name = ? LIMIT 1) AS subquery ' +
                    'ON e.id = subquery.id ' +
                    'SET e.role_id = ?;',
                    [empFirstName, empLastName, roleID], function (err, results) {
                        if (err) {
                            console.error(err)
                            process.exit();
                        }

                        console.log(`Updated employee role`)
                        firstPrompt();
                    })
            });
            break;

        // * COMPLETE
        case 'View All Roles':
            console.log('Viewing All Roles');
            // Query database
            db.query('SELECT * FROM roles_with_department;', function (err, results) {
                console.table(results);
                firstPrompt();
                return;
            });
            break;

        // * COMPLETE
        case 'Add Role':
            console.log('Adding Role');

            // User prompts
            const roleChangeAnswers = await inquirer.prompt(roleChanges);

            // Formatted user inputs
            const newRole = roleChangeAnswers.newRole;
            const roleSalary = roleChangeAnswers.roleSalary;
            const roleDepartment = roleChangeAnswers.roleDepartment;

            // Get the department ID based on user input
            db.query('SELECT id FROM departments WHERE name=?', [roleDepartment], function (err, results) {
                if (err) {
                    console.error(err);
                    process.exit();
                }

                let departmentID = results[0].id;

                db.query('INSERT INTO business_db.roles (title, salary, department_id) VALUES (?, ?, ?)', [newRole, roleSalary, departmentID], function (err, results) {
                    if (err) {
                        console.error(err)
                        process.exit();
                    }

                    console.log(`Added to new role to db`)
                    firstPrompt();
                })
            });

            break;

        // * COMPLETE
        case 'View All Departments':
            console.log('Showing departments!');
            // Query database
            db.query('SELECT * FROM business_db.departments', function (err, results) {
                console.table(results);
                firstPrompt();
                return;
            });
            break;

        // * COMPLETE
        case 'Add Department':
            // Logic for adding a department
            const departmentAdded = await inquirer.prompt(addDepartment);
            const departmentResponse = departmentAdded.newDepartment;

            db.query('INSERT INTO business_db.departments (name) VALUES (?)', [departmentResponse], function (err, results) {
                if (err) {
                    console.error(err)
                    firstPrompt();
                    return;
                } else {
                    console.log(`Added ${departmentResponse} to departments db`)
                    firstPrompt();
                }
            });
            break;

        // * COMPLETE
        case 'Quit':
            console.log('Quitting');
            // Quit the program
            process.exit();

        default:
            console.log('Invalid option. Please choose a valid option.');
            break;
    }
}

// Call the first prompt upon page load
firstPrompt();
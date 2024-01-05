// Bring in libraries so we can use them
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Import the prompts created from their specific js files.
const introPrompt = require('./src/introPrompt');
const roleChanges = require('./src/roleChanges');
const addDepartment = require('./src/newDepartment');
const addEmployee = require('./src/addEmployee');

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
        
        // TODO -> Need to update employee showcase to display ALL information
        case 'View All Employees':
            console.log('Update this to show ALL employee data.');
            // Query database
            // db.query('SELECT * FROM business_db.employees', function (err, results) {
            //     console.table(results);
            //     firstPrompt();
            // });

            firstPrompt();
            break;

        // TODO
        case 'Add Employee':
            console.log('Adding Employee');

            // User prompts
            const employeeAnswers = await inquirer.prompt(addEmployee);

            // Formatted user inputs
            const firstName = employeeAnswers.firstName;
            const lastName = employeeAnswers.lastName;
            const employeeRole = employeeAnswers.employeeRole;
            const manager = employeeAnswers.manager;


            db.query('INSERT INTO business_db.employees (first_name, last_name) VALUES (?)', [firstName, lastName, employeeRole, manager], function (err, results) {
                if (err) {
                    console.error(err)
                    return;
                } else {
                    console.log(`Added ${departmentResponse} to departments db`)
                }

                firstPrompt();
            });

            break;

        // TODO
        case 'Update Employee Role':
            console.log('Updating Employee Role');

            // Logic for updating an employee role


            firstPrompt();
            break;

        // * COMPLETE
        case 'View All Roles':
            console.log('Viewing All Roles');
            // Query database
            db.query('SELECT * FROM business_db.roles', function (err, results) {
                console.table(results);
                firstPrompt();
            });
            break;

        // TODO:
        case 'Add Role':
            console.log('Adding Role');

            // User prompts
            const roleChangeAnswers = await inquirer.prompt(roleChanges);

            // Formatted user inputs
            const newRole = roleChangeAnswers.newRole;
            const roleSalary = roleChangeAnswers.roleSalary;
            const roleDepartment = roleChangeAnswers.roleDepartment;

            console.log(newRole);
            console.log(roleSalary);
            console.log(roleDepartment);

            // TODO: logic for adding a role goes here
            // db.query('INSERT INTO business_db.roles (title, salary, department_id) VALUES (?)', [departmentResponse], function (err, results) {
            //     if (err) {
            //         console.error(err)
            //         return;
            //     } else {
            //         console.log(`Added ${departmentResponse} to departments db`)
            //     }

            //     firstPrompt();
            // });

            firstPrompt();
            break;

        // * COMPLETE
        case 'View All Departments':
            console.log('Showing departments!');
            // Query database
            db.query('SELECT * FROM business_db.departments', function (err, results) {
                console.table(results);
                firstPrompt();
            });
            break;

        // * COMPLETE
        case 'Add Department':
            console.log('Adding Department');
            // TODO: logic for adding a department goes here
            const departmentAdded = await inquirer.prompt(addDepartment);

            const departmentResponse = departmentAdded.newDepartment;

            console.log('Answers from addDepartment:', departmentResponse);

            db.query('INSERT INTO business_db.departments (name) VALUES (?)', [departmentResponse], function (err, results) {
                if (err) {
                    console.error(err)
                    return;
                } else {
                    console.log(`Added ${departmentResponse} to departments db`)
                }

                firstPrompt();
            });
            break;

        // * COMPLETE
        case 'Quit':
            console.log('Quitting');
            // Quit the program
            process.exit();

        default:
            console.log('Invalid option. Please choose a valid option.');
            firstPrompt();
            break;
    }
}

// Call the first prompt upon page load
firstPrompt();
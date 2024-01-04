// Bring in libraries so we can use them
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Import the prompts created from their specific js files.
const introPrompt = require('./src/introPrompt');
const newDepartment = require('./src/newDepartment');
const roleChanges = require('./src/roleChanges');
const addDepartment = require('./src/newDepartment');

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
    //console.log('RESPONSE:', introAnswers.options);

    switch (introAnswers.options) {
        case 'View All Employees':
            console.log('Showing all employees!!');
            // Query database
            db.query('SELECT * FROM business_db.employees', function (err, results) {
                console.table(results);
                firstPrompt();
            });
            break;

        case 'Add Employee':
            console.log('Adding Employee');

            // TODO: logic for adding an employee goes here

            firstPrompt();
            // End the conditional
            break;

        case 'Update Employee Role':
            console.log('Updating Employee Role');

            // Logic for updating an employee role
            const roleChangeAnswers = await inquirer.prompt(roleChanges);
            console.log('Answers from roleChanges:', roleChangeAnswers);

            // User inputs
            const newRole = roleChangeAnswers.newRole;
            const roleSalary = roleChangeAnswers.roleSalary;
            const roleDepartment = roleChangeAnswers.roleDepartment;

            firstPrompt();
            break;

        case 'View All Roles':
            console.log('Viewing All Roles');
            // Query database
            db.query('SELECT * FROM business_db.roles', function (err, results) {
                console.table(results);
                firstPrompt();
            });
            break;

        case 'Add Role':
            console.log('Adding Role');
            // TODO: logic for adding a role goes here
            firstPrompt();
            break;

        case 'View All Departments':
            console.log('Showing departments!');
            // Query database
            db.query('SELECT * FROM business_db.departments', function (err, results) {
                console.table(results);
                firstPrompt();
            });
            break;

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




// ;(async () => {

//     


// })();
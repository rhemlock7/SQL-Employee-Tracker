const mysql = require('mysql2');

// Create the connection to my SQL database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'rootroot',
    database: 'business_db',
});

// Initialize the arrays
let departments = [];

// Grab all departments from the db and push them to the roles array
db.query('SELECT * FROM departments', function (err, results) {
    // Map the results to the expected format for Inquirer
    const formattedDepartments = results.map((role) => ({
        name: role.name, // Use the property that represents the display name
    }));

    // Log names of all roles
    formattedDepartments.forEach((role) => {
        departments.push(role.name)
    });
});

const addRole = [
    {
        type: 'text',
        message: 'What is the name of their new role?',
        name: 'newRole',
    },
    {
        type: 'text',
        message: 'What is the salary of the role?',
        name: 'roleSalary',
    },
    {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'roleDepartment',
        choices: departments
    }
];

module.exports = addRole;
const mysql = require('mysql2');

// Create the connection to my SQL database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'rootroot',
    database: 'business_db',
});

// Initialize the arrays
let roles = [];
let employees = [];

// Grab all roles from the db and push them to the roles array
db.query('SELECT * FROM roles', function (err, results) {
    // Map the results to the expected format for Inquirer
    const formattedRoles = results.map((role) => ({
        name: role.title, // Use the property that represents the display name
    }));

    // Log names of all roles
    formattedRoles.forEach((role) => {
        roles.push(role.name)
    });
});

// Grab all roles from the db and push them to the roles array
db.query('SELECT * FROM employees', function (err, results) {

    // Map the results to the expected format for Inquirer
    const formattedEmployees = results.map((name) => ({
        firstName: name.first_name, // Grab the first name
        lastName: name.last_name // Grab the last name
    }));
    
    // Log names of all names
    formattedEmployees.forEach((name) => {
        const fullName = `${name.firstName} ${name.lastName}`
        employees.push(fullName);
    });

});

const addEmployee = [
    {
        type: 'list',
        message: `Who's role would you like to update?`,
        name: 'employeeToUpdate',
        choices: employees,
    },
    {
        type: 'list',
        message: `What is the employee's new role?`,
        name: 'updatedRole',
        choices: roles,
    }
];

module.exports = addEmployee;
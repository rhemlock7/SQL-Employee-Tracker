// Bring in libraries so we can use them
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Import the prompts created from their specific js files.
const introPrompt = require('./introPrompt');
const addEmployee = require('./addEmployee');
const roleChanges = require('./roleChanges');

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
    console.log('RESPONSE:', introAnswers.options);

    if (introAnswers.options === 'View All Departments') {
        console.log('Showing departments!');

        // Query database
        db.query('SELECT * FROM business_db', function (err, results) {
            console.log(results);
        });
    }
}



// ;(async () => {

//     const employeeAnswers = await inquirer.prompt(addEmployee);
//     console.log('Answers from addEmployee:', employeeAnswers);

//     const roleChangeAnswers = await inquirer.prompt(roleChanges);
//     console.log('Answers from roleChanges:', roleChangeAnswers);
// })();


// Call the first prompt upon page load
firstPrompt();
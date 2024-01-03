const addEmployee = [
    {
        type: 'text',
        message: 'What is the name of the role?',
        name: 'roleVerification',
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
        choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service']
    }
];

module.exports = addEmployee;



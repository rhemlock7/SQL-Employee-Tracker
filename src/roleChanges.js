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
        choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service']
    }
];

module.exports = addRole;
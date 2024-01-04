-- Insert data into 'employees' table
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'John', 'Doe', 1, NULL),
    (2, 'Jane', 'Smith', 2, 1),
    (3, 'Bob', 'Johnson', 1, 2),
    (4, 'Alice', 'Williams', 3, 1)

-- Insert data into 'departments' table
INSERT INTO departments (id, name)
VALUES ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales')

-- Insert data into 'roles' table
INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'HR Manager', 70000, 1),
    (2, 'Software Engineer', 80000, 2),
    (3, 'Marketing Specialist', 60000, 3)
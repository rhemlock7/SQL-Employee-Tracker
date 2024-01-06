-- Create the 'departments' table with fake data
INSERT INTO departments (name) VALUES
('Engineering'),
('Finance'),
('Marketing'),
('Human Resources');

-- Create the 'roles' table with fake data
INSERT INTO roles (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Financial Analyst', 70000, 2),
('Marketing Specialist', 60000, 3),
('HR Manager', 75000, 4);

-- Create the 'employees' table with fake data
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Bob', 'Johnson', 1, 2),
('Alice', 'Williams', 3, 1),
('Charlie', 'Brown', 4, 2),
('Eva', 'Davis', 2, 1);
-- Insert data into 'departments' table
INSERT INTO departments (name) VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

-- Insert data into 'roles' table
INSERT INTO roles (title, salary, department_id) VALUES
('HR Manager', 70000, 1),
('Software Engineer', 80000, 2),
('Marketing Specialist', 60000, 3);

-- Insert data into 'employees' table
INSERT INTO employees (first_name, last_name, manager_id) VALUES
('John', 'Doe', NULL),
('Jane', 'Smith', 1),
('Bob', 'Johnson', 2),
('Alice', 'Williams', 1);

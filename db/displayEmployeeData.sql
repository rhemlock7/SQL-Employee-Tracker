USE business_db;
CREATE VIEW all_employee_data AS
SELECT
    employees.id,
    employees.first_name,
    employees.last_name,
    employees.role_id,
    roles.department_id AS department,
    roles.salary AS salary
FROM
    employees
JOIN
    roles ON employees.role_id = roles.id
JOIN
    departments ON roles.department_id = departments.id;

SELECT * FROM all_employee_data;

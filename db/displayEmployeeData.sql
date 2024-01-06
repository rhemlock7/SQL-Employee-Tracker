USE business_db;

-- Drop the view if it exists
DROP VIEW IF EXISTS all_employee_data;

CREATE VIEW all_employee_data AS
SELECT
    e.id,
    e.first_name,
    e.last_name,
    r.title AS role,
    d.name AS department,
    r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM
    employees e
JOIN
    roles r ON e.role_id = r.id
JOIN
    departments d ON r.department_id = d.id
LEFT JOIN
    employees m ON e.manager_id = m.id;

SELECT * FROM all_employee_data;
USE business_db;

CREATE VIEW roles_with_department AS
SELECT roles.id, roles.title, roles.salary, departments.name AS department_name
FROM roles
JOIN departments ON roles.department_id = departments.id;

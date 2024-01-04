DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE employees(
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INT,
    manager_id INT
);

CREATE TABLE departments(
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary INT,
    department_id INT
);
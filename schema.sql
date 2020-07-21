DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE employee (
  -- Code Starts Here
id INT NOT NULL, 
first_name VARCHAR(100),
last_name VARCHAR(100),
role_id INT(10),
manager_id INT(10),
PRIMARY KEY (id)
  -- Code Ends Here
);

CREATE TABLE roles (
  -- Code Starts Here
id INT NOT NULL, 
title VARCHAR(10),
salary DECIMAL(10,2),
department_id INT(10),
PRIMARY KEY (id)
  -- Code Ends Here
);

CREATE TABLE department (
  -- Code Starts Here
id INT NOT NULL, 
employeeName VARCHAR(10),
PRIMARY KEY (id)
  -- Code Ends Here
);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
values ('Kelechi', 'Okoro', 12, 100); 

INSERT roles (title, salary, department_id)
values ('Marketing Manager', 500,000.00, 420)

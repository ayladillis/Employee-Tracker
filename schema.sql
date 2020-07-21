DROP DATABASE IF EXISTS employeetrackerDB;
CREATE database employeetrackerDB;

USE employeetrackerDB;

CREATE TABLE employee (
  -- Code Starts Here
id INT NOT NULL AUTO_INCREMENT, 
first_name VARCHAR(100),
last_name VARCHAR(100),
role_id INT(10),
manager_id INT(10),
PRIMARY KEY (id)
  -- Code Ends Here
);

CREATE TABLE roles (
  -- Code Starts Here
id INT NOT NULL AUTO_INCREMENT, 
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INT(10),
PRIMARY KEY (id)
  -- Code Ends Here
);

CREATE TABLE department (
  -- Code Starts Here
id INT NOT NULL AUTO_INCREMENT, 
employeeName VARCHAR(10),
PRIMARY KEY (id)
  -- Code Ends Here
);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Kelechi', 'Okoro', 12, 100); 

INSERT INTO roles (title, salary, department_id)
VALUES ('Marketing Manager', 50043.00, 40);

INSERT INTO department (employeeName)
VALUES ('Nick');



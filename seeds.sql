DROP DATABASE IF EXISTS employeetrackerDB;
CREATE database employeetrackerDB;

USE employeetrackerDB;

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Kelechi', 'Okoro', 12, 100); 

INSERT INTO roles (title, salary, department_id)
VALUES ('Marketing Manager', 50043.00, 40);

INSERT INTO department (employeeName)
VALUES ('Nick');

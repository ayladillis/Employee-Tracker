// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "greatbayDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // connection.end();
  });
  
inquirer.prompt ([
    {
        type: "list",
        name: "first",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager"
        ]
    },
    {
        type: "list",
        name: "remove",
        message: "Who would you like to remove?",
        choices: [
            " "
        ]
    },
    {
        type: "input",
        name: "firstName",
        message: "What is the employees first name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "What is the employees last name?"
    },
    {
        type: "list",
        name: "role",
        message: "What is the employees role?",
        choices: [
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Account Manager",
            "Accountant",
            "Legal Team Lead"
        ]
    },
    {
        type: "list",
        name: "manager",
        message: "Who is the employees manager?",
        choices: [
            "None",
            "Ayla Dillis",
            "Sabrina Sulliman",
            "Carolyn Hernandez",
            "Alisa Nguyne-Le"
        ]
    }
])  
// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

require("console.table");
var cTable = console.table;

const util = require("util");
const { connect } = require("http2");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeetrackerDB"
});

connection.queryPromise = util.promisify(connection.query);

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runQuestions();
  });
  
function runQuestions() {
inquirer
    .prompt ({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            'Add Department',
            "Add Employee",
            "Add Role",
            "View Department",
            "View Role",
            "View Employee",
            "Update Employee Role"
        ]
    })
        .then(function(answer) {
            switch (answer.action) {
            case "Add Department":
                // call the add department function
                addDepartment();
                break;
            
            case "Add Role":
                // call the add role function
                addRole();
                break;

            case "Add Employee":
                addEmployees();
                break;

            case 'View Department': 
                // call the view department function
                viewDepartments();
                break;

            case 'View Role': 
                // call the view role function
                viewRole();
                break;

            case 'View Employee':
                viewEmployee();
                break;

            case "Update Employee Role":
                updateRole();
                break;

            }
        });

    }

    function addEmployees(){
        connection.queryPromise('SELECT * FROM roles')
        .then(function(roles){
            connection.queryPromise('SELECT * FROM employee')
                .then(function(employees) {
                    employees = employees.map(function (employee) {
                        return {
                            value: employee.id,
                            name: employee.first_name + ' ' + employee.last_name,

                        }
                    })
                    employees.push({ name: 'None', value: 'none' });

                    inquirer.prompt([
                        {
                            name: 'first_name',
                            message: 'Enter the first name: ',
                            type: 'input',
                        },
                        {
                            name: 'last_name',
                            message: "Enter the last name: ",
                            type: "input",
                        },
                        //ask the first_name, last_name
                        {
                            message: "Select the role for the employee",
                            name: "role_id",
                            type: "list",
                            choices: roles.map(function(role){
                                return {
                                    name: role.title,
                                    value: role.id,
                                }
                            })
                        },
                        {
                            message: "Select the manager: ",
                            name: "manager_id",
                            type: "list",
                            choices: employees
                        }
                    ]).then(function(answers){
                        console.log(answers);
                        if (answers.manager_id === 'none') {
                            //run the query without manager_id here
                            connection.queryPromise('INSERT INTO employee (first_name, last_name, role_id) VALUES ( ?, ?, ?)', [answers.first_name, answers.last_name, answers.role_id]);

                        }else{
                            connection.queryPromise('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
                            // run the query with the manager_id here
                        }
                        runQuestions();
                    });
                });
            // roles from mysql
        });
    }


function addDepartment() {
    // ask for the name of the department
    // save the department into the database
        inquirer.prompt({
               name: 'employeeName',
               message: 'Enter the department name: ',
               type: 'input',
            
            })
            .then(function(answer) {
            connection.queryPromise('INSERT INTO department (employeeName) VALUES (?)', [answer.employeeName]);
            runQuestions();
        });
    }
   


function addRole() {
    // ask for the title, salary, department
    // departments => retrieve departments from the database, list those as options
    // saving the role into the database
    connection.queryPromise('SELECT * FROM department')
    .then(function(department){

    inquirer.prompt([
        {
        name: 'title',
        message: 'What is the role title?',
        type: 'input',
        },
        {
        name: 'salary',
        message: 'What is the salary',
        type: 'input'
        }
    ]);
});
}



function viewDepartments() {
    // retrieving the departments from the database
    // display the departments on the page
    // use console.table
    connection.queryPromise('SELECT * FROM department').then(function(departments) {
        cTable(departments.map(function(value){
            return {
                id: value.id,
                employeeName: value.employeeName
            }
        })
        );
        //loop through, construct array of objects, console table that array
        // console.log(departments)
        runQuestions();
    });
    // cTable(departments)
}

function viewRole() {
    connection.queryPromise('SELECT * FROM roles').then(function(role) {
       cTable(role.map(function(value){
           return {
            id: value.id,
            title: value.title,
            salary: value.salary,
            department_id: value.department_id
           }
       })
       );
    //    console.log(role);
    runQuestions();
    });
}

function viewEmployee() {
    connection.queryPromise('SELECT * FROM employee').then(function(employee) {
       cTable(employee.map(function(value){
            return{
                id: value.id,
                first_name: value.first_name,
                last_name: value.last_name,
                role_id: value.role_id,
                manager_id: value.manager_id
            }
        })
        );
        // console.log(employee);
        runQuestions();
    });
}

function updateRole() {

}
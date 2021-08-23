const inquirer = require('inquirer'); //import inquier
require('dotenv').config();
//const sequelize = require('./config/connection');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to database.`)
);


function init() {
    mainMenu();
}

const menu = [{ //main menu
    type: 'list',
    message: 'Main Menu',
    name: 'menuChoice',
    choices: ['Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departmements', 'Add Department', 'View All Employees', 'Quit'],
  }];

function mainMenu() {
    inquirer.prompt(menu).then((menuAnswers) => { 
      if (menuAnswers.menuChoice === 'Add Employee') AddEmployee();
      if (menuAnswers.menuChoice === 'Update Employee Role') UpdateEmployeeRole();
      if (menuAnswers.menuChoice === 'View All Roles') ViewAllRoles();
      if (menuAnswers.menuChoice === 'Add Role') AddRole();
      if (menuAnswers.menuChoice === 'View All Departmements') ViewAllDepartmements();
      if (menuAnswers.menuChoice === 'Add Department') AddDepartment();
      if (menuAnswers.menuChoice === 'View All Employees') ViewAllEmployees();
      if (menuAnswers.menuChoice === 'Quit') process.exit();
    });
}

init();


const AddEmployeeQuestions = [{ //questions list for Add employee menu
    type: 'input',
    name: 'first_name',
    message: "What is this employees First name?"
  },
  {
    type: 'input',
    name: 'last_name',
    message: "What is this employees Last name?"
  },
  {
    type: 'list',
    message: 'What is the employees role?',
    name: 'employee_Role',
    choices: ['Sales Lead', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service', 'Sales Lead', 'Salesperson', 'Lead Engineer' ],
  },
  {
    type: 'input',
    name: 'employees_Manager',
    message: "Who is their Manager?"
    //choices: get list of names from db
  },
];

function AddEmployee() {
    inquirer.prompt(AddEmployeeQuestions).then((addEmployeeAnswers) => {
      //console.log("AddEmployeeQuestion answers: ", addEmployeeAnswers.first_name);
      console.table(addEmployeeAnswers);
      mainMenu(); //return to main menu
    });
}

function UpdateEmployeeRole() {
  // select employee
  // change role based on input

}

function ViewAllRoles() {
  db.query('SELECT title FROM role', function(err, results) {
    console.table(results); } );
}

function AddRole() {
  
 //get name of role
}

function ViewAllDepartmements() {
  db.query('SELECT name FROM department', function(err, results) {
    console.table(results); } );
}

function AddDepartment() {
  //questions to add department
}

function ViewAllEmployees() {
  db.query('SELECT * FROM employee', function(err, results) {
    console.table(results); } );
}
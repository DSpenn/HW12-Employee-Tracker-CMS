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
      if (menuAnswers.menuChoice === 'View All Departmements') ViewAllDepartments();
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
    //choices: ViewAllRoles(),
    choices: ['1: Sales Lead', '2: Lead Engineer', '3: Software Engineer', '4: Account Manager', '5: Accountant', '6: Legal Team Lead', '7: Lawyer', '8: Customer Service', '9: Sales Lead', '10: Salesperson', '11: Lead Engineer' ],
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
      console.table(addEmployeeAnswers);
      db.query("INSERT INTO employee SET ?", 
      { first_name: addEmployeeAnswers.first_name, last_name: addEmployeeAnswers.last_name, 
        manager_id: addEmployeeAnswers.employees_Manager,
        role_id: addEmployeeAnswers.employee_Role.charAt(0) },
       function(err, results) {     
        console.log(results);
        console.log('\n'+err);
      });
      mainMenu(); //return to main menu
    });
}

function UpdateEmployeeRole() {
  db.query('SELECT * FROM employee', function(err, results) {
    console.table(results);
  });
  mainMenu();
}

function ViewAllRoles() {
  db.query('SELECT title FROM role', function(err, results) {
    console.table(results);
    return results; } );
  mainMenu();
}

function AddRole() {
  
 //get name of role
}

function ViewAllDepartments() {
  db.query('SELECT name FROM department', function(err, departments) {
    console.table(departments); } );
  mainMenu();
}

function AddDepartment() {
  //questions to add department
}

function ViewAllEmployees() {
  db.query('SELECT * FROM employee', function(err, results) {
    console.table(results); 
   } );
  mainMenu();
}

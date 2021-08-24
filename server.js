const inquirer = require('inquirer'); //import inquier
require('dotenv').config();
//const sequelize = require('./config/connection');
const mysql = require('mysql2/promise');
const consoleTable = require('console.table');
const db = mysql.createPool({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME});
var currentEmployees = [];
var currentDepartments = [];
var CurrentRoles = [];


function main() {
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

main();


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
    choices: ['1: Sales Lead', '2: Lead Engineer', '3: Software Engineer', '4: Account Manager', '5: Accountant', '6: Legal Team Lead', '7: Lawyer', '8: Customer Service', '9: Sales Lead', '10: Salesperson', '11: Lead Engineer' ],
    //choices: [CurrentRoles.map(obj => obj.name)]
  },
  {
    type: 'list',
    name: 'employees_Manager',
    message: "Who is their Manager?",
    choices: [currentEmployees.map(obj => obj.last_name)]
    //default: '1'
  }
];

async function AddEmployee() {
  //console.log(" in add emp currentEmployees", currentEmployees);
  //console.log("ViewAllEmployees()" , ViewAllEmployees());
  const addEmployeeAnswers = await inquirer.prompt(AddEmployeeQuestions);
  console.table(addEmployeeAnswers);
  await db.query( 'INSERT INTO employee SET ?', 
    { first_name: addEmployeeAnswers.first_name, last_name: addEmployeeAnswers.last_name, manager_id: addEmployeeAnswers.employees_Manager,
    role_id: addEmployeeAnswers.employee_Role.charAt(0) } );
  mainMenu();
}

function UpdateEmployeeRole() { //redo
  db.query('SELECT * FROM employee', function(err, results) {
    console.table(results);
  });
  mainMenu();
}

// job title, role id, the department that role belongs to, and the salary for that role
async function ViewAllRoles() {
  [CurrentRoles] = await db.query('SELECT * FROM role');
  //console.log("CurrentRoles", CurrentRoles); //object
  console.table(CurrentRoles);
  mainMenu();
  return CurrentRoles;
}

function AddRole() {
  //inquier prompts
}

//department names and department ids DONE
async function ViewAllDepartments() {
  [currentDepartments] = await db.query('SELECT * FROM department');
  console.table(currentDepartments);
  //console.log(currentDepartments);
  mainMenu();
  return currentDepartments[0];
}

function AddDepartment() {
  //inquier prompts to add department
}

//employee ids, first names, last names, job titles, departments, salaries, and managers
async function ViewAllEmployees() {
  [currentEmployees] = await db.query('SELECT * FROM employee');
  //console.table(currentEmployees);
  console.log("currentEmployees.map(obj => obj.first_name)," + currentEmployees.map(obj => obj.last_name))
  mainMenu();
  //console.log(" post currentEmployees", currentEmployees);
  return currentEmployees;
}

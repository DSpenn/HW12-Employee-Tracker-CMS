const inquirer = require('inquirer'); //import inquier
require('dotenv').config();
//const sequelize = require('./config/connection');
const mysql = require('mysql2/promise');
const consoleTable = require('console.table');
const db = mysql.createPool({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME});
//const promisePool = db.promise();
//rowsasarray:true
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


//async function AddEmployee() {
  AddEmployee = async () =>  {
    let mgrChoices = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS manager FROM employee');
    Promise.all(mgrChoices);
    console.log("mgrChoices.map(obj => obj.Manager", mgrChoices.manager);
  //const addEmployeeAnswers = await inquirer.prompt(AddEmployeeQuestions);

  inquirer.prompt([ 
    { //questions list for Add employee menu
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
    type: 'list+',
    name: 'employees_Manager',
    message: "what is their Managers ID?",
    choices: mgrChoices.map(obj => obj.Manager)
}
]).then(addEmployeeAnswers => {
  db.query( 'INSERT INTO employee SET ?', 
  { first_name: addEmployeeAnswers.first_name, last_name: addEmployeeAnswers.last_name, manager_id: addEmployeeAnswers.employees_Manager,
  role_id: addEmployeeAnswers.employee_Role.charAt(0) } );


  mainMenu();
});

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

async function AddDepartment() {
}

//employee ids, first names, last names, job titles, departments, salaries, and managers
async function ViewAllEmployees() {
  //const currentEmployees = await db.query({ rowsAsArray: true, sql: 'SELECT * FROM employee' });
  const currentEmployees = await db.query('SELECT * FROM employee');
  console.table(currentEmployees[0]);
  //console.log("currentEmployees.map(obj => obj.first_name)," + currentEmployees.map(obj => obj.last_name))
  mainMenu();
  //console.log(" post currentEmployees", currentEmployees[0]);
  //Promise.all(currentEmployees[0]);
  return currentEmployees;
}

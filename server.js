const inquirer = require('inquirer'); //import inquier
require('dotenv').config();
//const sequelize = require('./config/connection');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const db = mysql.createConnection({host: process.env.DB_HOST,port: 3306, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME});//rowsasarray:true
var currentEmployees = [];
var currentDepartments = [];
var CurrentRoles = [];
var mgrChoices = [];
var employeeArray = [];


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



function AddEmployee() {
  db.query('SELECT id, CONCAT(first_name, " ", last_name) AS manager FROM employee', function (err, results) {
    //console.table(results);
    console.log("results.length", results.length)    
    for (i = 0; i < results.length; i++) {
      employeeArray.push(results[i].manager);
      }
      console.info("ASDSADSADSADAS" , employeeArray[0]);
      console.log("employeeArray.length in ", employeeArray.length);
      for(var i=0; i < employeeArray.length; i++) {
        console.log("ba", employeeArray[i] + "!");
      }
  console.log("employeeArray.length out", employeeArray.length);


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
    type: 'list',
    name: 'employees_Manager',
    message: "what is their Managers ID?",
    choices: employeeArray
  }
  ]).then(addEmployeeAnswers => {
    db.query( 'INSERT INTO employee SET ?', 
    { first_name: addEmployeeAnswers.first_name, last_name: addEmployeeAnswers.last_name, manager_id: addEmployeeAnswers.employees_Manager,
    role_id: addEmployeeAnswers.employee_Role.charAt(0) } );
    mainMenu();
      });
});
} 


function UpdateEmployeeRole() { //redo
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    results.forEach((value) => {
      mgrChoices.push(value.first_name + " " + value.last_name);
      console.log(mgrChoices);
    console.table(mgrChoices);
  });
  mainMenu();
})}

// job title, role id, the department that role belongs to, and the salary for that role

function ViewAllRoles() {
  db.query(`SELECT CONCAT(employee.first_name, " ", employee.last_name) AS Name, role.title, role.salary, department.name as Department FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    ORDER BY role.title`, function (err, results) {
  console.table(results);
  CurrentRoles = results;
}  );
  mainMenu();
  return CurrentRoles;
}

function AddRole() {
  //inquier prompts
}


//department names and department ids DONE
function ViewAllDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    //currentDepartments.push(results);
    console.table(results);
    results.forEach((value) => {
      currentDepartments.push(value.name);
  });
  console.log(currentDepartments);
  
  });

  //console.log(currentDepartments);
  console.log("****************");
  //console.table(currentDepartments);
  console.log(currentDepartments);
  //console.log("CD", currentDepartments);
  mainMenu();
  return currentDepartments;
}

function AddDepartment() {
}

//employee ids, first names, last names, job titles, departments, salaries, and managers
function ViewAllEmployees() {

  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
  });
  mainMenu();
  //console.log(" post currentEmployees", currentEmployees[0]);
  //Promise.all(currentEmployees[0]);
  return currentEmployees;
}

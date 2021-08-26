const inquirer = require('inquirer'); //import inquier
require('dotenv').config();
const mysql = require('mysql2');
const consoleTable = require('console.table');
const db = mysql.createConnection({host: process.env.DB_HOST,port: 3306, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME});//rowsasarray:true

var currentEmployees = [];
var currentDepartments = [];
var CurrentRoles = [];
var employeeArray = [];

function main() {
    mainMenu();
    //console.log("currentEmployees in main", currentEmployees);
    //console.log("'\n''\n'");
    //console.log("'\n'currentDepartments in main: " + currentDepartments);
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


//needs var for role
function AddEmployee() {
  db.query('SELECT id, CONCAT(first_name, " ", last_name) AS manager FROM employee', function (err, results) 
{
    console.table(results);
    for (i = 0; i < results.length; i++) {
      console.log(results[i].id+" "+results[i].manager);
      }

    console.log("results.length", results.length)    
    
    for (i = 0; i < results.length; i++) {
      employeeArray.push(results[i].id+" "+results[i].manager);
    }

      for(var i=0; i < employeeArray.length; i++) {
        console.log("test array", employeeArray[i]);
      }

  inquirer.prompt([{ //questions list for Add employee menu
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
    choices: ['1: Sales Lead', '2: Lead Engineer', '3: Software Engineer', '4: Account Manager', '5: Accountant', '6: Legal Team Lead', '7: Lawyer', '8: Customer Service', '9: Salesperson' ],
  },
  {
    type: 'list',
    name: 'employees_Manager',
    message: "what is their Managers ID?",
    choices: employeeArray
  }
  ]).then(addEmployeeAnswers => {
    db.query( 'INSERT INTO employee SET ?', { first_name: addEmployeeAnswers.first_name, last_name: addEmployeeAnswers.last_name,
      manager_id: addEmployeeAnswers.employees_Manager.charAt(0),role_id: addEmployeeAnswers.employee_Role.charAt(0) } );
    main();
  })
});
}

//CONCAT(employee.first_name, " ", employee.last_name) AS Name,
// db.query(`SELECT role.title, role.id, department.name as Department, role.salary FROM employee 
//  db.query(`SELECT CONCAT(employee.first_name, " ", employee.last_name) AS Name, role.title, role.salary, department.name as Department FROM employee 
//  db.query(`SELECT role.title, role.id, department.name as Department, role.salary,CONCAT(employee.first_name, " ", employee.last_name) AS Name FROM employee 
function ViewAllRoles() { // job title, role id, the department that role belongs to, and the salary for that role Done
  db.query(`SELECT DISTINCT role.title, role.id, department.name as Department, role.salary FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    ORDER BY role.title`, function (err, results) {
  console.log("'\n'");
  console.table(results);
}  );
  main();
}

//department names and department ids DONE
function ViewAllDepartments() {
  db.promise().query("SELECT * FROM department")
  .then( ([rows,fields]) => {
    //console.log("department rows ", rows);
    console.table(rows);
    rows.forEach((value) => {
      //console.log("value", value);
      currentDepartments.push(value);
    });
  })
  .catch(console.log)
  .then( () => db.close());
  main();
  return currentDepartments;
}

function UpdateEmployeeRole() { 
// prompted to select an employee to update and their new role
}

function AddDepartment() {
  //inq prompt for name of new department.
}

function AddRole() { 
  //inq prompt name, salary, and department

}

//* View employees by department.

//* View employees by manager.


//employee ids, first names, last names, job titles, departments, salaries, and managers DONE
function ViewAllEmployees() {
  db.query(`SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS Name, role.title, role.salary, department.name as Department, CONCAT(mgr.first_name, " ", mgr.last_name) AS manager FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    LEFT JOIN employee mgr ON mgr.id = employee.manager_id
    ORDER BY role.title`, function (err, results) {
  console.log("'\n'");
  console.table(results);
  results.forEach((value) => {
    //console.log("value", value);
    currentEmployees.push(value);
  });
  main();
  }  );
}


  //console.log(" post currentEmployees", currentEmployees[0]);
  //Promise.all(currentEmployees[0]);

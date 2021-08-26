const inquirer = require('inquirer'); //import inquier
require('dotenv').config();
const mysql = require('mysql2');
const consoleTable = require('console.table');
const db = mysql.createConnection({host: process.env.DB_HOST,port: 3306, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME});//rowsasarray:true

var currentEmployees = [];
var currentDepartments = [];
var employeeArray = [];
var rolesArray = [];

const menu = [{ //main menu
    type: 'list',
    message: 'Main Menu',
    name: 'menuChoice',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departmements', 'Add Department', 'ViewEmployeesByDepartment', 'ViewEmployeesByManager', 'Quit'],
  }];

function mainMenu() {
    inquirer.prompt(menu).then((menuAnswers) => { 
      if (menuAnswers.menuChoice === 'View All Employees') ViewAllEmployees();
      if (menuAnswers.menuChoice === 'Add Employee') AddEmployee();
      if (menuAnswers.menuChoice === 'Update Employee Role') UpdateEmployeeRole();
      if (menuAnswers.menuChoice === 'View All Roles') ViewAllRoles();
      if (menuAnswers.menuChoice === 'Add Role') AddRole();
      if (menuAnswers.menuChoice === 'View All Departmements') ViewAllDepartments();
      if (menuAnswers.menuChoice === 'Add Department') AddDepartment();
      if (menuAnswers.menuChoice === 'ViewEmployeesByDepartment') ViewEmployeesByDepartment();
      if (menuAnswers.menuChoice === 'ViewEmployeesByManager') ViewEmployeesByManager();
      if (menuAnswers.menuChoice === 'Quit') process.exit();
    });
}

main();

function AddEmployee() {
  db.query('SELECT id, CONCAT(first_name, " ", last_name) AS manager FROM employee', function (err, results) 
  {
    employeeArray = [];
    console.table(results);

    console.log("results.length/ employee Count", results.length)    
    for (i = 0; i < results.length; i++) {
      employeeArray.push(results[i].id+" "+results[i].manager);
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
    //choices: ['1: Sales Lead', '2: Lead Engineer', '3: Software Engineer', '4: Account Manager', '5: Accountant', '6: Legal Team Lead', '7: Lawyer', '8: Customer Service', '9: Salesperson' ],
    choices: rolesArray
  },
  {
    type: 'list',
    name: 'employees_Manager',
    message: "what is their Managers ID?",
    choices: employeeArray
  }
  ]).then(addEmployeeAnswers => {
      db.query( 'INSERT INTO employee SET ?', { first_name: addEmployeeAnswers.first_name, last_name: addEmployeeAnswers.last_name,
        manager_id: addEmployeeAnswers.employees_Manager.charAt(0),role_id: addEmployeeAnswers.employee_Role.charAt(0) });
      main();
  })
  });
}

function ViewAllRoles() { // job title, role id, the department that role belongs to, and the salary for that role Done
  rolesArray = [];
  db.query(`SELECT DISTINCT role.title, role.id, department.name as Department, role.salary FROM role 
    LEFT JOIN department ON role.department_id = department.id 
    ORDER BY role.id`, function (err, results) 
    {
      console.log("'\n'");
      console.table(results);
      results.forEach((value) => 
      {
        //console.log("value", value);
        rolesArray.push(value.id+" "+value.title);
      });
    main();
  });
}
    
function ViewAllDepartments() { //department names and department ids DONE
  currentDepartments = []; // clear incase ran multiple times.
  db.promise().query("SELECT * FROM department")
  .then( ([rows,fields]) => {
    console.table(rows);
    rows.forEach((value) => {
      //console.log("value", value);
      currentDepartments.push(value);
    });
    main();
  });
}

function UpdateEmployeeRole() {

}

function AddDepartment() { 
  inquirer.prompt([{    
  type: 'input',
  name: 'name',
  message: "What is this department called?"
  }]).then(newDepartment => {
      db.query( 'INSERT INTO department SET ?', { name: newDepartment.name });
    main();
  })
}

function AddRole() {  // needs call for department id / choices list
  //inq prompt name, salary, and department
  inquirer.prompt([{    
    type: 'input',
    name: 'name',
    message: "What is this department called?"
    },
    {
    type: 'input',
    name: 'salery',
    message: "What is the salery?"
    },
    {
    type: 'input',
    name: 'department_id',
    message: "What is the department_id?"
    }
  ]).then(newRole => {
        db.query( 'INSERT INTO role SET ?', { name: newRole.name, salery: newRole.salery, department_id: newRole.department_id });
      main();
    })


}

function ViewEmployeesByDepartment() {

}

function ViewEmployeesByManager() {

}

function ViewAllEmployees() {// Done employee ids, first names, last names, job titles, departments, salaries, and managers DONE
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
  });
}

function main() {
  mainMenu();
  //console.log(currentEmployees);
  //console.log("'\n''\n'");
  console.log(currentDepartments);
  //console.log("'\n''\n'");
  //console.log(rolesArray)

  // push values to array only if they dont exist?
  //employee array and current employees mostly same
}

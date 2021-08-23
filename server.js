const inquirer = require('inquirer'); //import inquier
//const mysql = require('mysql2');
//const consoleTable = require('console.table');

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
      if (menuAnswers.menuChoice === 'Exit') process.exit();
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
    inquirer.prompt(AddEmployeeQuestions).then((answers) => {
      console.log("AddEmployeeQuestion answers: ", answers);
      // write to DB
      mainMenu();
    });
}

function UpdateEmployeeRole() {
  // select employee
  // change role based on input

}

function ViewAllRoles() {
  // get all roles from sql
}

function AddRole() {
 //get name of role
}

function ViewAllDepartmements() {
 // get all departments from sql
}

function AddDepartment() {
  //questions to add department
}

function ViewAllEmployees() {
  //get all employees from sql
}
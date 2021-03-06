# 12 SQL: Employee Tracker

## Description

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**. Your assignment this week is to build a command-line application from scratch to manage a company's employee database,uses the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to a MySQL database and perform queries, the [Inquirer package](https://www.npmjs.com/package/inquirer) to interact with the user via the command line, and the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Video
[![Walkthrough Video]](https://user-images.githubusercontent.com/84486941/131074561-f831846b-415f-4cae-a52f-fa93c6d7d816.mp4)

[HQ Video](https://github.com/DSpenn/HW12-Employee-Tracker-CMS/blob/main/Assets/HW12.mp4)

## Getting Started

Design the database schema as shown in the following image:
![Database schema includes tables labeled “employee,” role,” and “department.”](./Assets/12-sql-homework-demo-01.png)
As the image illustrates, your schema should contain the following three tables:

* `department`
    * `id`: `INT PRIMARY KEY`
    * `name`: `VARCHAR(30)` to hold department name

* `role`
    * `id`: `INT PRIMARY KEY`
    * `title`: `VARCHAR(30)` to hold role title
    * `salary`: `DECIMAL` to hold role salary
    * `department_id`: `INT` to hold reference to department role belongs to

* `employee`
    * `id`: `INT PRIMARY KEY`
    * `first_name`: `VARCHAR(30)` to hold employee first name
    * `last_name`: `VARCHAR(30)` to hold employee last name
    * `role_id`: `INT` to hold reference to employee role
    * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
[X] THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
[X]THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
[X]THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
[X] THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
[X] THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
[X] THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
[X] THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
[X] THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Grading Requirements
```md
[X] A walkthrough video that demonstrates the functionality of the employee tracker must be submitted, and a link to the video should be included in your README file.
[X] The walkthrough video must show all of the technical acceptance criteria being met.
[X] The walkthrough video must demonstrate how a user would invoke the application from the command line.
[X] The walkthrough video must demonstrate a functional menu with the options outlined in the acceptance criteria.
[X] Your GitHub repository containing your application code.
[X] Uses the [Inquirer package](https://www.npmjs.com/package/inquirer).
[X] Uses the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to a MySQL database.
[X] Uses the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.
[X] Follows the table schema outlined in the homework instructions.
[X] Repository has a unique name.
[X] Repository follows best practices for file structure and naming conventions.
[X] Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.
[X] Repository contains multiple descriptive commit messages.
[X] Repository contains a high-quality README with description and a link to a walkthrough video.
[X] The application user experience is intuitive and easy to navigate.
```

### Bonus
```
[] Application allows users to update employee managers (2 points).
[X] Application allows users to view employees by manager (2 points).
[] Application allows users to view employees by department (2 points).
[] Application allows users to delete departments, roles, and employees (2 points for each).
select whatever from choices list, send delete 
[] Application allows users to view the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department (8 points).
get emplopyees by department add salaries
```

INSERT INTO department (id, name)
VALUES (1, "Development"),
       (2, "Sales"),
       (3, "Accounting"),
       (4, "Customer Support"),
       (5, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 2),
       (2, "Lead Engineer", 100000, 1),
       (3, "Software Engineer", 100000, 1),
       (4, "Account Manager", 100000, 3),
       (5, "Accountant", 100000, 3),
       (6, "Legal Team Lead", 100000, 5),
       (7, "Lawyer", 100000, 5),
       (8, "Customer Service", 100, 4),
       (9, "Sales Lead", 100000, 2),
       (10, "Salesperson", 200, 2),
       (11, "Lead Engineer", 100000, 1);

INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUES (1, "Derek", "Stander", 1, 2),
       (2, "Bob", "McBob", 1, 7);
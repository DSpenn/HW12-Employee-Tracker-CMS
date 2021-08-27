INSERT INTO department (id, name)
VALUES (1, "Development"),
       (2, "Sales"),
       (3, "Accounting"),
       (4, "Customer Support"),
       (5, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 50000, 2),
       (2, "Lead Engineer", 400000, 1),
       (3, "Software Engineer", 300000, 1),
       (4, "Account Manager", 130000, 3),
       (5, "Accountant", 104000, 3),
       (6, "Legal Team Lead", 200000, 5),
       (7, "Lawyer", 100000, 5),
       (8, "Customer Service", 100, 4),
       (9, "Salesperson", 200, 2);

INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUES (1, "Derek", "Stander", 0, 2),
       (2, "Bob", "McBob", 1, 3),
       (3, "Judy", "Quin", 1, 6),
       (4, "Joe", "Cool", 3, 7),
       (5, "Sally", "Joe", 1, 4),
       (6, "Sam", "Smith", 5, 5);
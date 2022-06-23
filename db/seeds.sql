INSERT INTO department (name)
VALUES ("IT"),
       ("Accouting");

INSERT INTO role (title, salary, department_id)
VALUES ("IT manager", 7255.00, 1),
       ("Accounting manager", 5860.00, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Lee", 1, NULL),
       ("Sue", "Su", 2, NULL);    

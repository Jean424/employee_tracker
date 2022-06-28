INSERT INTO department (name)
VALUES ("IT"),
       ("Accouting")
       ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES  ("IT manager", 7255.00, 1),
        ("ITperson", 6255.00, 1),
        ("Accounting manager", 5860.00, 2);
        ('Accountant', 5000.00, 2),
        ('Lead Engineer', 10000.00, 2),
        ('Software Engineer', 80000.00, 2),


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("David", "Lee", 1, NULL),
        ("Sue", "Su", 2, NULL);
        ('Ashley', 'Lu', 3, NULL),
        ('Kevin', 'Tupik', 4, 3),
        ('Kunal', 'Singh', 5, NULL),
        ('Malia', 'Brown', 6, 5),


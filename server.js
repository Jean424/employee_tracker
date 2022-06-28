const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table')

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

function menu() {
  // TODO: Create an array of questions for user input
inquirer
.prompt([
      {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a employee',
            'add a role',
            'update employee',
            'Quit'
          ]
      },
      
  ]).then((data) => {
    // console.log(data.action)
    switch (data.action) {
      case 'view all departments':
        viewAllDepartments();
        break;
      case "view all roles":
        viewAllRoles();
        break;
      case "view all employees":
        viewAllEmployees();
        break;
      case "add a department":
        addDepartment();
        break;
      case "add a role":
        addRoles();
        break;
      case "add a employee":
        addEmployee();
        break;
      case "update employee":
        updateRoles();
        break;
      default:
        process.exit()
        break;
    }
  });
}

function viewAllDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    menu();
  });
}

function viewAllRoles() {
  db.query('SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
    console.table(results);
    menu();
  });
}

const query = (`SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.salary AS salary, role.title AS title, CONCAT(manager.first_name," ", manager.last_name) AS manager
FROM employee 
JOIN role 
ON employee.role_id = role.id
JOIN department 
ON role.department_id = department.id
LEFT JOIN employee manager
ON manager.id = employee.manager_id;`)

function viewAllEmployees() {
  db.query(query, function (err, results) {
    console.table(results);
    menu();
  });
}

// To add department
function addDepartment() {
  inquirer.prompt([
      {
          type:"input",
          name:"department",
          message:"enter department name"
      }
  ]).then((res) => {
      db.connection.query("INSERT INTO department (name) VALUES (?)", [res.department],(err, data) => {
          if (err) throw err;
          console.table(data);
          loadQuestion();
      })
  })
}

// To add role
function addRoles() {
  inquirer.prompt([
      {
          type:"input",
          name:"title",
          message:"enter role title"
      },
      {
          type:"number",
          name:"salary",
          message:"enter salary"
      },
      {
          type:"number",
          name:"departmentId",
          message:"enter department ID"
      }
  ]).then((res) => {
      db.connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [res.title, res.salary, res.departmentId],(err, data) => {
          if (err) throw err;
          console.table(data);
          loadQuestion();
      })
  })
}

// To add employee
function addEmployee() {
  inquirer.prompt([
      {
          type: "input",
          name: "firstName",
          message: "enter employee first name"
      },
      {
          type:"input",
          name:"lastName",
          message:"enter employee last name"
      },
      {
          type:"number",
          name: "roleId",
          prompt: "enter role ID"
      },
      {
          type:"number",
          name: "managerId",
          prompt: "enter manager ID"
      }
  ]).then((res) => {
      db.connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.firstName, res.lastName, res.roleId, res.managerId],(err, data) => {
          if (err) throw err;
          console.table(data);
          loadQuestion();
      })
  })
}

// To update employee role
function updateRoles() {
  inquirer.prompt([
      {
          type:"number",
          name:"employeeId",
          message:"enter employee ID of the employee who's role you want to change"
      },
      {
          type:"number",
          name:"roleId",
          message:"enter the ID of the new role"
      }
  ]).then((res) => {
      db.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [res.roleId, res.employeeId],(err, data) => {
          if (err) throw err;
          console.table(data);
          loadQuestion();
      })
  })
}

menu();


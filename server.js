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
            'done'
          ]
      },
      
  ]).then((data) => {
    // console.log(data.action)
    switch (data.action) {
      case 'view all departments':
        viewAllDep();
        
        break;
    
      default:
        break;
    }

  });

}

function viewAllDep() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    menu();
  });
}

function viewAllRoles() {

}

function viewAllEmp() {

}

function addDep() {


}

function addRole() {

}

function addEmp() {

}

function updateEmp() {

}

menu();


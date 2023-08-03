const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'moon',
  database: 'employees_db'
}, console.log(`Connected to the employees_db database.`));

// Function to display the main menu options
function displayMainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: 'Select an option:',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      // Call corresponding functions based on user selection
      switch (answers.option) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit(0);
      }
    });
}

// Function to handle "View all departments" option
function viewAllDepartments() {
  const sql = 'SELECT id, name AS department FROM department';
  connection.query(sql, (err, departments) => {
    if (err) throw err;
    console.table(departments);
    displayMainMenu(); // Show the main menu again
  });
}

// Function to handle "View all roles" option
function viewAllRoles() {
  const sql = `
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
  `;
  connection.query(sql, (err, roles) => {
    if (err) throw err;
    console.table(roles);
    displayMainMenu(); // Show the main menu again
  });
}

// Function to handle "View all employees" option
function viewAllEmployees() {
  const sql = `
    SELECT employee.id, employee.first_name, employee.last_name, 
           role.title AS job_title, department.name AS department, role.salary,
           CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  `;
  connection.query(sql, (err, employees) => {
    if (err) throw err;
    console.table(employees);
    displayMainMenu(); // Show the main menu again
  });
}

// Function to handle "Add a department" option
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
      },
    ])
    .then((answers) => {
      const departmentName = answers.departmentName;
      const sql = 'INSERT INTO department (name) VALUES (?)';
      connection.query(sql, [departmentName], (err, result) => {
        if (err) throw err;
        console.log('Department added successfully!');
        displayMainMenu(); // Show the main menu again
      });
    });
}

// Function to handle "Add a role" option
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
        validate: (input) => {
          return !isNaN(parseFloat(input)) ? true : 'Please enter a valid number';
        },
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department id for the role:',
        validate: (input) => {
          return !isNaN(parseInt(input)) ? true : 'Please enter a valid number';
        },
      },
    ])
    .then((answers) => {
      const title = answers.title;
      const salary = parseFloat(answers.salary);
      const departmentId = parseInt(answers.departmentId);
      const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      connection.query(sql, [title, salary, departmentId], (err, result) => {
        if (err) throw err;
        console.log('Role added successfully!');
        displayMainMenu(); // Show the main menu again
      });
    });
}

// Function to handle "Add an employee" option
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the role id for the employee:',
        validate: (input) => {
          return !isNaN(parseInt(input)) ? true : 'Please enter a valid number';
        },
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'Enter the manager id for the employee (optional):',
        validate: (input) => {
          return input === '' || !isNaN(parseInt(input))
            ? true
            : 'Please enter a valid number or leave it empty';
        },
      },
    ])
    .then((answers) => {
      const firstName = answers.firstName;
      const lastName = answers.lastName;
      const roleId = parseInt(answers.roleId);
      const managerId = answers.managerId === '' ? null : parseInt(answers.managerId);
      const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      connection.query(sql, [firstName, lastName, roleId, managerId], (err, result) => {
        if (err) throw err;
        console.log('Employee added successfully!');
        displayMainMenu(); // Show the main menu again
      });
    });
}

// Function to handle "Update an employee role" option
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the id of the employee you want to update:',
        validate: (input) => {
          return !isNaN(parseInt(input)) ? true : 'Please enter a valid number';
        },
      },
      {
        type: 'input',
        name: 'newRoleId',
        message: 'Enter the new role id for the employee:',
        validate: (input) => {
          return !isNaN(parseInt(input)) ? true : 'Please enter a valid number';
        },
      },
    ])
    .then((answers) => {
      const employeeId = parseInt(answers.employeeId);
      const newRoleId = parseInt(answers.newRoleId);
      const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
      connection.query(sql, [newRoleId, employeeId], (err, result) => {
        if (err) throw err;
        console.log('Employee role updated successfully!');
        displayMainMenu(); // Show the main menu again
      });
    });
}

// Call the main function to start the application
displayMainMenu();

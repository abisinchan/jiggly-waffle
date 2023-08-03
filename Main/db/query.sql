-- Query 1: View all departments
SELECT * FROM department;

-- Query 2: View all roles with the department name
SELECT role.id, role.title, role.salary, department.name AS department
FROM role
JOIN department ON role.department_id = department.id;

-- Query 3: View all employees with their job titles, departments, salaries, and managers
SELECT employee.id, employee.first_name, employee.last_name,
       role.title AS job_title, department.name AS department, role.salary,
       CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id;

-- Query 4: Add a new department
INSERT INTO department (name) VALUES ('Customer Service');

-- Query 5: Add a new role
INSERT INTO role (title, salary, department_id) VALUES ('Support Specialist', 40000, 1);

-- Query 6: Add a new employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);

-- Query 7: Update an employee's role
UPDATE employee SET role_id = 2 WHERE id = 1;

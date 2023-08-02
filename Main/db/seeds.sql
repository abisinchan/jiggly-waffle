-- Insert departments
INSERT INTO department (id, name) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Engineering'),
(4, 'Human Resources');

-- Insert roles
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Sales Manager', 60000.00, 1),
(2, 'Sales Representative', 40000.00, 1),
(3, 'Marketing Manager', 55000.00, 2),
(4, 'Marketing Specialist', 35000.00, 2),
(5, 'Software Engineer', 80000.00, 3),
(6, 'QA Engineer', 65000.00, 3),
(7, 'HR Manager', 50000.00, 4),
(8, 'HR Coordinator', 38000.00, 4);

-- Insert employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Levi', 'Ackerman', 1, NULL),
(2, 'Naruto', 'Uzamaki', 2, 1),
(3, 'Stephan', 'Salvatore', 3, NULL),
(4, 'Monkey D.', 'Luffy', 4, 3),
(5, 'Roronoa', 'Zoro', 5, NULL),
(6, 'Eren', 'Yeager', 6, 5),
(7, 'Joseph', 'Joestar', 7, NULL),
(8, 'Gon', 'Freecss', 8, 7);

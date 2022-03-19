const inquirer = require('inquirer');
const db = require('../../db/connection');
const cTable = require('console.table');

const getAllEmployees = async () => {
  await db
    .promise()
    .query(
      `
      SELECT
      e.id,
      e.first_name,
      e.last_name,
      title AS job_title,
      name AS department,
      salary,
      CONCAT(m.first_name, " ", m.last_name) AS manager

      FROM employees e
      
      LEFT JOIN roles
      ON e.role_id = roles.id
      
      LEFT JOIN departments
      ON roles.department_id = departments.id

      LEFT JOIN employees m
      ON e.manager_id = m.id
      `
    )
    .then(([rows]) => console.log(cTable.getTable(rows)))
    .catch((err) => console.log(err));
};

const addEmployee = async () => {
  // Roles query
  let rolesList;

  await db
    .promise()
    .query(
      `
      SELECT title 
      FROM roles
      `
    )
    .then(([data]) => (rolesList = data.map((value) => value.title)))
    .catch((err) => console.log(err));

  // Employee query
  let employeeList;

  await db
    .promise()
    .query(
      `
      SELECT CONCAT("ID: ", id, " - ", first_name, " ", last_name) AS employee
      FROM employees
      `
    )
    .then(([data]) =>
      (employeeList = data.map((value) => value.employee)).unshift('No Manager')
    )
    .catch((err) => console.log(err));

  // INQUIRER PROMPTS
  let choices;

  await inquirer
    .prompt([
      // first name
      {
        type: 'input',
        name: 'firstName',
        message: 'Please enter the first name of the employee.',
        validate: (firstName) => {
          if (firstName) {
            return true;
          } else {
            console.log('Please enter the first name of the employee.');
            return false;
          }
        },
      },
      // last name
      {
        type: 'input',
        name: 'lastName',
        message: 'Please enter the last name of the employee.',
        validate: (lastName) => {
          if (lastName) {
            return true;
          } else {
            console.log('Please enter the last name of the employee.');
            return false;
          }
        },
      },
      // have person choose from a list of company-defined roles
      {
        type: 'list',
        name: 'role',
        message: 'Please choose a role',
        choices: rolesList,
      },
      // choose a manager from the list of employees
      {
        type: 'list',
        name: 'manager',
        message: 'Please choose a manager',
        choices: employeeList,
      },
    ])
    .then((data) => (choices = data))
    .catch((err) => console.log(err));

  let roleId;

  await db
    .promise()
    .query(
      `
      SELECT id
      FROM roles 
      WHERE title = '${choices.role}'
      `
    )
    .then((data) => (roleId = data[0][0].id))
    .catch((err) => console.log(err));

  if (choices.manager === 'No Manager') {
    await db
      .promise()
      .query(
        `
        INSERT INTO employees (first_name, last_name, role_id)
        VALUES ('${choices.firstName}', '${choices.lastName}',
        '${roleId}')
        `
      )
      .then(console.log('New employee successfully added to database.'))
      .catch((err) => console.log(err));
  } else {
    let managerId;

    await db
      .promise()
      .query(
        `
      SELECT id
      FROM employees 
      WHERE CONCAT("ID: ", id, " - ", first_name, " ", last_name) = '${choices.manager}'
      `
      )
      .then((data) => (managerId = data[0][0].id))
      .catch((err) => console.log(err));

    await db
      .promise()
      .query(
        `
        INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES ('${choices.firstName}', '${choices.lastName}',
        '${roleId}', '${managerId}')
        `
      )
      .then(console.log('New employee successfully added to database.'))
      .catch((err) => console.log(err));
  }
};

const updateEmployeeRole = async () => {
  // Employee query
  let employeeList;

  await db
    .promise()
    .query(
      `
        SELECT CONCAT("ID: ", id, " - ", first_name, " ", last_name) AS employee
        FROM employees
        `
    )
    .then(([data]) => (employeeList = data.map((value) => value.employee)))
    .catch((err) => console.log(err));

  // Roles query
  let rolesList;

  await db
    .promise()
    .query(
      `
      SELECT title
      FROM roles
      `
    )
    .then(([data]) => (rolesList = data.map((value) => value.title)))
    .catch((err) => console.log(err));

  let choices;

  await inquirer
    .prompt([
      // Select your name from the company roster
      {
        type: 'list',
        name: 'employee',
        message:
          'Please choose the name of the employee that you wish to update.',
        choices: employeeList,
      },

      // What is your new role __ (list)?
      {
        type: 'list',
        name: 'role',
        message: `Please choose the employee's new role.`,
        choices: rolesList,
      },
    ])
    .then((data) => (choices = data))
    .catch((err) => console.log(err));

  const employeeId = choices.employee.split(' ')[1];

  let roleId;

  await db
    .promise()
    .query(
      `
      SELECT id
      FROM roles 
      WHERE title = '${choices.role}'
      `
    )
    .then((data) => (roleId = data[0][0].id))
    .catch((err) => console.log(err));

  await db
    .promise()
    .query(
      `
      UPDATE employees 
      SET role_id = ${roleId}
      WHERE id = '${employeeId}'

      `
    )
    .then(console.log(`Employee updated`))
    .catch((err) => console.log(err));
};

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployeeRole,
};

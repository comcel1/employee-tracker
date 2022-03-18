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

module.exports = { getAllEmployees };

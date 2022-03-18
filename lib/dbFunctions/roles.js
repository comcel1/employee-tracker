const inquirer = require('inquirer');
const db = require('../../db/connection');
const cTable = require('console.table');

const getAllRoles = async () => {
  await db
    .promise()
    .query(
      `
    SELECT roles.id, roles.title AS job_title, departments.name AS department_name, roles.salary
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`
    )
    .then(([rows]) => console.log(cTable.getTable(rows)))
    .catch((err) => console.log(err));
};

const addRole = async () => {};

module.exports = { getAllRoles, addRole };

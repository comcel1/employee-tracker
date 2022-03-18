const inquirer = require('inquirer');
const db = require('../../db/connection');
const cTable = require('console.table');

const getAllDepartments = async () => {
  await db
    .promise()
    .query(
      `
    SELECT id, name AS department_name
    FROM departments`
    )
    .then(([rows]) => console.log(cTable.getTable(rows)))
    .catch((err) => console.log(err));
};

module.exports = { getAllDepartments };

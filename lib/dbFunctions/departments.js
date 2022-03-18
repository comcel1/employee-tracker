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

const addDepartment = async () => {
  let departmentName;

  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:',
        validate: (departmentName) => {
          if (departmentName) {
            return true;
          } else {
            console.log('Please enter a department name!');
            return false;
          }
        },
      },
    ])
    .then((data) => {
      departmentName = data.departmentName;
    })
    .catch((err) => console.log(err));

  await db
    .promise()
    .query(
      `
    INSERT INTO departments (name)
    VALUES ('${departmentName}')
    `
    )
    .then(
      console.log(
        `The ${departmentName} department was successfully added to the database.`
      )
    )
    .catch((err) => console.log(err));
};

module.exports = { getAllDepartments, addDepartment };

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

const addRole = async () => {
  let departmentsList;

  await db
    .promise()
    .query(
      `
      SELECT name FROM departments
      `
    )
    .then((data) => (departmentsList = data[0]))
    .catch((err) => console.log(err));

  let results;

  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'jobTitle',
        message: 'Please enter a title for the new job.',
        validate: (jobTitle) => {
          if (jobTitle) {
            return true;
          } else {
            console.log('Please enter a job title!');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'jobSalary',
        message: 'Please enter a salary.',
        validate: (jobSalary) => {
          if (jobSalary) {
            return true;
          } else {
            console.log('Please enter a salary!');
            return false;
          }
        },
      },
      {
        type: 'list',
        name: 'department',
        message: 'Please choose a department',
        choices: departmentsList,
      },
    ])
    .then((data) => {
      results = data;
    })
    .catch((err) => console.log(err));
};

module.exports = { getAllRoles, addRole };

// {
//   jobTitle: 'VP',
//   jobSalary: '100000',
//   department: 'Research and Development'
// }

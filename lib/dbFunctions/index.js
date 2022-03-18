const inquirer = require('inquirer');
const db = require('../../db/connection');

const { getAllDepartments, addDepartment } = require('./departments');
const { getAllRoles, addRole } = require('./roles');
const {
  getAllEmployees,
  addEmployee,
  updateEmployeeRole,
} = require('./employees');

// Handles starting application and prompts for action
const startApplication = async () => {
  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role',
          'Quit',
        ],
      },
    ])
    .then((choice) => choiceHandler(choice))
    .catch((err) => console.log(err));
};

// sends the user response to the correct function
const choiceHandler = async ({ options: choice }) => {
  switch (choice) {
    case 'View All Departments':
      await getAllDepartments();
      break;
    case 'View All Roles':
      await getAllRoles();
      break;
    case 'View All Employees':
      await getAllEmployees();
      break;
    case 'Add a Department':
      await addDepartment();
      break;
    case 'Add a Role':
      await addRole();
      break;
    case 'Add an Employee':
      await addEmployee();
      break;
    case 'Update an Employee Role':
      await updateEmployeeRole();
      break;
  }

  if (choice !== 'Quit') {
    await again();
  }
};

const again = async () => {
  await inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'again',
        message: 'Would you like to do anything else?',
        // for testing purposes, we are leaving this true so we don't have to keep starting the prompts over
        default: true,
      },
    ])
    .then(({ again }) => {
      if (again) {
        startApplication();
      } else {
        exitApplication();
      }
    })
    .catch((err) => console.log(err));
};

const exitApplication = () => {
  console.log('Goodbye!');
  db.end();
};

module.exports = startApplication;

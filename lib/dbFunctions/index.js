const inquirer = require('inquirer');
const db = require('../../db/connection');

const { getAllDepartments } = require('./departments');

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
  }
};

module.exports = startApplication;

const inquirer = require('inquirer');
const utils = require('./utils');
const svg = require('./svg');

const askQuestions = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please provide text of up to three characters.',
        name: 'name',
        validate: function (input) {
          const isValid = input.length < 4;
          return isValid
            ? true
            : 'Invalid text. Please provide 3 characters or less.';
        },
      },
      {
        type: 'input',
        message:
          'What color would you like your text to be? (enter a color keyword or a hexadecimal number)',
        name: 'textColor',
        validate: function (input) {
          return utils.isValidColor(input)
            ? true
            : 'This is not a valid color or hexadecimal number. Please try again.';
        },
      },
      {
        type: 'list',
        message: 'What font would you like to use?',
        name: 'fontFamily',
        choices: [
          'Arial',
          'Verdana',
          'Tahoma',
          'Trebuchet MS',
          'Times New Roman',
          'Georgia',
          'Garamond',
          'Courier New',
          'Brush Script MT',
        ],
      },
      {
        type: 'input',
        message: 'What font size would you like?',
        name: 'fontSize',
        validate: function (input) {
          if (!utils.isNumber(input)) {
            return 'Please enter a number.';
          }
          if (input < 6) {
            return 'Please enter a number greater than or equal to 6.';
          }
          return true;
        },
      },
      {
        type: 'list',
        message: 'What shape would you like your logo to use?',
        name: 'shape',
        choices: ['square', 'circle', 'triangle', 'polygon'],
      },
      {
        type: 'input',
        message: 'How many points would you like (>= 3)?',
        name: 'points',
        when: (answers) => answers.shape === 'polygon',
        validate: function (input) {
          if (!utils.isNumber(input)) {
            return 'Please enter a valid number.';
          }
          if (input < 3) {
            return 'Please enter a number that is 3 or larger.';
          }
          return true;
        },
      },
      {
        type: 'list',
        message: 'Would you like your shape to be a gradient or solid color?',
        name: 'shapeColorType',
        choices: ['solid', 'gradient'],
      },
      {
        type: 'input',
        message:
          'What color would you like your shape to be? (enter a color keyword or a hexadecimal number)',
        name: 'shapeColor',
        when: (answers) => answers.shapeColorType === 'solid',
        validate: function (input) {
          return utils.isValidColor(input)
            ? true
            : 'This is not a valid color or hexadecimal number. Please try again.';
        },
      },
      {
        type: 'input',
        message:
          'What is the first color would you like your shape to be? (enter a color keyword or a hexadecimal number)',
        name: 'shapeColor',
        when: (answers) => answers.shapeColorType === 'gradient',
        validate: function (input) {
          return utils.isValidColor(input)
            ? true
            : 'This is not a valid color or hexadecimal number. Please try again.';
        },
      },
      {
        type: 'input',
        message:
          'What is the second color would you like your shape to be? (enter a color keyword or a hexadecimal number)',
        name: 'shapeColor2',
        when: (answers) => answers.shapeColorType === 'gradient',
        validate: function (input) {
          return utils.isValidColor(input)
            ? true
            : 'This is not a valid color or hexadecimal number. Please try again.';
        },
      },
      {
        type: 'list',
        message:
          'Do you want the gradient to run left-to-right, diagonally, or top-to-bottom?',
        name: 'gradientDirection',
        when: (answers) => answers.shapeColorType === 'gradient',
        choices: ['left-to-right', 'diagonally', 'top-to-bottom'],
      },
      {
        type: 'input',
        message:
          'What border thickness would you like (use 0 if you do not want a border)?',
        name: 'strokeWidth',
        validate: function (input) {
          if (!utils.isNumber(input)) {
            return 'Please enter a valid number.';
          } 
          if (input < 0) {
            return 'Please enter 0 or a positive number.';
          }
          return true;
        },
      },
      {
        type: 'input',
        message:
          'What border color would you like? (enter a color keyword or a hexadecimal number)',
        name: 'strokeColor',
        when: (answers) => answers.strokeWidth > 0,
        validate: function (input) {
          return utils.isValidColor(input)
            ? true
            : 'This is not a valid color or hexadecimal number. Please try again.';
        },
      },
    ])
    .then((answers) => {
      const text = svg.makeSVG(answers);
      utils.writeFile('logo.svg', text);
    });
};

module.exports = { askQuestions };
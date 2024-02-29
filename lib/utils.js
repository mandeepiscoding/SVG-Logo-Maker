const fs = require('fs');
const colors = require('./colors');

const checkHex = (color) => {
  if (/^[0-9A-Fa-f]+$/.test(color) && color.length === 6) {
    const hexColor = '#' + color;
    return hexColor;
  }
  return color;
};

const isValidColor = (input) => {
  return (
    colors
      .map((color) => color.toLowerCase() === input.toLowerCase())
      .reduce((bool1, bool2) => bool1 || bool2) ||
    (/^[0-9A-Fa-f]+$/.test(input) && input.length === 6)
  );
};

const isNumber = (input) => {
  return /[0-9]/.test(input);
};

const writeFile = (filename, text) => {
  fs.writeFile(filename, text, (error) => {
    error ? console.error(error) : console.log(`Generated ${filename}`);
  });
};

module.exports = {
  writeFile,
  checkHex,
  isValidColor,
  isNumber,
};
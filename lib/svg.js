const shape = require('./shapes');
const utils = require('./utils');

let fillColor;
let x2;
let y2;

const makeSVG = (answers) => {
  if (process.argv[2] === '-o') {
    console.log(answers);
  }

  if (!answers.strokeColor) {
    answers.strokeColor = answers.shapeColor;
  }

  switch (answers.fontFamily) {
    case 'Arial':
    case 'Verdana':
    case 'Tahoma':
    case 'Trebuchet MS':
      answers.fontFamily += ', san-serif';
      break;
    case 'Times New Roman':
    case 'Georgia':
    case 'Garamond':
      answers.fontFamily += ', serif';
      break;
    case 'Courier New':
      answers.fontFamily += ', monospace';
      break;
    case 'Brush Script MT':
      answers.fontFamily += ', cursive';
  }

  if (answers.shapeColorType === 'gradient') {
    fillColor = 'url(#grad1)';
  } else {
    fillColor = answers.shapeColor;
  }

  let logoShape;

  switch (answers.shape) {
    case 'square':
      logoShape = new shape.Square(answers.strokeColor, fillColor);
      break;
    case 'circle':
      logoShape = new shape.Circle(answers.strokeColor, fillColor);
      break;
    case 'triangle':
      logoShape = new shape.Triangle(answers.strokeColor, fillColor);
      break;
    case 'polygon':
      logoShape = new shape.Polygon(
        answers.strokeColor,
        fillColor,
        parseInt(answers.points)
      );
  }

  if (answers.strokeWidth > 0) {
    logoShape.setStrokeWidth(answers.strokeWidth);
  }

  answers.textColor = utils.checkHex(answers.textColor);

  let text = logoShape.svgHeader() + '\n';

  if (answers.shapeColorType === 'gradient') {
    answers.shapeColor = utils.checkHex(answers.shapeColor);
    answers.shapeColor2 = utils.checkHex(answers.shapeColor2);

    if (answers.gradientDirection === 'top-to-bottom') {
      x2 = '0%';
      y2 = '100%';
    } else if (answers.gradientDirection === 'diagonally') {
      x2 = '100%';
      y2 = '100%';
    } else {
      x2 = '100%';
      y2 = '0%';
    }

    text += `<defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="${x2}" y2="${y2}">
      <stop offset="0%"
      style="stop-color:${answers.shapeColor};stop-opacity:1" />
      <stop offset="100%"
      style="stop-color:${answers.shapeColor2};stop-opacity:1" />
    </linearGradient>
  </defs>`;
  }

  text += '  ' + logoShape.render() + '\n';
  text += `  <text x="${logoShape.textX}" y="${logoShape.textY}" font-family="${answers.fontFamily}" font-size="${answers.fontSize}" text-anchor="middle" alignment-baseline="middle" fill="${answers.textColor}">${answers.name}</text>\n`;
  text += logoShape.svgFooter();

  return text;
};

module.exports = { makeSVG };
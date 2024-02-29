const colors = require('./colors');
const utils = require('./utils');

class Shape {
  constructor(stroke, fill) {
    if (typeof stroke !== 'string' || !stroke.trim().length) {
      throw new Error('Expected parameter \'stroke\' to be a non-empty string');
    }
    if (typeof fill !== 'string' || !fill.trim().length) {
      throw new Error('Expected parameter \'fill\' to be a non-empty string');
    }
    if (!(utils.isValidColor(stroke) || stroke === 'url(#grad1)')) {
      throw new Error('Expected parameter \'stroke\' to be either a valid color or a hex number');
    }
    if (!(utils.isValidColor(fill) || fill === 'url(#grad1)')) {
      throw new Error('Expected parameter \'fill\' to be either a valid color or a hex number');
    }

    stroke = utils.checkHex(stroke);
    fill = utils.checkHex(fill);

    this.width = 300;
    this.height = 220;
    this.stroke = stroke;
    this.strokeWidth = 0;
    this.fill = fill;
    this.x = 50;
    this.y = 0;
    this.textX = '50%';
    this.textY = '53%';
  }

  svgHeader() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}">`;
  }

  svgFooter() {
    return '</svg>';
  }

  setColor(color) {
    this.fill = utils.checkHex(color);
  }

  setStrokeWidth(strokeWidth) {
    this.strokeWidth = strokeWidth;
  }
}

module.exports = Shape;
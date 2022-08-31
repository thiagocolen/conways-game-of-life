import { Grid } from './grid.js';
import * as patterns from './patterns.js';
import * as util from './utils.js';

const canvasWidth = 600;
const canvasHeigth = 600;
const gridSize = 6;

const grid = new Grid(canvasWidth, canvasHeigth, gridSize);

window.setup = () => {
  frameRate(12);
  createCanvas(canvasWidth, canvasHeigth);
  // patterns.create(grid, 'glider');
  patterns.randomCells(grid);
};

window.draw = () => {
  grid.start();
};

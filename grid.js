import * as util from './utils.js';
import * as patterns from './patterns.js';

// -------------------------

class Grid {
  width;
  height;
  gridSize;
  cols;
  rows;
  gridData = [];
  newGridData = [];

  constructor(width, height, gridSize) {
    this.width = width;
    this.height = height;
    this.gridSize = gridSize;
    this.createGridData();
  }

  start() {
    this.refreshGridData();
    this.refreshGridScreen();
  }

  createGridData() {
    this.cols = this.width / this.gridSize;
    this.rows = this.height / this.gridSize;
    const positions = this.cols * this.rows;
    for (let p = 0; p <= positions; p++) {
      this.newGridData.push(0);
    }
  }

  addCell(position) {
    this.newGridData[position] = 1;
    return this.getCellPosition(position);
  }

  killCell(position) {
    this.newGridData[position] = 0;
    return this.getCellPosition(position);
  }

  getCellPosition(position) {
    const row = Math.floor(position / this.rows);
    const col = position % this.rows;
    return {
      x: col * this.gridSize,
      y: row * this.gridSize,
    };
  }

  refreshGridData() {
    this.gridData = [...this.newGridData];
  }

  refreshGridScreen() {
    this.gridData.forEach((value, index) => {
      // Drawing all cells of the gridData
      if (value === 0) this.drawCell(index, color(0, 0, 0));
      if (value === 1) this.drawCell(index, color(150, 150, 150));

      // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
      // Any live cell with more than three live neighbours dies, as if by overpopulation.
      if (
        value === 1 &&
        (this.hasNeighbor(index) < 2 || this.hasNeighbor(index) > 3)
      ) {
        this.killCell(index);
      }

      // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      if (value === 0 && this.hasNeighbor(index) === 3) {
        this.addCell(index);
      }

      // Any live cell with two or three live neighbours lives on to the next generation.
    });
  }

  // TODO: Let's move this method to Utils file?
  drawCell(position, selectedColor) {
    fill(selectedColor ? selectedColor : color(255, 0, 0));
    noStroke();
    rect(
      this.getCellPosition(position).x,
      this.getCellPosition(position).y,
      this.gridSize
    );
  }

  hasNeighbor(position) {
    let neighbors = 0;
    const neighborCount = (index) => {
      neighbors = this.gridData[index] === 1 ? ++neighbors : neighbors;
    };

    const top = position - this.cols;
    neighborCount(top);
    const topLeft = top - 1;
    neighborCount(topLeft);
    const topRight = top + 1;
    neighborCount(topRight);

    const bottom = position + this.cols;
    neighborCount(bottom);
    const bottomLeft = bottom - 1;
    neighborCount(bottomLeft);
    const bottomRight = bottom + 1;
    neighborCount(bottomRight);

    const left = position - 1;
    neighborCount(left);
    const right = position + 1;
    neighborCount(right);

    return neighbors;
  }
}

export { Grid };

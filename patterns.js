import * as util from './utils.js';

export function create(grid, patternType) {
  const randomPosition = util.getRandomInt(grid.newGridData.length);

  const patterns = {
    // Still Lifes
    block: [0, 1, grid.cols, grid.cols + 1],
    // Oscillators
    // Spaceships
    glider: [0, 1, 2, -grid.cols + 2, -grid.cols * 2 + 1],
  };

  patterns[patternType].forEach((item) => {
    grid.addCell(randomPosition + item);
  });
}

export function randomCells(grid) {
  const quantity = util.getRandomInt(grid.newGridData.length);
  for (let i = 0; i < quantity; i++) {
    grid.addCell(util.getRandomInt(grid.newGridData.length));
  }
}

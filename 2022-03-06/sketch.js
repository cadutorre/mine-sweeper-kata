function create2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

const resolution = 25;
let grid;
let cols;
let rows;

function setup() {
  createCanvas(500, 500);

  cols = floor(width / resolution);
  rows = floor(height / resolution);

  grid = create2DArray(cols, rows);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = new Cell(i, j, resolution);
    }
  }
  for (let col of grid) {
    for (let cel of col) {
      countNeighbors(cel, grid);
    }
  }
}

function draw() {
  background(255);
  for (let col of grid) {
    for (let cel of col) {
      cel.show();
    }
  }
}

function countNeighbors(cel, grid) {
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      const i = cel.i + xoff;
      const j = cel.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
        if (grid[i][j].mine) {
          cel.plusMine();
        }
      }
    }
  }
}

function reveal(cel) {
  let result = cel.reveal();
  if (cel.neighborCount == 0) {
    floodFill(cel, grid);
  }
  return result;
}

function floodFill(cel, grid) {
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      const i = cel.i + xoff;
      const j = cel.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
        if (!grid[i][j].mine && !grid[i][j].revealed) {
          reveal(grid[i][j]);
        }
      }
    }
  }
}

function gameOver() {
  for (let col of grid) {
    for (let cel of col) {
      cel.revealed = true;
    }
  }
}

function mousePressed() {
  for (let col of grid) {
    for (let cel of col) {
      if (cel.contains(mouseX, mouseY)) {
        if (reveal(cel)) {
          gameOver();
        }
      }
    }
  }
}

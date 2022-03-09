let resolution;
let grid;

function setup() {
  createCanvas(600, 600);
  background(0);
  resolution = 30;
  grid = new Grid(width, height, resolution);
  grid.initialize();
}

function draw() {
  grid.show();
}

function mousePressed() {
  const col = floor(mouseX / resolution);
  const row = floor(mouseY / resolution);
  if (mouseButton === LEFT) {
    grid.reveal(col, row);
  } else if (mouseButton === RIGHT) {
    grid.toggleFlag(col, row);
  }
}

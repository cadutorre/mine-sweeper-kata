class Grid {
  constructor(width, height, resolution) {
    this.cols = width / resolution;
    this.rows = height / resolution;
    this.grid = new Array(this.cols);
    for (let i = 0; i < this.cols; i++) {
      this.grid[i] = new Array(this.rows);
    }
  }

  iterateOverCells(exec) {
    this.grid.forEach((col) => {
      col.forEach(exec);
    });
    // for (let col of this.grid) {
    //   for (let cel of col) {
    //     exec(cel);
    //   }
    // }
  }

  createMines(ration) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (random(1) < ration) {
          this.grid[i][j] = new Neighbor(
            i * resolution,
            j * resolution,
            resolution
          );
        } else {
          this.grid[i][j] = new Mine(
            i * resolution,
            j * resolution,
            resolution
          );
        }
      }
    }
  }

  countNeighbors() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let cel = this.grid[i][j];
        for (let xoff = -1; xoff <= 1; xoff++) {
          for (let yoff = -1; yoff <= 1; yoff++) {
            if (
              i + xoff > -1 &&
              i + xoff < this.grid.length &&
              j + yoff > -1 &&
              j + yoff < this.grid[i].length
            ) {
              if (this.grid[i + xoff][j + yoff] instanceof Mine) {
                cel.plusMine();
              }
            }
          }
        }
      }
    }
  }

  initialize() {
    this.createMines(0.9);
    this.countNeighbors();
  }

  show() {
    this.iterateOverCells((cell) => cell.show());
  }

  createFloadFill(x, y) {
    return () => {
      for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
          if (
            x + xoff > -1 &&
            x + xoff < this.grid.length &&
            y + yoff > -1 &&
            y + yoff < this.grid[x].length
          ) {
            if (
              this.grid[x + xoff][y + yoff] instanceof Neighbor &&
              !this.grid[x + xoff][y + yoff].revealed
            ) {
              this.grid[x + xoff][y + yoff].reveal(
                this.createFloadFill(x + xoff, y + yoff)
              );
            }
          }
        }
      }
    };
  }

  reveal(x, y) {
    try {
      this.grid[x][y].reveal(this.createFloadFill(x, y));
    } catch (error) {
      this.iterateOverCells((cell) => {
        cell.revealed = true;
        //cell.flaged = false;
      });
    }
  }

  toggleFlag(x, y) {
    this.grid[x][y].toggleFlag();
  }
}

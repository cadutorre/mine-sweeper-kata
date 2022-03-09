class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.revealed = false;
    this.flaged = false;
  }
  show() {
    stroke(0);
    fill(180);
    rect(this.x, this.y, this.size, this.size);
    if (this.flaged && !this.revealed) {
      fill(50);
      triangle(
        this.x + this.size * 0.5,
        this.y + this.size * 0.2,
        this.x + this.size * 0.2,
        this.y + this.size * 0.8,
        this.x + this.size * 0.8,
        this.y + this.size * 0.8
      );
    }
  }
  reveal() {
    if (!this.flaged) {
      this.revealed = true;
    }
  }
  toggleFlag() {
    if (!this.revealed) {
      this.flaged = !this.flaged;
    }
  }
  plusMine() {}
}

class Neighbor extends Cell {
  constructor(x, y, size) {
    super(x, y, size);
    this.neighborTotal = 0;
  }
  plusMine() {
    this.neighborTotal++;
  }
  show() {
    super.show();
    if (this.revealed) {
      fill(230);
      rect(this.x, this.y, this.size, this.size);
      if (this.flaged) {
        textAlign(CENTER);
        fill(255, 0, 0);
        rect(this.x, this.y, this.size, this.size);
        fill(255);
        text("X", this.x + this.size * 0.5, this.y + 19);
      } else if (this.neighborTotal !== 0) {
        textAlign(CENTER);
        fill(0);
        text(this.neighborTotal, this.x + this.size * 0.5, this.y + 19);
      }
    }
  }
  reveal(floadFill) {
    super.reveal();
    if (!this.flaged && this.neighborTotal === 0) {
      floadFill();
    }
  }
}

class Mine extends Cell {
  constructor(x, y, size) {
    super(x, y, size);
  }
  show() {
    super.show();
    if (this.revealed) {
      if (this.flaged) {
        textAlign(CENTER);
        fill(0, 255, 0);
        rect(this.x, this.y, this.size, this.size);
        fill(0);
        text("OK", this.x + this.size * 0.5, this.y + 19);
      } else {
        fill(127);
        ellipse(
          this.x + this.size * 0.5,
          this.y + this.size * 0.5,
          this.size * 0.5
        );
      }
    }
  }
  reveal() {
    if (!this.flaged) {
      throw "GameOver";
    }
  }
}

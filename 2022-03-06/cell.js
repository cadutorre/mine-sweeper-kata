class Cell {
  constructor(i, j, s) {
    this.i = i;
    this.j = j;
    this.x = i * s;
    this.y = j * s;
    this.s = s;
    this.mine = random(1) > 0.8;
    this.revealed = false;
    this.neighborCount = 0;
  }

  show() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.s, this.s);
    if (this.revealed) {
      if (this.mine) {
        fill(127);
        ellipse(
          this.x + this.s * 0.5,
          this.y + this.s * 0.5,
          this.s * 0.5,
          this.s * 0.5
        );
      } else {
        fill(200);
        rect(this.x, this.y, this.s, this.s);
        if (this.neighborCount > 0) {
          textAlign(CENTER);
          fill(0);
          text(this.neighborCount, this.x + this.s * 0.5, this.y + 16);
        }
      }
    }
  }

  plusMine() {
    this.neighborCount++;
  }

  contains(x, y) {
    return (
      this.x < x && x < this.x + this.s && this.y < y && y < this.y + this.s
    );
  }

  reveal() {
    this.revealed = true;
    if (this.mine) {
      return true;
    }
  }
}

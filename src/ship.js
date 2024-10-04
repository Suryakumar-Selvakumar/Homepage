export class Ship {
  constructor(length, placement) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.placement = placement;
  }

  hit() {
    if (this.hits < this.length) {
      this.hits += 1;
    }
  }

  isSunk() {
    if (this.length === this.hits) {
      this.sunk = true;
      return true;
    }
    return false;
  }
}

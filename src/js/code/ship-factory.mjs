export default class Ship {
  constructor(num) {
    this.length = num;
    this.buildAShip();
  }

  buildAShip() {
    this.buildedShip = new Array(this.length);
    this.buildedShip.fill('1');
    this.hp = this.buildedShip.length;
  }

  hit() {
    this.hp -= 1;
    if (this.hp === 0) this.isSunk();
  }

  giveAName(name) {
    this.name = name;
  }

  getHP() {
    return this.hp;
  }

  isSunk() {
    this.settled = false;
  }
}

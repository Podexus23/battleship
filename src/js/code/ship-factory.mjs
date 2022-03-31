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
  }

  giveAName(name) {
    this.name = name;
  }

  getHP() {
    return this.hp;
  }

  isSunk() {
    return this.hp === 0;
  }
}

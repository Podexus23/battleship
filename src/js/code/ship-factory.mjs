export default class Ship {
  constructor(num) {
    this.length = num;
    this.buildAShip();
  }

  buildAShip() {
    this.buildedShip = new Array(this.length);
    this.buildedShip.fill(1);
    this.setHP();
  }

  hit(num) {
    this.buildedShip[num - 1] = 0;
    this.setHP();
  }

  setHP() {
    this.hp = this.buildedShip.filter((cell) => cell === 1).length;
  }

  getHP() {
    return this.hp;
  }

  isSunk() {
    return this.hp === 0;
  }
}

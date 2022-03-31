export default class Player {
  constructor(name, player) {
    this.name = name;
    this.player = player;
    if (this.player !== 'human') {
      this.makeCoords();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  makeAMove(gameboard, coords) {
    if (this.player === 'human') gameboard.receiveAttack(coords);
    else gameboard.receiveAttack(...this.takeRandomCoords());
  }

  takeRandomCoords() {
    const min = 0;
    const max = this.botCoords.length;
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    const thatAShot = this.botCoords.slice(randomNumber, randomNumber + 1);
    this.botCoords = [
      ...this.botCoords.slice(0, randomNumber),
      ...this.botCoords.slice(randomNumber + 1),
    ];
    console.log('shot:', thatAShot);
    return thatAShot;
  }

  makeCoords() {
    const row = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.botCoords = row
      .map((elem) => {
        const newRow = row.map((num) => [elem, num]);
        return newRow;
      })
      .flat();
  }
}

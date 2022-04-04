export default class Player {
  constructor(player) {
    this.player = player;
    this.makeCoords();
  }

  makeAMove(gameboard, display, node) {
    const coords = this.takeRandomCoords();

    if (gameboard.hitPlaceCheck(...coords).includes('h' || 'b')) {
      console.log('hit again');
      setTimeout(this.makeAMove(gameboard, display, node), 500);
    } else if (gameboard.hitPlaceCheck(...coords).includes('s')) {
      console.log('good shot, make one more');
      gameboard.receiveAttack(...coords);

      setTimeout(() => {
        display.renderField(gameboard.showField(), node);
        this.makeAMove(gameboard, display, node);
      }, 500);
    } else {
      gameboard.receiveAttack(...coords);
      setTimeout(() => {
        display.renderField(gameboard.showField(), node);
      }, 1000);
    }
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

  playerMove(field, coords) {
    if (field.hitPlaceCheck(coords).includes('h' || 'b')) {
      console.log('hit again');
      return false;
    }
    if (field.hitPlaceCheck(coords).includes('s')) {
      console.log('good shot, make one more');
      field.receiveAttack(coords);
      return false;
    }
    field.receiveAttack(coords);
    return true;
  }

  botMove(field, display, node) {
    this.makeAMove(field, display, node);
  }
}

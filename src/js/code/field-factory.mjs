export default class Field {
  static wave = `~`;

  constructor() {
    this.board = new Array(10);
    this.board.fill(Field.wave);
    this.board = this.board.map(() => [...this.board]);
  }

  showField() {
    return this.board;
  }

  setShipOnField(ship, coordinates, direction = 'hor') {
    const shipSize = ship.length;

    const checkCoords = this.isCoordsValid(coordinates);
    if (!checkCoords) throw new Error(`Sorry those coordinates doesn't exist`);

    const place = this.isEmpty(coordinates, direction, shipSize);
    if (!place) throw new Error(`Sorry thats impossible`);

    if (direction === 'hor') {
      this.setHorizontally(coordinates, shipSize);
      this.setShipsBorder();
    }
    if (direction === 'vert') {
      this.setVertically(coordinates, shipSize);
      this.setShipsBorder();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isCoordsValid(coordinates) {
    if (Math.min(...coordinates) < 0) return false;
    if (Math.min(...coordinates) > 10) return false;
    return true;
  }

  isEmpty([x, y], dir, size) {
    if (dir === 'hor') {
      for (let i = y; i < y + size; i += 1) {
        if (i > 10) return false;
        if (this.board[x][i] !== Field.wave) return false;
      }
    }
    if (dir === 'vert') {
      for (let i = x; i < x + size; i += 1) {
        if (i > 10) return false;
        if (this.board[i][y] !== Field.wave) return false;
      }
    }
    return true;
  }

  setHorizontally(coordinates, size) {
    const [x, y] = coordinates;
    for (let i = y; i < y + size; i += 1) {
      this.board[x][i] = '1';
    }
  }

  setVertically(coordinates, size) {
    const [x, y] = coordinates;
    for (let i = x; i < x + size; i += 1) {
      this.board[i][y] = '1';
    }
  }

  setShipsBorder() {
    const shippedSea = this.board;
    shippedSea.forEach((wave, index) => {
      if (wave.includes('1')) {
        wave.forEach((cub, met) => {
          if (cub === '1') {
            if (
              index - 1 >= 0 &&
              met - 1 >= 0 &&
              index + 1 <= 10 &&
              met + 1 <= 10
            ) {
              // put border on top
              (() => {
                if (shippedSea[index - 1][met - 1] === '~')
                  shippedSea[index - 1][met - 1] = 'b';
                if (shippedSea[index - 1][met + 1] === '~')
                  shippedSea[index - 1][met + 1] = 'b';

                if (shippedSea[index - 1][met] === '~')
                  shippedSea[index - 1][met] = 'b';
              })();
              // put border in the middle
              (() => {
                if (shippedSea[index][met - 1] === '~')
                  shippedSea[index][met - 1] = 'b';

                if (shippedSea[index][met + 1] === '~')
                  shippedSea[index][met + 1] = 'b';
              })();
              // put border down
              (() => {
                if (shippedSea[index + 1][met - 1] === '~')
                  shippedSea[index + 1][met - 1] = 'b';
                if (shippedSea[index + 1][met + 1] === '~')
                  shippedSea[index + 1][met + 1] = 'b';
                if (shippedSea[index + 1][met] === '~')
                  shippedSea[index + 1][met] = 'b';
              })();
            }
          }
        });
      }
    });
  }
}

export default class Field {
  static wave = `~`;

  static random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  constructor() {
    this.board = new Array(10);
    this.allSettledShips = {};
    // for each wave making array of waves
    this.board.fill(Field.wave);
    this.board = this.board.map(() => [...this.board]);
  }

  addShips(ships) {
    this.ships = ships;
  }

  showField() {
    return this.board;
  }

  // eslint-disable-next-line consistent-return
  setShipOnField(ship, coordinates, direction = 'hor') {
    const shipSize = ship.length;
    const checkCoords = this.isCoordsValid(coordinates);
    if (!checkCoords) throw new Error(`Sorry those coordinates doesn't exist`);

    const place = this.isEmpty(coordinates, direction, shipSize);
    // if (!place) throw new Error(`Sorry thats impossible`);
    if (!place) return this.autoSetShip();

    this.addShipToList(ship);
    // eslint-disable-next-line no-param-reassign
    ship.settled = true;
    if (direction === 'hor') {
      this.setHorizontally(coordinates, shipSize, ship.name);
    }

    if (direction === 'vert') {
      this.setVertically(coordinates, shipSize, ship.name);
    }
    this.setShipsBorder();
  }

  // eslint-disable-next-line class-methods-use-this
  isCoordsValid(coordinates) {
    if (Math.min(...coordinates) < 0) return false;
    if (Math.min(...coordinates) > 10) return false;
    return true;
  }

  // check trough coordinates if cell is empty = "~" if not return false
  isEmpty([x, y], dir, size) {
    if (dir === 'hor') {
      for (let i = y; i < y + size; i += 1) {
        if (i >= 10) return false;
        if (this.board[x][i] !== Field.wave) return false;
      }
    }
    if (dir === 'vert') {
      for (let i = x; i < x + size; i += 1) {
        if (i >= 10) return false;
        if (this.board[i][y] !== Field.wave) return false;
      }
    }
    return true;
  }

  setHorizontally(coordinates, size, name) {
    const [x, y] = coordinates;
    for (let i = y; i < y + size; i += 1) {
      this.board[x][i] = name;
    }
  }

  setVertically(coordinates, size, name) {
    const [x, y] = coordinates;
    for (let i = x; i < x + size; i += 1) {
      this.board[i][y] = name;
    }
  }

  setShipsBorder() {
    const shippedSea = this.board;
    const re = /^[\d]+s?$/;
    shippedSea.forEach((wave, y) => {
      wave.forEach((cub, x) => {
        if (cub.search(re) !== -1) {
          if (x === 0 && y === 0) {
            const dir = {
              bot: shippedSea[y + 1][x],
              right: shippedSea[y][x + 1],
              botR: shippedSea[y + 1][x + 1],
            };

            if (dir.bot === '~') shippedSea[y + 1][x] = 'b';
            if (dir.right === '~') shippedSea[y][x + 1] = 'b';
            if (dir.botR === '~') shippedSea[y + 1][x + 1] = 'b';
          }
          if (x === 0 && y === 9) {
            const dir = {
              top: shippedSea[y - 1][x],
              topR: shippedSea[y - 1][x + 1],
              right: shippedSea[y][x + 1],
            };

            if (dir.top === '~') shippedSea[y - 1][x] = 'b';
            if (dir.topR === '~') shippedSea[y - 1][x + 1] = 'b';
            if (dir.right === '~') shippedSea[y][x + 1] = 'b';
          }
          if (x === 9 && y === 0) {
            const dir = {
              bot: shippedSea[y + 1][x],
              left: shippedSea[y][x - 1],
              botL: shippedSea[y + 1][x - 1],
            };

            if (dir.bot === '~') shippedSea[y + 1][x] = 'b';
            if (dir.left === '~') shippedSea[y][x - 1] = 'b';
            if (dir.botL === '~') shippedSea[y + 1][x - 1] = 'b';
          }
          if (x === 9 && y === 9) {
            const dir = {
              top: shippedSea[y - 1][x],
              left: shippedSea[y][x - 1],
              topL: shippedSea[y - 1][x - 1],
            };

            if (dir.top === '~') shippedSea[y - 1][x] = 'b';
            if (dir.left === '~') shippedSea[y][x - 1] = 'b';
            if (dir.topL === '~') shippedSea[y - 1][x - 1] = 'b';
          }
          if (x === 0) {
            const dir = {
              right: shippedSea[y][x + 1],
            };
            if (dir.right === '~') shippedSea[y][x + 1] = 'b';

            if (y - 1 === 0 || y > 0) {
              dir.top = shippedSea[y - 1][x];
              dir.topR = shippedSea[y - 1][x + 1];

              if (dir.top === '~') shippedSea[y - 1][x] = 'b';
              if (dir.topR === '~') shippedSea[y - 1][x + 1] = 'b';
            }

            if (y + 1 === 9 || y < 9) {
              dir.bot = shippedSea[y + 1][x];
              dir.botR = shippedSea[y + 1][x + 1];

              if (dir.bot === '~') shippedSea[y + 1][x] = 'b';
              if (dir.botR === '~') shippedSea[y + 1][x + 1] = 'b';
            }

            // if (dir.botR === '~') shippedSea[y + 1][x + 1] = 'b';
          }
          if (x === 9) {
            const dir = {
              left: shippedSea[y][x - 1],
            };

            if (dir.left === '~') shippedSea[y][x - 1] = 'b';

            if (y - 1 === 0 || y > 0) {
              dir.top = shippedSea[y - 1][x];
              dir.topL = shippedSea[y - 1][x - 1];

              if (dir.top === '~') shippedSea[y - 1][x] = 'b';
              if (dir.topL === '~') shippedSea[y - 1][x - 1] = 'b';
            }

            if (y + 1 === 9 || y < 9) {
              dir.bot = shippedSea[y + 1][x];
              dir.botL = shippedSea[y + 1][x - 1];

              if (dir.bot === '~') shippedSea[y + 1][x] = 'b';
              if (dir.botL === '~') shippedSea[y + 1][x - 1] = 'b';
            }
          }

          if (y === 0) {
            const dir = {
              bot: shippedSea[y + 1][x],
            };

            if (dir.bot === '~') shippedSea[y + 1][x] = 'b';

            if (x - 1 === 0 || x > 0) {
              dir.left = shippedSea[y][x - 1];
              dir.botL = shippedSea[y + 1][x - 1];

              if (dir.left === '~') shippedSea[y][x - 1] = 'b';
              if (dir.botL === '~') shippedSea[y + 1][x - 1] = 'b';
            }

            if (x + 1 === 9 || x < 9) {
              dir.right = shippedSea[y][x + 1];
              dir.botR = shippedSea[y + 1][x + 1];

              if (dir.right === '~') shippedSea[y][x + 1] = 'b';
              if (dir.botR === '~') shippedSea[y + 1][x + 1] = 'b';
            }
          }
          if (y === 9) {
            const dir = {
              top: shippedSea[y - 1][x],
            };

            if (dir.top === '~') shippedSea[y - 1][x] = 'b';

            if (x - 1 === 0 || x > 0) {
              dir.left = shippedSea[y][x - 1];
              dir.topL = shippedSea[y - 1][x - 1];

              if (dir.left === '~') shippedSea[y][x - 1] = 'b';
              if (dir.topL === '~') shippedSea[y - 1][x - 1] = 'b';
            }

            if (x + 1 === 9 || x < 9) {
              dir.right = shippedSea[y][x + 1];
              dir.topR = shippedSea[y - 1][x + 1];

              if (dir.right === '~') shippedSea[y][x + 1] = 'b';
              if (dir.topR === '~') shippedSea[y - 1][x + 1] = 'b';
            }
          }

          if (x !== 0 && x !== 9 && y !== 0 && y !== 9) {
            // put border on top
            (() => {
              if (shippedSea[y - 1][x - 1] === '~')
                shippedSea[y - 1][x - 1] = 'b';
              if (shippedSea[y - 1][x + 1] === '~')
                shippedSea[y - 1][x + 1] = 'b';

              if (shippedSea[y - 1][x] === '~') shippedSea[y - 1][x] = 'b';
            })();
            // put border in the middle
            (() => {
              if (shippedSea[y][x - 1] === '~') shippedSea[y][x - 1] = 'b';

              if (shippedSea[y][x + 1] === '~') shippedSea[y][x + 1] = 'b';
            })();
            // put border down
            (() => {
              if (shippedSea[y + 1][x - 1] === '~')
                shippedSea[y + 1][x - 1] = 'b';
              if (shippedSea[y + 1][x + 1] === '~')
                shippedSea[y + 1][x + 1] = 'b';
              if (shippedSea[y + 1][x] === '~') shippedSea[y + 1][x] = 'b';
            })();
          }
        }
      });
    });
  }

  receiveAttack([y, x]) {
    const hitPlace = this.board[y][x];
    try {
      const shipRe = /^[\d]+s?$/;
      if (hitPlace.includes('h')) throw Error('Already hit');
      if (this.board[y][x].search(shipRe) !== -1) {
        this.allSettledShips[hitPlace].hit();
      }
      this.board[y][x] += 'h';
    } catch (e) {
      console.warn(e);
    }
  }

  shipsOnBoard() {
    const onBoard = Object.keys(this.allSettledShips).filter(
      (ship) => this.allSettledShips[ship].hp > 0
    );
    return onBoard.length;
  }

  addShipToList(ship) {
    const names = Object.keys(this.allSettledShips);
    let newName = '0';

    if (this.allSettledShips[`${newName}s`]) {
      newName = parseInt(names[names.length - 1], 10) + 1;
    }
    ship.giveAName(`${newName}s`);
    this.allSettledShips[`${newName}s`] = ship;
  }

  autoSetShip() {
    const lastedShips = this.ships.filter((ship) => ship.settled !== true);
    const [coords, side, index] = [
      [Field.random(0, 10), Field.random(0, 9)],
      Field.random(0, 2),
      Field.random(0, lastedShips.length),
    ];
    const direction = side > 0 ? 'hor' : 'vert';
    this.setShipOnField(lastedShips[index], coords, direction);
  }

  cleanBorder() {
    const array = this.board
      .flat()
      .map((elem) => (elem === 'b' ? Field.wave : elem));
    const spliced = [];
    while (array.length) {
      spliced.push(array.splice(0, 10));
    }
    this.board = spliced;
  }

  hitPlaceCheck([y, x]) {
    return this.board[y][x];
  }
}

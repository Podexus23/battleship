import Field from '../code/field-factory.mjs';
import Ship from '../code/ship-factory.mjs';

test('I wanna see a sea', () => {
  const sea = new Field();
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  expect(sea.showField()).toStrictEqual(baza);
});

test('place a little ship with 2 cell horizontally', () => {
  const sea = new Field();
  const firstClassShip = new Ship(2);
  const coordinates = [2, 3];
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', '1s', 'b', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates);
  expect(sea.showField()).toStrictEqual(baza);
});

test('place a little ship with 3 cell vertically', () => {
  const sea = new Field();
  const firstClassShip = new Ship(3);
  // const secondClassShip = new Ship(4);
  const coordinates = [2, 3];
  // const coordinates2 = [5, 4];
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'vert');
  // sea.setShipOnField(secondClassShip, coordinates2, 'vert');
  expect(sea.showField()).toStrictEqual(baza);
});

test('encounter between two ships, must return Error', () => {
  const sea = new Field();
  const firstClassShip = new Ship(3);
  const secondClassShip = new Ship(4);
  const coordinates = [2, 3];
  const coordinates2 = [5, 4];

  sea.setShipOnField(firstClassShip, coordinates, 'vert');

  expect(() =>
    sea.setShipOnField(secondClassShip, coordinates2, 'hor')
  ).toThrow();
});

test('encounter between two ships, without error', () => {
  const sea = new Field();
  const firstClassShip = new Ship(3);
  const secondClassShip = new Ship(4);
  const coordinates = [2, 3];
  const coordinates2 = [7, 3];
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', 'b', 'b', '~', '~'],
    ['~', '~', 'b', '2s', '2s', '2s', '2s', 'b', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', 'b', 'b', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'vert');
  sea.setShipOnField(secondClassShip, coordinates2, 'hor');
  expect(sea.showField()).toStrictEqual(baza);
});

test('ship can fits on a border of field', () => {
  const sea = new Field();
  const firstClassShip = new Ship(3);
  const coordinates = [0, 0];
  const baza = [
    ['1s', '1s', '1s', 'b', '~', '~', '~', '~', '~', '~'],
    ['b', 'b', 'b', 'b', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'hor');
  expect(sea.showField()).toStrictEqual(baza);
});

test('lil ship 0 0', () => {
  const sea = new Field();
  const firstClassShip = new Ship(1);
  const coordinates = [0, 0];
  const baza = [
    ['1s', 'b', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['b', 'b', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'hor');
  expect(sea.showField()).toStrictEqual(baza);
});

test('lil ship 0 9', () => {
  const sea = new Field();
  const firstClassShip = new Ship(1);
  const coordinates = [0, 9];
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', 'b', '1s'],
    ['~', '~', '~', '~', '~', '~', '~', '~', 'b', 'b'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'hor');
  expect(sea.showField()).toStrictEqual(baza);
});

test('lil ship 9 0', () => {
  const sea = new Field();
  const firstClassShip = new Ship(1);
  const coordinates = [9, 0];
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['b', 'b', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['1s', 'b', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'hor');
  expect(sea.showField()).toStrictEqual(baza);
});

test('lil ship 9 9', () => {
  const sea = new Field();
  const firstClassShip = new Ship(1);
  const coordinates = [9, 9];
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', 'b', 'b'],
    ['~', '~', '~', '~', '~', '~', '~', '~', 'b', '1s'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'hor');
  expect(sea.showField()).toStrictEqual(baza);
});

test('put border ship(3) y:9 x:0 horizont', () => {
  const sea = new Field();
  const firstClassShip = new Ship(3);
  const coordinates = [9, 0];
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['b', 'b', 'b', 'b', '~', '~', '~', '~', '~', '~'],
    ['1s', '1s', '1s', 'b', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'hor');
  expect(sea.showField()).toStrictEqual(baza);
});

test('put border ship(3) y:6 x:0 vertically', () => {
  const sea = new Field();
  const firstClassShip = new Ship(3);
  const coordinates = [6, 0];
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['b', 'b', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['1s', 'b', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['1s', 'b', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['1s', 'b', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['b', 'b', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'vert');
  expect(sea.showField()).toStrictEqual(baza);
});

test('Atack test(6,1), (6,0) (2, 1) (ship(3) y:6 x:0 vertically)', () => {
  const sea = new Field();
  const firstClassShip = new Ship(3);
  const coordinates = [6, 0];
  const coordAtack1 = [6, 1];
  const coordAtack2 = [6, 0];
  const coordAtack3 = [2, 1];
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~h', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['b', 'b', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['1sh', 'bh', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['1s', 'b', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['1s', 'b', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['b', 'b', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'vert');
  sea.receiveAttack(coordAtack1);
  sea.receiveAttack(coordAtack2);
  sea.receiveAttack(coordAtack3);
  expect(sea.showField()).toStrictEqual(baza);
});

test('how many ships on board(2)', () => {
  const sea = new Field();
  const firstClassShip = new Ship(3);
  const secondClassShip = new Ship(4);
  const coordinates = [2, 3];
  const coordinates2 = [7, 3];
  sea.setShipOnField(firstClassShip, coordinates, 'vert');
  sea.setShipOnField(secondClassShip, coordinates2, 'hor');
  expect(sea.shipsOnBoard()).toStrictEqual(2);
});

test('the ships are vicini', () => {
  const sea = new Field();
  const firstClassShip = new Ship(3);
  const secondClassShip = new Ship(4);
  const coordinates = [2, 3];
  const coordinates2 = [6, 3];
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', 'b', 'b', '~', '~'],
    ['~', '~', 'b', '2s', '2s', '2s', '2s', 'b', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', 'b', 'b', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'vert');
  sea.setShipOnField(secondClassShip, coordinates2, 'hor');
  expect(sea.showField()).toStrictEqual(baza);
});

test('Some named ships', () => {
  const sea = new Field();
  const firstClassShip = new Ship(3);
  const secondClassShip = new Ship(4);
  const coordinates = [2, 3];
  const coordinates2 = [6, 3];
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', 'b', 'b', '~', '~'],
    ['~', '~', 'b', '2s', '2s', '2s', '2s', 'b', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', 'b', 'b', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'vert');
  sea.setShipOnField(secondClassShip, coordinates2, 'hor');
  expect(sea.showField()).toStrictEqual(baza);
});

test('Call my by your name', () => {
  const sea = new Field();
  const firstClassShip = new Ship(3);
  const secondClassShip = new Ship(4);
  const coordinates = [2, 3];
  const coordinates2 = [6, 3];
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', 'b', 'b', '~', '~'],
    ['~', '~', 'b', '2sh', '2s', '2s', '2s', 'b', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', 'b', 'b', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'vert');
  sea.setShipOnField(secondClassShip, coordinates2, 'hor');
  sea.receiveAttack(coordinates2);
  expect(sea.allSettledShips['2s'].hp).toBe(3);
  expect(sea.showField()).toStrictEqual(baza);
});

test('Tango down, tango down', () => {
  const sea = new Field();
  const firstClassShip = new Ship(3);
  const secondClassShip = new Ship(4);
  const coordinates = [2, 3];
  const coordinates2 = [6, 3];
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', 'b', 'b', '~', '~'],
    ['~', '~', 'b', '2sh', '2sh', '2sh', '2sh', 'b', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', 'b', 'b', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'vert');
  sea.setShipOnField(secondClassShip, coordinates2, 'hor');
  sea.receiveAttack([6, 3]);
  sea.receiveAttack([6, 4]);
  sea.receiveAttack([6, 5]);
  sea.receiveAttack([6, 6]);
  expect(sea.allSettledShips['2s'].hp).toBe(0);
  expect(sea.shipsOnBoard()).toStrictEqual(1);
  expect(sea.showField()).toStrictEqual(baza);
});

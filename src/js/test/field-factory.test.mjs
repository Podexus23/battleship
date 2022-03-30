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
    ['~', '~', 'b', '1', '1', 'b', '~', '~', '~', '~'],
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
    ['~', '~', 'b', '1', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1', 'b', '~', '~', '~', '~', '~'],
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
    ['~', '~', 'b', '1', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', '1', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', 'b', 'b', '~', '~'],
    ['~', '~', 'b', '1', '1', '1', '1', 'b', '~', '~'],
    ['~', '~', 'b', 'b', 'b', 'b', 'b', 'b', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  sea.setShipOnField(firstClassShip, coordinates, 'vert');
  sea.setShipOnField(secondClassShip, coordinates2, 'hor');
  expect(sea.showField()).toStrictEqual(baza);
});

// пофиксить координаты что бы они были [1, 10];
// пофиксить ввод барьеров на границах полей, т.к. сейчас они вообще не выводятся

import Ship from '../code/ship-factory.mjs';

const HP = 3;

it('get ship length', () => {
  const firstShip = new Ship(HP);
  expect(firstShip.length).toBe(HP);
});

it('get ship hits', () => {
  const firstShip = new Ship(HP);
  firstShip.hit(1);
  expect(firstShip.getHP()).toBe(firstShip.length - 1);
});

it('is ship sunk?', () => {
  const firstShip = new Ship(HP);
  firstShip.hit(1);
  firstShip.hit(2);
  firstShip.hit(3);
  expect(firstShip.isSunk()).toBe(true);
});

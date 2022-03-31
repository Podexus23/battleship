import Field from '../code/field-factory.mjs';
import Ship from '../code/ship-factory.mjs';
import Player from '../code/player.mjs';

test('testin name Robocop', () => {
  const bot = new Player('Robocop');
  expect(bot.name).toBe('Robocop');
});

test('robocop make a shot at 2:2 and 1:1', () => {
  const sea = new Field();
  const lilShip = new Ship(2);
  const coordinates = [2, 2];
  const coordinates2 = [1, 1];
  sea.setShipOnField(lilShip, coordinates);
  const bot = new Player('Robocop', 'human');
  bot.makeAMove(sea, coordinates);
  bot.makeAMove(sea, coordinates2);
  const baza = [
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', 'bh', 'b', 'b', 'b', '~', '~', '~', '~', '~'],
    ['~', 'b', '1sh', '1s', 'b', '~', '~', '~', '~', '~'],
    ['~', 'b', 'b', 'b', 'b', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
    ['~', '~', '~', '~', '~', '~', '~', '~', '~', '~'],
  ];
  expect(sea.showField()).toStrictEqual(baza);
});
test('robocop never shots twice in one place', () => {
  const sea = new Field();
  const lilShip = new Ship(2);
  const coordinates = [2, 2];
  sea.setShipOnField(lilShip, coordinates);
  const bot = new Player('Robocop', 'loh');
  bot.makeAMove(sea, coordinates);
  bot.makeAMove(sea, coordinates);

  expect(bot.botCoords.length).toStrictEqual(98);
});
test('robocop shoot everything', () => {
  const sea = new Field();
  const bot = new Player('Robocop', 'loh');
  for (let i = 0; i < 100; i += 1) {
    bot.makeAMove(sea);
  }
  const baza = [
    ['~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h'],
    ['~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h'],
    ['~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h'],
    ['~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h'],
    ['~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h'],
    ['~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h'],
    ['~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h'],
    ['~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h'],
    ['~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h'],
    ['~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h', '~h'],
  ];
  expect(sea.showField()).toStrictEqual(baza);
});

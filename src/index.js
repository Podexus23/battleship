import './assets/stylesheets/main.scss';
import Sprite from './assets/svg/sprite.svg';

import Game from './js/code/game-loop.mjs';
import Field from './js/code/field-factory.mjs';
import Player from './js/code/player.mjs';
import Ship from './js/code/ship-factory.mjs';
import RenderMachine from './js/code/renderer.mjs';

const icons = Sprite;
const renderer = new RenderMachine(icons);
const fields = {
  p1: [new Field(), new Field()],
  p2: [new Field(), new Field()],
};

const party = [new Player('human'), new Player('machine')];
const admin = new Game('admin', fields, party, renderer);

function addFleetToField(gameField) {
  gameField.addShips([
    new Ship(4),
    new Ship(3),
    new Ship(3),
    new Ship(2),
    new Ship(2),
    new Ship(2),
    new Ship(1),
    new Ship(1),
    new Ship(1),
    new Ship(1),
  ]);
}
Object.values(fields).flat().forEach(addFleetToField);

function startGame() {
  admin.start();
}

function loadMainPAge() {
  renderer.makeMainPage();
  const startButton = document.querySelector('.intro');
  startButton.addEventListener('click', startGame);
}
loadMainPAge();

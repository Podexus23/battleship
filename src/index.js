import './assets/stylesheets/main.scss';
import Sprite from './assets/svg/sprite.svg';

import Game from './js/code/game-loop.mjs';
import Field from './js/code/field-factory.mjs';
import Player from './js/code/player.mjs';
import Ship from './js/code/ship-factory.mjs';
import RenderMachine from './js/code/renderer.mjs';

// eslint-disable-next-line no-unused-vars
const pageController = (function () {
  const icons = Sprite;
  const renderer = new RenderMachine(icons);
  renderer.makeMainPage(); // delete later

  const admin = new Game('admin');

  function startGame() {
    const fields = {
      p1: [new Field(), new Field()],
      p2: [new Field(), new Field()],
    };

    renderer.gameStartCondition();
    renderer.renderField(fields.p1[0].showField(), '.player-desk .my-field');
    renderer.renderField(fields.p1[1].showField(), '.player-desk .enemy-field');
    renderer.renderField(fields.p2[0].showField(), '.opponent-desk .my-field');
    renderer.renderField(
      fields.p2[1].showField(),
      '.opponent-desk .enemy-field'
    );

    const fieldsOnBoard = document.querySelectorAll('.field');
    fieldsOnBoard.forEach((elem) => {
      elem.addEventListener('click', admin.clickOnBoard);
    });
  }
  startGame();
  // (function () {
  //   renderer.makeMainPage();
  //   const startButton = document.querySelector('.intro');
  //   startButton.addEventListener('click', startGame);
  // })();

  const ship = new Ship('Some another game');
  const player = new Player('Some another game');
  const sea = new Field('Some another game');
  const game = new Game(sea, player, ship);
  game.start();
})();

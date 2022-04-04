export default class GameLoop {
  constructor(name, fields, players, display) {
    this.name = name;
    this.fields = fields;
    this.players = players;
    this.display = display;
  }

  startBasedAutoSail() {
    console.log(this);
    this.display.gameStartCondition();
    this.fieldNodes = [
      document.querySelector('.player-desk .my-field'),
      document.querySelector('.opponent-desk .my-field'),
    ];
    this.loadStartFields();
    this.shipAutoSail();
  }

  loadStartFields() {
    this.display.renderField(this.fields.p1.showField(), this.fieldNodes[0]);
    this.display.renderField(this.fields.p2.showField(), this.fieldNodes[1]);

    const gameBoard = document.querySelector('.opponent-desk');

    gameBoard.addEventListener('click', this.gameCycle.bind(this));
  }

  shipAutoSail() {
    for (let i = 0; i < 10; i += 1) {
      this.fields.p1.autoSetShip(i);
      this.display.renderField(this.fields.p1.showField(), this.fieldNodes[0]);
    }
    for (let i = 0; i < 10; i += 1) {
      this.fields.p2.autoSetShip(i);
      this.display.renderField(this.fields.p2.showField(), this.fieldNodes[1]);
    }
    this.fields.p1.cleanBorder();
    this.display.renderField(this.fields.p1.showField(), this.fieldNodes[0]);

    this.fields.p2.cleanBorder();
    this.display.renderField(this.fields.p2.showField(), this.fieldNodes[1]);
  }

  gameCycle(e) {
    if (!e.target.classList.contains('cell')) return;

    this.whoIsMoving(e);
  }

  whoIsMoving(e) {
    let canBotMove = false;
    const playerNode = this.fieldNodes[0];
    const botNode = this.fieldNodes[1];
    const re = /[\d]/g;
    const coords = e.target.dataset.id.slice(2).match(re);
    canBotMove = this.players[0].playerMove(this.fields.p2, coords);
    this.display.renderField(this.fields.p2.showField(), botNode);

    if (canBotMove) {
      this.players[1].botMove(this.fields.p1, this.display, playerNode);
      canBotMove = false;
    }
    this.checkWinCondition();
  }

  checkWinCondition() {
    const play = this.fields.p1.ships.filter((elem) => elem.settled);
    if (play.length === 0) console.log('bot won the game');
    const bot = this.fields.p2.ships.filter((elem) => elem.settled);
    if (bot.length === 0) console.log('i won the game');
  }
}

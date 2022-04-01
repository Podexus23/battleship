export default class GameLoop {
  constructor(name, fields, players, display) {
    this.name = name;
    this.fields = fields;
    this.players = players;
    this.display = display;
  }

  start() {
    console.log(this);
    this.display.gameStartCondition();
    this.fieldNodes = [
      document.querySelector('.player-desk .my-field'),
      document.querySelector('.player-desk .enemy-field'),
      document.querySelector('.opponent-desk .my-field'),
      document.querySelector('.opponent-desk .enemy-field'),
    ];
    this.renderStartFields();
    this.clickOnBoard();
  }

  renderStartFields() {
    this.display.renderField(this.fields.p1[0].showField(), this.fieldNodes[0]);
    this.display.renderField(this.fields.p1[1].showField(), this.fieldNodes[1]);
    this.display.renderField(this.fields.p2[0].showField(), this.fieldNodes[2]);
    this.display.renderField(this.fields.p2[1].showField(), this.fieldNodes[3]);
  }

  clickOnBoard() {
    const consoleClick = (e) => {
      if (!e.target.classList.contains('cell')) return;
      this.traceHit(e);
    };

    this.fieldNodes.forEach((elem) => {
      this.display.addFieldListener('click', elem, consoleClick);
    });
  }

  traceHit(e) {
    /* разложить выстрел:
    1.определить и ноду и объект поля
    2.определить координаты.
    3.зафиксировать выстрел в объекте.
    4.отрендерить ноду относительно объекта.
    */
    const node = this.fieldNodes.filter(
      (elem) => elem === e.target.parentNode.parentNode
    )[0];
    const re = /[\d]/g;
    const [side, coords] = [
      e.target.dataset.id.slice(0, 2),
      e.target.dataset.id.slice(2).match(re),
    ];

    console.dir(node);
    console.log(side, coords);
    console.log(node.classList);
    const fieldNumber = node.classList.contains('my-field') ? 0 : 1;
    this.fields[side][fieldNumber].receiveAttack(coords);
    this.display.renderField(this.fields[side][fieldNumber].showField(), node);
    // receiveAttack([y, x])
    // console.log(e.target);
  }
}

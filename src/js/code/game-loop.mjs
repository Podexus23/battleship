export default class GameLoop {
  constructor(name) {
    this.name = name;
  }

  start() {
    console.log('fk u eslint');
  }

  clickOnBoard(e) {
    if (!e.target.classList.contains('cell')) return;
    console.log(e.target.dataset.id);
  }
}

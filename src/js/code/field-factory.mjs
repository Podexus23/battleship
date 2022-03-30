export default class Field {
  constructor() {
    const wave = `~`;
    this.board = new Array(10);
    this.board.fill(wave);
    this.board = this.board.map(() => this.board);
  }

  showField() {
    return this.board;
  }
}

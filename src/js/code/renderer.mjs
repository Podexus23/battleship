export default class Renderer {
  constructor(icons) {
    this.icons = icons;
  }

  makeMainPage() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('page-wrapper');
    document.body.append(this.wrapper);

    this.wrapper.append(this.makeHeader());
    this.wrapper.append(this.makeContent());
    this.wrapper.append(this.makeFooter());
  }

  makeHeader() {
    const header = document.createElement('header');
    header.classList.add('header');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('logo');
    svg2.classList.add('logo');
    const h1 = document.createElement('h1');
    h1.classList.add('header-title');
    h1.innerText = 'battleship';
    svg.innerHTML = `<use xlink:href="${this.icons}#logo"></use>`;
    svg2.innerHTML = `<use xlink:href="${this.icons}#logo"></use>`;
    header.append(svg);
    header.append(h1);
    header.append(svg2);
    return header;
  }

  makeContent() {
    const content = document.createElement('main');
    content.classList.add('content');
    content.innerHTML = `<button class="intro">Start game</button>`;

    return content;
  }

  makeFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.innerHTML =
      '<p>Made by <a href="https://github.com/Podexus23?tab=repositories">Podexus23</a></p>';

    return footer;
  }

  gameStartCondition() {
    const content = document.querySelector('.content');
    content.innerHTML = `<div class="game-on">
    <div class="gameside player">
      <h3 class="player-title">You</h3>
      <div class="player-desk desk">
        <div class="my-field field"></div>
        <h3 class="divide-title">Enemy sea</h3>
        <div class="enemy-field field"></div>
      </div>
    </div>
    <div class="gameside opponent">
      <h3 class="opponent-title">Opponent(not you)</h3>
      <div class="opponent-desk desk">
        <div class="my-field field"></div>
        <h3 class="divide-title">Enemy sea</h3>
        <div class="enemy-field field"></div>
      </div>
    </div>
  </div>`;
  }

  renderField(field, nodeName) {
    const nodeClass = nodeName;
    field.forEach((wave, i) => this.renderFieldWave(wave, i, nodeClass));
  }

  renderFieldWave(wave, i, nodeClass) {
    const playerDesk = document.querySelector(nodeClass);
    const row = document.createElement('div');
    let id = `p1y${i}`;
    row.classList.add('wave');
    if (nodeClass.includes('player')) id = `p1y${i}`;
    if (nodeClass.includes('opponent')) id = `p2y${i}`;
    this.renderFieldCell(wave, row, id);
    playerDesk.append(row);
  }

  renderFieldCell(text, node, id) {
    text.forEach((cell, i) => {
      const div = document.createElement('div');
      div.classList.add('cell');
      div.dataset.id = `${id}x${i}`;
      div.textContent = cell;
      node.append(div);
    });
  }
}

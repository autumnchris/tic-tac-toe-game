import Header from './modules/Header';
import Footer from './modules/Footer';
import GameSettings from './modules/GameSettings';
import Game from './modules/Game';

class App {
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.game = new Game();
    this.gameSettings = new GameSettings(this.game);
    this.renderApp();
  }

  // Event listeners
  events() {
    document.addEventListener('click', event => {
      const element = event.target;
      element.matches('#modal .game-settings-button') ? this.gameSettings.openGameSettings() : null;
      element.matches('.game-board .square-container .square') ? this.game.selectSquare(event) : null;
      element.matches('#modal .restart-button') ? this.game.restart() : null;
    });

    document.addEventListener('change', event => {
      const element = event.target;
      element.matches('.game-settings-form #players-input') ? this.gameSettings.toggleOnePlayerSettings(element.value) : null;
    });

    document.addEventListener('submit', event => {
      const element = event.target;

      if (element.matches('.game-settings-form')) {
        element.difficulty && element.playAs ? this.gameSettings.handleSubmit(event, {
          players: document.getElementById('players-input').value,
          difficulty: document.getElementById('difficulty-input').value,
          playAs: document.getElementById('play-as-input').value
        }) : this.gameSettings.handleSubmit(event, {
          players: document.getElementById('players-input').value,
          difficulty: null,
          playAs: null
        });
      }
    });
  }

  // DOM methods
  renderApp() {
    this.header.renderHeader('#app');
    this.renderMain('#app');
    this.footer.renderFooter('#app');
    this.gameSettings.openGameSettings();
    this.events();
  }

  renderMain(location) {
    const main = document.createElement('main');
    main.innerHTML = `<div class="game-container"></div>`;
    document.querySelector(location).appendChild(main);
  }
}

export default App;
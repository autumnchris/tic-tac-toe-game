import starWarsLogo from '../images/star-wars-logo.png';
import { GameSettings } from './game-settings';
import { Game } from './game';

const App = (() => {

  function renderApp() {
    document.getElementById('app').innerHTML = `
    <header>
      <h1>
        <img src="${starWarsLogo}" class="star-wars-logo" alt="Star Wars" />
      </h1>
      <h2>Tic-Tac-Toe</h2>
    </header>
    <main>
      <div class="game-container"></div>
    </main>
    <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; ${new Date().getFullYear()}</footer>`;

    GameSettings.renderGameSettings();

    document.addEventListener('click', event => {
      const element = event.target;
      element.matches('.square') ? Game.playTurn(event) : null;
      element.matches('.restart-button') ? Game.startNewGame(Game.setGameFormData()) : null;
      element.matches('.game-settings-button') ? GameSettings.renderGameSettings() : null;
    });

    document.addEventListener('change', event => {
      const element = event.target;
      element.matches('.game-settings-form #players-input') ? GameSettings.toggleOnePlayerSettings(element[element.selectedIndex].value) : null;
    });

    document.addEventListener('submit', event => {
      const element = event.target;

      if (element.matches('.game-settings-form')) {
        element[1].name === 'difficulty' ? GameSettings.handleSubmit(event, document.getElementById('players-input').value, document.getElementById('difficulty-input').value, document.getElementById('play-as-input').value) : GameSettings.handleSubmit(event, document.getElementById('players-input').value)
      }
    });
  }

  return {
    renderApp
  };
})();

export { App };
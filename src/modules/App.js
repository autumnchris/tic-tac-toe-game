import starWarsLogo from '../assets/images/star-wars-logo.png';
import { GameSettings } from './GameSettings';
import { Game } from './Game';

const App = (() => {

  // Creates the DOM elements for the webpage content
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
    <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; ${new Date().getFullYear()}</footer>`;

    GameSettings.renderGameSettings();

    // Click Event Listeners
    document.addEventListener('click', event => {
      const element = event.target;
      element.matches('.square') ? Game.selectSquare(event) : null;
      element.matches('.restart-button') ? Game.startNewGame(GameSettings.returnGameSettingsData()) : null;
      element.matches('.game-settings-button') ? GameSettings.renderGameSettings() : null;
    });

    // Change Event Listeners
    document.addEventListener('change', event => {
      const element = event.target;
      element.matches('.game-settings-form #players-input') ? GameSettings.toggleOnePlayerSettings(element[element.selectedIndex].value) : null;
    });

    // Submit Event Listeners
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

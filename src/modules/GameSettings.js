import Game from './Game';
import NewGameModal from './NewGameModal';
import SettingsFormData from './SettingsFormData';

class GameSettings {
  constructor() {
    this.game = new Game();
    this.newGameModal = new NewGameModal();
  }

  handleSubmit(event, gameSettingsData) {
    event.preventDefault();
    const gameSettings = new SettingsFormData(gameSettingsData.players, gameSettingsData.difficulty, gameSettingsData.playAs);
    this.removeGameSettings('.game-container');
    this.game.startNewGame(gameSettings);
  }

  toggleOnePlayerSettings(players) {
    this.removeOnePlayerSettings('.game-settings-form');

    if (players === '1-player') {
      this.renderOnePlayerSettings(['.game-settings-form', '.button-group']);
    }
  }

  openGameSettings() {
    this.newGameModal.removeNewGameModal('main');
    this.game.removeGameBoard('.game-container');
    this.renderGameSettings('.game-container');
  }

  // DOM methods
  renderOnePlayerSettings(location) {
    const onePlayerSettings = document.createElement('div');
    onePlayerSettings.classList.add('one-player-settings');
    onePlayerSettings.innerHTML = `
      <div class="form-group one-player-setting difficulty">
        <label for="difficulty-input">Difficulty:</label>
        <div class="select-wrapper">
          <select name="difficulty" id="difficulty-input" autocomplete="off" required>
            <option value="easy" selected>Easy</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <div class="form-group one-player-setting play-as">
        <label for="play-as-input">Play as:</label>
        <div class="select-wrapper">
          <select name="playAs" id="play-as-input" autocomplete="off" required>
            <option value="Rebellion" selected>Rebel Alliance</option>
            <option value="Empire">Galactic Empire</option>
          </select>
        </div>
      </div>
    `;

    if (typeof location === 'string') {
      document.querySelector(location).appendChild(onePlayerSettings);
    }
    else if (Array.isArray(location)) {
      document.querySelector(location[0]).insertBefore(onePlayerSettings, document.querySelector(location[1]));
    }
  }

  removeOnePlayerSettings(location) {
    const onePlayerSettings = document.querySelector(`${location} .one-player-settings`);
    onePlayerSettings ? document.querySelector(location).removeChild(onePlayerSettings) : null;
  }

  renderGameSettings(location) {
    const gameSettings = document.createElement('div');
    gameSettings.classList.add('game-settings-container');
    gameSettings.innerHTML = `
      <h3>Start a New Game</h3>
      <form class="game-settings-form" novalidate>
        <div class="form-group players">
          <label for="players-input">Players:</label>
          <div class="select-wrapper">
            <select name="players" id="players-input" autocomplete="off" required>
              <option value="1-player" selected>Organic vs. Droid (1-Player)</option>
              <option value="2-player">Organic vs. Organic (2-Player)</option>
            </select>
          </div>
        </div>
        <div class="button-group">
          <button type="submit" class="button start-button">Start</button>
        </div>
      </form>
    `;
    document.querySelector(location).appendChild(gameSettings);
    this.toggleOnePlayerSettings('1-player');
  }

  removeGameSettings(location) {
    const gameSettings = document.querySelector(`${location} .game-settings-container`);
    gameSettings ? document.querySelector(location).removeChild(gameSettings) : null;
  }
}

export default GameSettings;
import { Game } from "./Game";
import { NewGameModal } from "./NewGameModal";

const GameSettings = (() => {
  let gameSettingsData;

  // Factory function to create data for a new settings form submission
  const SettingsFormData = (players, difficulty, playAs) => {
    return {
      players,
      difficulty,
      playAs
    };
  };

  // Creates the DOM elements for the game settings form
  function renderGameSettings() {
    document.querySelector('.game-container').innerHTML = `<div class="game-settings-container">
      <h3>Start a New Game</h3>
      <form class="game-settings-form" novalidate>
        <div class="form-group players">
          <label for="players-input">Players:</label>
          <div class="select-wrapper">
            <select name="players" id="players-input" required>
              <option value="1-player" selected>Organic vs. Droid (1-Player)</option>
              <option value="2-player">Organic vs. Organic (2-Player)</option>
            </select>
          </div>
        </div>
        <div class="button-group">
          <button type="submit" class="button start-button">Start</button>
        </div>
      </form>
    </div>`;

    toggleOnePlayerSettings('1-player');
    NewGameModal.closeNewGameModal();
  }

  // Shows/Hides the settings options that applies to a 1-player game only
  function toggleOnePlayerSettings(players) {
    let onePlayerSettings;

    if (players === '1-player') {
      onePlayerSettings = document.createElement('div');
      onePlayerSettings.classList.add('one-player-settings');
      onePlayerSettings.innerHTML = `
      <div class="form-group one-player-setting difficulty">
        <label for="difficulty-input">Difficulty:</label>
        <div class="select-wrapper">
          <select name="difficulty" id="difficulty-input" required>
            <option value="easy" selected>Easy</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <div class="form-group one-player-setting play-as">
        <label for="play-as-input">Play as:</label>
        <div class="select-wrapper">
          <select name="play-as" id="play-as-input" required>
            <option value="Rebellion" selected>Rebel Alliance</option>
            <option value="Empire">Galactic Empire</option>
          </select>
        </div>
      </div>`;
      
      document.querySelector('.game-settings-form').insertBefore(onePlayerSettings, document.querySelector('.button-group'));
    }
    else {
      onePlayerSettings = document.querySelector('.game-settings-form .one-player-settings');
      onePlayerSettings ? document.querySelector('.game-settings-form').removeChild(onePlayerSettings) : null;
    }
  }

  // Submit handler for the game settings form
  function handleSubmit(event, players, difficulty = null, playAs = null) {
    event.preventDefault();
    gameSettingsData = SettingsFormData(players, difficulty, playAs);
    Game.startNewGame(gameSettingsData);
  }

  // Returns the values of the current game settings
  function returnGameSettingsData() {
    return gameSettingsData;
  }

  return {
    renderGameSettings,
    toggleOnePlayerSettings,
    handleSubmit,
    returnGameSettingsData
  };
})();

export { GameSettings };

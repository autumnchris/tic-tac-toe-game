import { Game } from "./game";
import { NewGameModal } from "./new-game-modal";

const GameSettings = (() => {

  function renderGameSettings() {
    document.querySelector('.game-container').innerHTML = `<div class="game-settings-container">
      <h3>Start a New Game</h3>
      <form class="game-settings-form">
        <div class="form-group players">
          <label for="players-input">Players:</label>
          <div class="select-wrapper">
            <select name="players" id="players-input">
              <option value="1-player" selected>Organic vs. Droid (1-Player)</option>
              <option value="2-player">Organic vs. Organic (2-Player)</option>
            </select>
          </div>
        </div>
        <div class="button-group">
          <input type="submit" class="button start-button" value="Start" />
        </div>
      </form>
    </div>`;

    toggleOnePlayerSettings('1-player');
    NewGameModal.closeNewGameModal();
  }

  function toggleOnePlayerSettings(players) {
    let onePlayerSettings;

    if (players === '1-player') {
      onePlayerSettings = document.createElement('div');
      onePlayerSettings.classList.add('one-player-settings');
      onePlayerSettings.innerHTML = `
      <div class="form-group one-player-setting difficulty">
        <label for="difficulty-input">Difficulty:</label>
        <div class="select-wrapper">
          <select name="difficulty" id="difficulty-input">
            <option value="easy" selected>Easy</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <div class="form-group one-player-setting play-as">
        <label for="play-as-input">Play as:</label>
        <div class="select-wrapper">
          <select name="play-as" id="play-as-input">
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

  function handleSubmit(event, players, difficulty = null, playAs = null) {
    event.preventDefault();
    const newGameFormData = Game.setGameFormData({
      players,
      difficulty,
      playAs
    });
    Game.startNewGame(newGameFormData);
  }

  return {
    renderGameSettings,
    toggleOnePlayerSettings,
    handleSubmit
  };
})();

export { GameSettings };
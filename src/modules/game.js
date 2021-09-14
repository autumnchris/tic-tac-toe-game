const Game = (() => {
  let board = new Array(9).fill('');

  function renderGameBoard(firstPlayer) {
    document.querySelector('.game-container').innerHTML = `<div class="board-container">
      <div class="button-group">
        <button type="button" class="button restart-button">Restart</button>
        <button type="button" class="button settings-button">Settings</button>
      </div>
      <p class="current-turn-message">The ${firstPlayer} goes first!</p>
      <div class="game-board">
        ${board.map((square, index) => {
          return `<div class="square fab" id="${index}"></div>`;
        }).join('')}
      </div>
    </div>`;
  }
})();

export { Game };

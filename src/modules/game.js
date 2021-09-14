import { NewGameModal } from './new-game-modal';

const Game = (() => {
  const winningCombinations = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ]
  ];
  let board;
  let currentPlayer;

  const Player = (playerType, playAs) => {
    return {
      playerType,
      playAs
    };
  };

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

  function startNewGame(players, difficulty = null, playAs = null) {
    let playerOne;
    let playerTwo;
    board = new Array(9).fill('');

    if (players === '1-player') {
      console.log('One player game...');
    }
    else {
      playerOne = Player('human', 'Rebellion');
      playerTwo = Player('human', 'Empire');
    }
    currentPlayer = playerOne.playAs;
    renderGameBoard(playerOne.playAs);
    console.log(playerOne);
    console.log(playerTwo);
    NewGameModal.closeNewGameModal();
  }

  function playTurn(event) {

    if (!board[event.target.id]) {
      board[event.target.id] = currentPlayer.toLowerCase();
      document.getElementById(event.target.id).classList.add(`fa-${currentPlayer === 'Rebellion' ? 'rebel' : 'empire'}`, currentPlayer.toLowerCase(), 'selected');

      if (checkForWinner(currentPlayer)) {
        endGame(currentPlayer);
      }
      else if (checkForDraw()) {
        endGame('draw');
      }
      else {
        currentPlayer === 'Rebellion' ? currentPlayer = 'Empire' : currentPlayer = 'Rebellion';
        document.querySelector('.current-turn-message').innerHTML = `It's the ${currentPlayer}'s turn.`;
      }
    }
  }

  function checkForWinner(player) {
    return winningCombinations.some(combination => {
      return combination.every(val => {
        return board[val] === player.toLowerCase();
      });
    });
  }

  function checkForDraw() {
    return board.every(square => {
      return square;
    });
  }

  function endGame(winner) {
    let endGameMessage;
    winner === 'draw' ? endGameMessage = 'It\'s a draw!' : endGameMessage = `The ${winner} won!`;
    NewGameModal.openNewGameModal(endGameMessage, winner);
  }

  return {
    startNewGame,
    playTurn
  };
})();

export { Game };

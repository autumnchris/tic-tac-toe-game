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
  let gameFormData;
  let board;
  let playerOne;
  let playerTwo;
  let currentPlayer;

  const Player = (playerType, playAs) => {
    return {
      playerType,
      playAs
    };
  };

  function renderGameBoard(firstPlayer) {
    document.querySelector('.game-container').innerHTML = `<div class="board-container">
      <p class="current-turn-message">The ${firstPlayer.playAs} goes first!</p>
      <div class="game-board">
        ${board.map((square, index) => {
          return `<div class="square fab" id="${index}"></div>`;
        }).join('')}
      </div>
      <button type="button" class="button restart-button">Restart</button>
    </div>`;
  }

  function setGameFormData(newGameFormData) {
    if (newGameFormData) gameFormData = newGameFormData;
    return gameFormData;
  }

  function startNewGame(gameData) {
    board = new Array(9).fill('');

    if (gameData.players === '1-player') {
      playerOne = Player('human', gameData.playAs);
      playerTwo = Player('ai', gameData.playAs === 'Rebellion' ? 'Empire' : 'Rebellion');
    }
    else {
      playerOne = Player('human', 'Rebellion');
      playerTwo = Player('human', 'Empire');
    }

    currentPlayer = playerOne;
    renderGameBoard(currentPlayer);
    NewGameModal.closeNewGameModal();
  }

  function playTurn(event) {

    if (!board[event.target.id]) {
      board[event.target.id] = currentPlayer.playAs.toLowerCase();
      document.getElementById(event.target.id).classList.add(`fa-${currentPlayer.playAs === 'Rebellion' ? 'rebel' : 'empire'}`, currentPlayer.playAs.toLowerCase(), 'selected');

      if (checkForWinner(currentPlayer.playAs)) {
        endGame(currentPlayer.playAs);
      }
      else if (checkForDraw()) {
        endGame('draw');
      }
      else {
        currentPlayer === playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
        document.querySelector('.current-turn-message').innerHTML = `It's the ${currentPlayer.playAs}'s turn.`;
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
    setGameFormData,
    startNewGame,
    playTurn
  };
})();

export { Game };
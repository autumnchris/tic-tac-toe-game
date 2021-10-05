import { GameSettings } from './game-settings';
import { NewGameModal } from './new-game-modal';

const Game = (() => {
  // List of possibilities for a player to win the game
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
  let playerOne;
  let playerTwo;
  let currentPlayer = null;

  // Factory function to create data for a new player for the current game
  const Player = (playerType, playAs) => {
    return {
      playerType,
      playAs
    };
  };

  // Creates the DOM elements for the game board
  function renderGameBoard(firstPlayer) {
    document.querySelector('.game-container').innerHTML = `<div class="board-container">
      <p class="current-turn-message">The ${firstPlayer.playAs} goes first!</p>
      <div class="game-board">
        ${board.map((square, index) => {
          return `<div class="square-container">
            <div class="square fab" id="${index}"></div>
          </div>`;
        }).join('')}
      </div>
      <button type="button" class="button restart-button">Restart</button>
    </div>`;
  }

  function startNewGame(gameSettingsData) {
    board = new Array(9).fill().map((square, index) => index);

    if (gameSettingsData.players === '1-player') {
      playerOne = Player('human', gameSettingsData.playAs);
      playerTwo = Player('ai', gameSettingsData.playAs === 'Rebellion' ? 'Empire' : 'Rebellion');
    }
    else {
      playerOne = Player('human', 'Rebellion');
      playerTwo = Player('human', 'Empire');
    }

    currentPlayer = playerOne;
    renderGameBoard(currentPlayer);
    NewGameModal.closeNewGameModal();
  }

  function playTurn(square) {

    if (typeof board[square] === 'number') {
      board[square] = currentPlayer.playAs.toLowerCase();
      document.getElementById(square).classList.add(`fa-${currentPlayer.playAs === 'Rebellion' ? 'rebel' : 'empire'}`, `${currentPlayer.playAs.toLowerCase()}-icon`, 'selected');

      if (checkForWinner(currentPlayer)) {
        highlightWinningSquares(currentPlayer);
        endGame(currentPlayer.playAs);
      }
      else if (checkForDraw()) {
        endGame('draw');
      }
      else {
        currentPlayer === playerOne ? currentPlayer = playerTwo : currentPlayer = playerOne;
        document.querySelector('.current-turn-message').innerHTML = `It's the ${currentPlayer.playAs}'s turn.`;
        if (currentPlayer.playerType === 'ai') setTimeout(changeToAiTurn, 1200);
      }
    }
  }

  // Click handler that allows the current player to select a square if it is the user's turn
  function selectSquare(event) {

    if (currentPlayer.playerType === 'human') {
      playTurn(event.target.id);
    }
  }

  function changeToAiTurn() {

    if (GameSettings.returnGameSettingsData().difficulty === 'hard') {
      playSmartAiTurn();
    }
    else {
      playRandomAiTurn();
    }
  }

  function playRandomAiTurn() {
    let availableSquares = checkAvailableSquares();
    playTurn(availableSquares[Math.floor(Math.random() * availableSquares.length)]);
  }

  function playSmartAiTurn() {
    playTurn(handleMinimax(board, playerTwo.playAs).index);
  }

  function handleMinimax(boardCopy, player) {
    const availableSquares = checkAvailableSquares(boardCopy);
    let bestTestMove = null;
    let bestScore;

    // Human player (minimizing player)
    if (checkForWinner(playerOne)) {
      return { score: -1 };
    }
    // AI player (maximizing player)
    else if (checkForWinner(playerTwo)) {
      return { score: 1 };
    }
    else if (checkForDraw()) {
      return { score: 0 };
    }
    else {
      const testMoves = availableSquares.reduce((acc, square) => {
        let testMove = {};
        let result;
        testMove.index = boardCopy[square];
        boardCopy[square] = player.toLowerCase();

        if (player === playerTwo.playAs) {
          result = handleMinimax(boardCopy, playerOne.playAs);
          testMove.score = result.score;
        }
        else {
          result = handleMinimax(boardCopy, playerTwo.playAs);
          testMove.score = result.score;
        }
        boardCopy[square] = testMove.index;
        acc.push(testMove);
        return acc;
      }, []);

      if (player === playerTwo.playAs) {
        bestScore = -Infinity;

        for(let i = 0; i < testMoves.length; i++) {

          if (testMoves[i].score > bestScore) {
            bestScore = testMoves[i].score;
            bestTestMove = i;
          }
        }
      }
      else {
        bestScore = Infinity;

        for(let i = 0; i < testMoves.length; i++) {

          if (testMoves[i].score < bestScore) {
            bestScore = testMoves[i].score;
            bestTestMove = i;
          }
        }
      }
      return testMoves[bestTestMove];
    }
  }

  // Checks to see which squares on the board haven't been played yet in the current game
  function checkAvailableSquares() {
    return board.filter(square => typeof square === 'number');
  }

  function highlightWinningSquares(player) {
    const winningSquares = checkForWinner(player);
    return winningSquares.map(square => {
      document.getElementById(square).classList.add('winning-square');
    });
  }

  // Checks the board to see if the current player has matched one of the possible winning combinations
  function checkForWinner(player) {
    return winningCombinations.find(combination => {
      return combination.every(val => {
        return board[val] === player.playAs.toLowerCase();
      });
    });
  }

  // Checks the board to see if every square has been filled without a winner
  function checkForDraw() {
    return board.every(square => {
      return square === 'rebellion' || square === 'empire';
    });
  }

  // Ends the current game if a player has won or if there is a draw
  function endGame(winner) {
    let endGameMessage;
    winner === 'draw' ? endGameMessage = 'It\'s a draw!' : endGameMessage = `The ${winner} won!`;
    NewGameModal.openNewGameModal(endGameMessage, winner);
    document.querySelectorAll('.square').forEach(square => {
      square.classList.add('game-ended');
    });
  }

  return {
    startNewGame,
    selectSquare
  };
})();

export { Game };
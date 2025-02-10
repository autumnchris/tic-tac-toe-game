import NewGameModal from './NewGameModal';
import Player from './Player';

class Game {
  constructor() {
    this.newGameModal = new NewGameModal();
    this.winningCombinations = [
      [ 0, 1, 2 ],
      [ 3, 4, 5 ],
      [ 6, 7, 8 ],
      [ 0, 3, 6 ],
      [ 1, 4, 7 ],
      [ 2, 5, 8 ],
      [ 0, 4, 8 ],
      [ 2, 4, 6 ]
    ];
    this.gameSettings;
    this.board;
    this.playerOne;
    this.playerTwo;
    this.currentPlayer = null;
    this.aiMoveDelay;
  }

  // Resets and renders the game board for a new game
  startNewGame(gameSettings) {
    clearTimeout(this.aiMoveDelay);
    this.gameSettings = gameSettings;
    this.board = new Array(9).fill().map((square, index) => index);

    if (gameSettings.players === '1-player') {
      this.playerOne = new Player('human', gameSettings.playAs);
      this.playerTwo = new Player('ai', gameSettings.playAs === 'Rebellion' ? 'Empire' : 'Rebellion');
    }
    else {
      this.playerOne = new Player('human', 'Rebellion');
      this.playerTwo = new Player('human', 'Empire');
    }
    this.currentPlayer = this.playerOne;
    this.newGameModal.removeNewGameModal('main');
    this.removeGameBoard('.game-container');
    this.renderGameBoard(this.currentPlayer, '.game-container');
  }

  // Click handler that allows the current player to select a square if it is the user's turn
  selectSquare(event) {
    if (this.currentPlayer.playerType === 'human') {
      this.playTurn(event.target.id);
    }
  }

  // Plays the current player's selected square and then changes to the opposing player's turn if the game hasn't ended
  playTurn(square) {

    if (typeof this.board[square] === 'number') {
      this.board[square] = this.currentPlayer.playAs.toLowerCase();
      this.addAttributesToSelectedSquare(square);

      if (this.checkForWinner(this.currentPlayer)) {
        this.highlightWinningSquares(this.currentPlayer);
        this.endGame(this.currentPlayer.playAs);
      }
      else if (this.checkForDraw()) {
        this.endGame('draw');
      }
      else {
        this.currentPlayer === this.playerOne ? this.currentPlayer = this.playerTwo : this.currentPlayer = this.playerOne;
        this.updateCurrentTurnMessage();
        if (this.currentPlayer.playerType === 'ai') this.aiMoveDelay = setTimeout(this.changeToAiTurn.bind(this), 1200);
      }
    }
  }

  // Determines whether to play the Easy AI or the Hard AI
  changeToAiTurn() {
    if (this.gameSettings.difficulty === 'hard') {
      this.playSmartAiTurn();
    }
    else {
      this.playRandomAiTurn();
    }
  }

  // AI picks an unplayed square at random (Easy mode)
  playRandomAiTurn() {
    let availableSquares = this.checkAvailableSquares();
    this.playTurn(availableSquares[Math.floor(Math.random() * availableSquares.length)]);
  }

  // AI picks an unplayed square using the minimax algorithm (Hard mode)
  playSmartAiTurn() {
    this.playTurn(this.handleMinimax(this.board, this.playerTwo.playAs).index);
  }

  // Minimax algorithm which determines the best move the AI should play against the user during its turn
  handleMinimax(board, player) {
    const availableSquares = this.checkAvailableSquares(board);
    let bestTestMove = null;
    let bestScore;

    // Human player (minimizing player)
    if (this.checkForWinner(this.playerOne)) {
      return { score: -1 };
    }
    // AI player (maximizing player)
    else if (this.checkForWinner(this.playerTwo)) {
      return { score: 1 };
    }
    else if (this.checkForDraw()) {
      return { score: 0 };
    }
    else {
      // Recursively tests potential move outcomes for the current player
      const testMoves = availableSquares.reduce((acc, square) => {
        let testMove = {};
        let result;
        testMove.index = board[square];
        board[square] = player.toLowerCase();

        if (player === this.playerTwo.playAs) {
          result = this.handleMinimax(board, this.playerOne.playAs);
          testMove.score = result.score;
        }
        else {
          result = this.handleMinimax(board, this.playerTwo.playAs);
          testMove.score = result.score;
        }
        board[square] = testMove.index;
        acc.push(testMove);
        return acc;
      }, []);

      // Uses array of test scores to determine the best move for the AI to play
      if (player === this.playerTwo.playAs) {
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

  // Checks the board to see if the current player has matched one of the possible winning combinations
  checkForWinner(player) {
    return this.winningCombinations.find(combination => {
      return combination.every(val => {
        return this.board[val] === player.playAs.toLowerCase();
      });
    });
  }

  // Checks the board to see if every square has been filled without a winner
  checkForDraw() {
    return this.board.every(square => {
      return typeof square !== 'number';
    });
  }

  // Checks to see which squares on the board haven't been played yet in the current game
  checkAvailableSquares() {
    return this.board.filter(square => typeof square === 'number');
  }

  // Ends the current game if a player has won or if there is a draw
  endGame(winner) {
    let endGameMessage;
    winner === 'draw' ? endGameMessage = 'It\'s a draw!' : endGameMessage = `The ${winner} won!`;
    this.newGameModal.renderNewGameModal(endGameMessage, winner, 'main');
    document.querySelectorAll('.square').forEach(square => {
      square.classList.add('game-ended');
    });
  }

  // Event listeners
  events() {
    document.addEventListener('click', event => {
      const element = event.target;
      element.matches('.game-board .square-container .square') ? this.selectSquare(event) : null;
      element.matches('#modal .restart-button') ? this.startNewGame(this.gameSettings) : null;
    });
  }

  // DOM methods
  updateCurrentTurnMessage() {
    const currentTurnMessage = document.querySelector('.current-turn-message');
    currentTurnMessage.innerHTML = `It's the ${this.currentPlayer.playAs}'s turn.`;;
  }

  addAttributesToSelectedSquare(square) {
    document.getElementById(square).classList.add(`fa-${this.currentPlayer.playAs === 'Rebellion' ? 'rebel' : 'empire'}`, `${this.currentPlayer.playAs.toLowerCase()}-icon`, 'selected');
    document.getElementById(square).setAttribute('aria-label', this.currentPlayer.playAs === 'Rebellion' ? 'rebel' : 'empire');
  }

  highlightWinningSquares(player) {
    const winningSquares = this.checkForWinner(player);
    return winningSquares.map(square => {
      document.getElementById(square).classList.add('winning-square');
    });
  }

  renderGameBoard(firstPlayer, location) {
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('board-container');
    gameBoard.innerHTML = `
      <p class="current-turn-message">The ${firstPlayer.playAs} goes first!</p>
      <div class="game-board">${this.board.map((square, index) => {
        return `<div class="square-container">
          <button class="square fab" id="${index}"></button>
        </div>`;
      }).join('')}</div>
      <button type="button" class="button restart-button">Restart</button>
    `;
    document.querySelector(location).appendChild(gameBoard);
    this.events();
  }

  removeGameBoard(location) {
    const gameBoard = document.querySelector(`${location} .board-container`);
    gameBoard ? document.querySelector(location).removeChild(gameBoard) : null;
  }
}

export default Game;
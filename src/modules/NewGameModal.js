class NewGameModal {
  // DOM methods
  renderWinningPlayerIcon(winner, location) {
    const winningPlayerIcon = document.createElement('div');
    winningPlayerIcon.classList.add('winning-player-icon');

    if (winner === 'draw') {
      winningPlayerIcon.innerHTML = `
        <span class="fab fa-rebel rebellion-icon" aria-hidden="true"></span>
        <span class="fab fa-empire empire-icon" aria-hidden="true"></span>
      `;
    }
    else {
      winningPlayerIcon.innerHTML = `<span class="fab fa-${winner === 'Rebellion' ? 'rebel' : 'empire'} ${winner.toLowerCase()}-icon" aria-hidden="true"></span>`;
    }

    if (typeof location === 'string') {
      document.querySelector(location).appendChild(winningPlayerIcon);
    }
    else if (Array.isArray(location)) {
      document.querySelector(location[0]).insertBefore(winningPlayerIcon, document.querySelector(location[1]));
    }
  }
  
  renderNewGameModal(endGameMessage, winner, location) {
    const newGameModal = document.createElement('div');
    newGameModal.setAttribute('id', 'modal');
    newGameModal.classList.add('modal');
    newGameModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-body">
          <p class="end-game-message">${endGameMessage}</p>
          <div class="button-group">
            <button type="button" class="button restart-button">Play Again</button>
            <button type="button" class="button game-settings-button">Settings</button>
          </div>
        </div>
      </div>
    `;
    document.querySelector(location).appendChild(newGameModal);
    document.querySelector('body').classList.add('modal-open');
    this.renderWinningPlayerIcon(winner, ['#modal .modal-body', '.end-game-message']);
  }

  removeNewGameModal(location) {
    const newGameModal = document.querySelector(`${location} #modal`);
    newGameModal ? document.querySelector(location).removeChild(newGameModal) : null;
    document.querySelector('body').classList.remove('modal-open');
  }
}

export default NewGameModal;
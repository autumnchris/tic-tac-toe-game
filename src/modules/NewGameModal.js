const NewGameModal = (() => {

  // Creates the DOM elements for a modal that tells the user who won and to allow them to start a new game
  function openNewGameModal(endGameMessage, winner) {
    const newGameModal = document.createElement('div');
    newGameModal.classList.add('modal');
    newGameModal.setAttribute('id', 'modal');
    newGameModal.innerHTML = `<div class="modal-content">
      <div class="modal-body">
        <div class="winning-player-icon"></div>
        <p>${endGameMessage}</p>
        <div class="button-group">
          <button type="button" class="button restart-button">Play Again</button>
          <button type="button" class="button game-settings-button">Settings</button>
        </div>
      </div>
    </div>`;
    document.querySelector('main').appendChild(newGameModal);
    renderWinningPlayerIcon(winner);
  }

  // Removes the DOM elements for the modal while it's currently displayed
  function closeNewGameModal() {
    const newGameModal = document.getElementById('modal');
    newGameModal ? document.querySelector('main').removeChild(newGameModal) : null;
  }

  // Creates the DOM elements for the icon of the winning player to be displayed within the modal
  function renderWinningPlayerIcon(winner) {
    let winningPlayerIcon;

    if (winner === 'draw') {
      winningPlayerIcon = `
      <span class="fab fa-rebel rebellion-icon"></span>
      <span class="fab fa-empire empire-icon"></span>`;
    }
    else {
      winningPlayerIcon = `<span class="fab fa-${winner === 'Rebellion' ? 'rebel' : 'empire'} ${winner.toLowerCase()}-icon"></span>`;
    }
    document.querySelector('.winning-player-icon').innerHTML = winningPlayerIcon;
  }

  return {
    openNewGameModal,
    closeNewGameModal
  };
})();

export { NewGameModal };
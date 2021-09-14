const NewGameModal = (() => {

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
          <button type="button" class="button">Settings</button>
        </div>
      </div>
    </div>`;
    document.querySelector('main').appendChild(newGameModal);
    renderWinningPlayerIcon(winner);
  }

  function closeNewGameModal() {
    const newGameModal = document.getElementById('modal');
    newGameModal ? document.querySelector('main').removeChild(newGameModal) : null;
  }

  function renderWinningPlayerIcon(winner) {
    let winningPlayerIcon;

    if (winner === 'draw') {
      winningPlayerIcon = `
      <span class="fab fa-rebel fa-3x rebellion"></span>
      <span class="fab fa-empire fa-3x empire"></span>`;
    }
    else {
      winningPlayerIcon = `<span class="fab fa-${winner === 'Rebellion' ? 'rebel' : 'empire'} fa-3x ${winner.toLowerCase()}"></span>`;
    }
    document.querySelector('.winning-player-icon').innerHTML = winningPlayerIcon;
  }

  return {
    openNewGameModal,
    closeNewGameModal
  };
})();

export { NewGameModal };
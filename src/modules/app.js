import starWarsLogo from '../images/star-wars-logo.png';
import { Game } from './game';

const App = (() => {

  function renderApp() {
    document.getElementById('app').innerHTML = `
    <header>
      <h1>
        <img src="${starWarsLogo}" class="star-wars-logo" alt="Star Wars" />
      </h1>
      <h2>Tic-Tac-Toe</h2>
    </header>
    <main>
      <div class="game-container"></div>
    </main>
    <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; ${new Date().getFullYear()}</footer>`;

    Game.startNewGame('2-player');

    document.addEventListener('click', event => {
      const element = event.target;
      element.matches('.square') ? Game.playTurn(event) : null;
      element.matches('.restart-button') ? Game.startNewGame('2-player') : null;
    });
  }

  return {
    renderApp
  };
})();

export { App };

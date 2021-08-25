import starWarsLogo from '../images/star-wars-logo.png';

const App = (() => {

  function renderApp() {
    document.getElementById('app').innerHTML = `
    <header>
      <h1>
        <img src="${starWarsLogo}" class="star-wars-logo" alt="Star Wars" />
      </h1>
      <h2>Tic-Tac-Toe</h2>
    </header>
    <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; ${new Date().getFullYear()}</footer>`;
  }

  return {
    renderApp
  };
})();

export { App };

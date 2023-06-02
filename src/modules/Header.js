import starWarsLogo from '../assets/images/star-wars-logo.png';

class Header {
  // DOM methods
  renderHeader(location) {
    const header = document.createElement('header');
    header.innerHTML = `
      <h1>
        <img src="${starWarsLogo}" class="star-wars-logo" alt="Star Wars" />
      </h1>
      <h2>Tic-Tac-Toe</h2>
    `;
    document.querySelector(location).appendChild(header);
  }
}

export default Header;
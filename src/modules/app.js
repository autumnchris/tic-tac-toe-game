const App = (() => {

  function renderApp() {
    document.getElementById('app').innerHTML = '';
  }

  return {
    renderApp
  };
})();

export { App };

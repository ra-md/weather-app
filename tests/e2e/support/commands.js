Cypress.Commands.add('setItemToLocalStorage', (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
});

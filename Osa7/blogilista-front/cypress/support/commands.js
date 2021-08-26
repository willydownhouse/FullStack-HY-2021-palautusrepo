Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/users/login', {
    username,
    password,
  }).then(res => {
    localStorage.setItem('user', JSON.stringify(res.body));
    cy.visit('http://localhost:3000');
  });
});

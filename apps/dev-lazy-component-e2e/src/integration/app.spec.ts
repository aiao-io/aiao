describe('Lazy Component Loader', () => {
  it('open dialog without lazyComponentLoader', () => {
    cy.visit('/');
    cy.get('button').contains('Open Dialog ( without LazyComponentLoader )').click();
    cy.get('app-dialog').should('have.length', 0);
  });

  it('open dialog with lazyComponentLoader', () => {
    cy.visit('/');
    cy.get('button').contains('Open Dialog( with LazyComponentLoader )').click();
    cy.get('app-dialog h2').contains('I am a dialog component in the home module');
  });
});

describe('Home Page Open Dialog', () => [
  it('open dialog', () => {
    cy.visit('/home');
    cy.get('button').contains('show dialog').click();
    cy.get('app-dialog h2').contains('I am a dialog component in the home module');
  })
]);

describe('Lazy Component Loader', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('open dialog without lazyComponentLoader', () => {
    cy.visit('/');
    cy.get('button')
      .eq(0)
      .click();
    cy.get('app-dialog h2').contains('I am a dialog component in the home module');
  });

  it('open dialog with lazyComponentLoader', () => {
    cy.visit('/');
    cy.get('button')
      .eq(1)
      .click();
    cy.get('app-dialog h2').contains('I am a dialog component in the home module');
  });
});

describe('Home Page Open Dialog', () => [
  it('open dialog', () => {
    cy.visit('/home');
    cy.get('button')
      .eq(0)
      .click();
    cy.get('app-dialog h2').contains('I am a dialog component in the home module');
  })
]);

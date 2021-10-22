describe('dev-elements-vue', () => {
  it('code-editor', () => {
    cy.visit('/code-editor');
    cy.get('ion-title').contains('Elements Vue');
  });
});

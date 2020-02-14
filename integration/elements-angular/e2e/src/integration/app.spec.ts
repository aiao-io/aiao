describe('app', () => {
  it('code-editor', () => {
    cy.visit('/code-editor');
    cy.get('app-elements-code-editor')
      .get('.monaco-editor')
      .should('exist');
  });
});

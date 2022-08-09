describe('dev-elements-angular', () => {
  it('code-editor', () => {
    cy.visit('/code-editor');
    cy.get('app-elements-code-editor').get('.monaco-editor').should('exist');
  });
});

describe('dev-elements-react', () => {
  it('code-editor', () => {
    cy.visit('/code-editor');
    cy.get('aiao-code-editor').get('.monaco-editor').should('exist');
  });
});

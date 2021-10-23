describe('dev-nest-angular-universal', () => {
  it('/home', () => {
    cy.visit('/home');
    cy.get('p').contains('home works');
  });
  it('hello 页面的 api 应该被调用成果', () => {
    cy.visit('/hello');
    cy.get('p').contains('hello works');
    cy.get('h1').contains('hello 0');
    cy.reload();
    cy.get('h1').contains('hello 1');
  });
});

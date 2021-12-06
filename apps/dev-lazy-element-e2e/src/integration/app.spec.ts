describe('Lazy Element Page Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('load use component', () => {
    cy.get('button').eq(0).click();
    cy.get('h1').contains('load 1');
    cy.get('app-custom-element p').contains('custom-element works! hello component');
  });

  it('load use directive', () => {
    cy.get('button').eq(1).click();
    cy.get('h1').contains('load 2');
    cy.get('app-custom-element p').contains('custom-element works! hello directive');
  });

  it('load use LazyElementLoader', () => {
    cy.get('button').eq(2).click();
    cy.get('h1').contains('load 3');
    cy.get('app-custom-element p').contains('custom-element works! hello LazyElementLoader');
  });
});

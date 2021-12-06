describe('Lazy Component Loader', () => {
  it('1', () => {
    cy.visit('/');
    cy.get('button').contains('直接打开 home 模块的弹框').click();
    cy.get('app-home-dialog h2').contains('I am a dialog component in the home module');
  });

  it('2', () => {
    cy.visit('/');
    cy.get('button').contains('用 LazyComponentLoader 打开 HomeModule 模块的弹框').click();
    cy.get('app-home-dialog h2').contains('I am a dialog component in the home module');
  });

  it('3', () => {
    cy.visit('/');
    cy.get('button').contains('用 LazyComponentLoader 打开 AloneDialogModule 模块的弹框').click();
    cy.get('app-alone-dialog h2').contains('I am a alone dialog component in self module');
  });
});

describe('Home Page Open Dialog', () => {
  it('4', () => {
    cy.visit('/home');
    cy.get('button').contains('show dialog').click();
    cy.get('app-home-dialog h2').contains('I am a dialog component in the home module');
  });

  it('5', () => {
    cy.visit('/home');
    cy.get('button').contains('show alone dialog').click();
    cy.get('app-alone-dialog h2').contains('I am a alone dialog component in self module');
  });
});

import { getGreeting } from '../support/app.po';

describe('aiao.io', () => {
  beforeEach(() => cy.visit('/'));

  it('should display helloworld', () => {
    getGreeting().contains('helloworld');
  });
});

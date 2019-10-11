import { getGreeting } from '../support/app.po';

describe('aiao-site', () => {
  beforeEach(() => cy.visit('/'));

  it('should display helloworld', () => {
    getGreeting().contains('helloworld');
  });
});

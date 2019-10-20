import { getGreeting } from '../support/app.po';

describe('angular-lazy-demo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('angular-lazy-demo');
  });
});

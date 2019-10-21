import { getGreeting } from '../support/app.po';

describe('sample-lazy-module', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('sample-lazy-module');
  });
});

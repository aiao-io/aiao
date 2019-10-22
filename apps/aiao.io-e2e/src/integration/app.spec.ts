import { getGreeting } from '../support/app.po';

describe('aiao.io', () => {
  beforeEach(() => cy.visit('/'));

  it('should display aiao', () => {
    getGreeting().contains('aiao');
  });
});

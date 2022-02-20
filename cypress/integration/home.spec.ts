/// <reference types="cypress" />

describe('home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the main navbar', () => {
    cy.get('mat-toolbar').find('h2').should('have.length', 2);
    cy.get('mat-toolbar').find('h2').first().should('contain', 'Home');
    cy.get('mat-toolbar').find('h2').last().should('contain', 'Blog');
    cy.get('app-home img').invoke('attr', 'src').should('contain', 'jpg');
  });

  it('should display the blog', () => {
    cy.fixture('articles.json').as('articlesJSON');
    cy.intercept('GET', 'http://localhost:3000/api/articles', {
      fixture: 'articles.json',
    }).as('articles');
    cy.get('mat-toolbar').find('h2').last().click();
    cy.get('article').should('have.length', 3);
    cy.get('mat-toolbar').find('h2').first().should('not.have.class', 'active');
    cy.get('mat-toolbar').find('h2').last().should('have.class', 'active');
  });

  it('should go home on logo click', () => {
    cy.get('.logo').click();
    cy.get('app-home img').should('have.length', 1);
    cy.get('mat-toolbar').find('h2').first().should('have.class', 'active');
    cy.get('mat-toolbar').find('h2').last().should('not.have.class', 'active');
  });
});

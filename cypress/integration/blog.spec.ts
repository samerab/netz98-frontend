/// <reference types="cypress" />

describe('blog page', () => {
  beforeEach(() => {
    cy.fixture('articles.json').as('articlesJSON');
    cy.intercept('GET', 'http://localhost:3000/api/articles', {
      fixture: 'articles.json',
    }).as('articles');
    cy.visit('/blog');
    cy.wait('@articles');
  });

  it('should display a list of articles', () => {
    cy.get('article').should('have.length', 3);
  });

  it('should display 4 secondary menu items', () => {
    cy.get('.menu button').should('have.length', 4);
  });

  it('should display a list of articles with top image view', () => {
    cy.get('.menu button').first().click();
    cy.get('.cdk-overlay-pane button').should('have.length', 2);
    cy.get('article').last().should('not.have.class', 'top-img');
    cy.get('.cdk-overlay-pane button').first().click();
    cy.get('article').first().should('have.class', 'top-img');
  });

  it('should display a list of articles with side image view', () => {
    cy.get('.menu button').first().click();
    cy.get('.cdk-overlay-pane button').last().click();
    cy.get('article').first().should('have.class', 'side-img');
    cy.get('article').first().should('not.have.class', 'top-img');
  });

  it('should display a list of articles by author set the result box', () => {
    cy.get('.menu button').eq(1).click();
    cy.get('.cdk-overlay-pane button').should('have.length', 3);
    cy.get('.cdk-overlay-pane button').first().click();
    cy.get('article').should('have.length', 1);
    cy.get('article#post-1177').should('have.length', 1);
    cy.get('article')
      .first()
      .find('.summary p')
      .should('contain', 'Introduction In some projects');
    cy.get('.result-title').should('contain', 'Alexander Dite');
    cy.get('.total').should('contain', '1');
  });

  it('should display a list of articles by tag and set the result box', () => {
    cy.get('.menu button').eq(2).click();
    cy.get('.cdk-overlay-pane button').should('have.length', 16);
    cy.get('.cdk-overlay-pane button').first().click();
    cy.get('article').should('have.length', 2);
    cy.get('article')
      .first()
      .find('h1')
      .should('contain', 'AJAX loading of related products in Magento 2');
    cy.get('.result-title').should('contain', 'ajax');
    cy.get('.total').should('contain', '2');
  });

  it('should display a list of articles by category and set the result box', () => {
    cy.get('.menu button').eq(3).click();
    cy.get('.cdk-overlay-pane button').should('have.length', 2);
    cy.get('.cdk-overlay-pane button').last().click();
    cy.get('article').should('have.length', 2);
    cy.get('article')
      .last()
      .find('h1')
      .should('contain', 'Think outside the box: Magento 2 as API framework');
    cy.get('.result-title').should('contain', 'magento-2');
    cy.get('.total').should('contain', '2');
  });

  it('should display a list of corresponding articles on typing in search box', () => {
    cy.get('search-box').should('not.contain', 'close');
    cy.get('search-box input').type('thin');
    cy.get('article').should('have.length', 1);
    cy.get('article').first().find('h1').contains('thin', { matchCase: false });
    cy.get('.result-title').should('contain', 'thin');
    cy.get('.total').should('contain', '1');
    cy.get('search-box').contains('close');
  });

  it('should clear search key and redisplay all articles', () => {
    cy.get('search-box input').type('thin');
    cy.get('search-box input').should('have.value', 'thin');
    cy.get('article').should('have.length', 1);
    cy.get('.mat-form-field-suffix button').click();
    cy.get('search-box input').should('have.value', '');
    cy.get('article').should('have.length', 3);
  });

  it('should display the articles of clicked author', () => {
    cy.get('.author').first().click();
    cy.get('article').should('have.length', 1);
    cy.get('.author').first().contains('Alexander Dite');
  });
});

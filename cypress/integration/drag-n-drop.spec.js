describe('drag-n-drop works correctly', () => {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.viewport(1440, 1000);
  });

  it('should load constructor page by default', () => {
    cy.contains('Соберите Бургер');
  });

  it('should drag-n-drop bun ingredient', () => {
    cy.get('[class^=burger-ingredients-item_container__]').first().as('bun-element');
    cy.get('[class^=burger-constructor_container__]').as('drop-container');
    cy.get('@bun-element').trigger('dragstart');
    cy.get('@drop-container').trigger('dragenter').trigger('drop');
    cy.get('@drop-container').find('[class^=burger-constructor-item]').should('have.length', 2);
  });

  it('should drag-n-drop other ingredient', () => {
    cy.get('[class^=burger-ingredients-item_container__]').last().as('ingredient-element');
    cy.get('[class^=burger-constructor_container__]').as('drop-container');
    cy.get('@ingredient-element').trigger('dragstart');
    cy.get('@drop-container').trigger('dragenter').trigger('drop');
    cy.get('@drop-container')
      .find('[class^=burger-constructor_items]')
      .find('[class^=burger-constructor-item]')
      .should('have.length', 1);
  });
})
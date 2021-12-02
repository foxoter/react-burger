describe('drag-n-drop works correctly', () => {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.viewport(1440, 1000);
  });

  it('should load constructor page by default', () => {
    cy.get('h2').contains('Соберите Бургер');
  });

  it('should handle drag-n-drop ingredient type === bun', () => {
    cy.get('[class^=burger-ingredients-item_container__]').first().as('bun-element');
    cy.get('[class^=burger-constructor_container__]').as('drop-container');
    cy.get('@drop-container').find('[class^=burger-constructor-item]').should('not.exist', );
    cy.get('@bun-element').trigger('dragstart');
    cy.get('@drop-container').trigger('dragenter').trigger('drop');
    cy.get('@drop-container').find('[class^=burger-constructor-item]').should('have.length', 2);
  });

  it('should handle drag-n-drop ingredient type !== bun', () => {
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
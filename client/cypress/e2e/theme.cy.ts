const port = 5000;

describe('dark mode', () => {
  
  it('toggles dark mode', () => {
    cy.visit(`http://localhost:${port}/`)
    cy.get('#root > div').should('have.css','background-color', 'rgb(0, 0, 0)'); //should be black
    cy.get('#theme-btn .swap').click();
    cy.get('#root > div').should('have.css','background-color', 'rgb(255, 255, 255)');//should be white
    cy.wait(300);
    cy.get('#theme-btn .swap').click();
      cy.get('#root > div').should('have.css','background-color', 'rgb(0, 0, 0)');//should be black again
   
  })
})
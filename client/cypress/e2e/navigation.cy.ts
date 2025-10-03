const port = 5000;
const btns = [ { id: '#projects-btn', section: '#projects' }, { id: '#contact-btn', section: '#footer' },{ id: '#about-btn', section: '#about' }, { id: '#home-btn', section: '#hero' }];
//['#home-btn', '#projects-btn', '#about-btn', '#contact-btn'];
describe('navigation', () => {
  it('passes', () => {
    cy.visit(`http://localhost:${port}/`)
    btns.forEach((btn) => {
      cy.get(btn.id).click();
      cy.wait(500);
      cy.get(btn.section).should('be.visible');
    }
    )
  })
});



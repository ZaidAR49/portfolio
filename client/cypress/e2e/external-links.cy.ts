const port = 5000;

describe('external links (CV and social)', () => {
  it('CV links exist and have valid hrefs', () => {
    cy.visit(`http://localhost:${port}/about`);

    // About page CV button
    cy.contains('a', /download My resume/i)
      .should('have.attr', 'href')
      .and('match', /^(https?:)?\/\//);

    // Footer CV link
    cy.get('#footer')
      .contains('a', /resume/i)
      .should('have.attr', 'href')
      .and('match', /^(https?:)?\/\//);
  });

  it('social links exist and point outwards', () => {
    cy.visit(`http://localhost:${port}/`);

    // Social buttons are anchors inside carousel within footer
    cy.get('#footer .carousel a')
      .should('have.length.at.least', 1)
      .each(($a) => {
        const href = $a.attr('href');
        expect(href, 'href present').to.be.a('string').and.not.be.empty;
        expect(href!, 'external url').to.match(/^(https?:)?\/\//);
      });
  });
});




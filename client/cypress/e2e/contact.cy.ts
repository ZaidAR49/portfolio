const port = 5000;

describe('contact form', () => {
  it('submits successfully and shows toast', () => {
    cy.visit(`http://localhost:${port}/`);

    // Ensure footer is visible
    cy.get('#footer')[0] ? cy.get('#footer').scrollIntoView() : null;

    // Intercept the API call
    cy.intercept('POST', /\/api\/contact$/, {
      statusCode: 200,
      body: { message: 'ok' }
    }).as('postContact');

    // Fill and submit
    cy.get('#name').type('John Tester');
    cy.get('#email').type('john.tester@example.com');
    cy.get('#subject').type('Hello');
    cy.get('#message').type('This is a test message.');
    cy.contains('button', /^Send$/).click();

    // Wait for request
    cy.wait('@postContact');

    // Assert toast success appears
    cy.contains(/Message sent successfully!/i, { timeout: 5000 }).should('be.visible');
  });
});



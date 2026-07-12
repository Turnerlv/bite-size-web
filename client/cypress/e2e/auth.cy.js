describe('The full authentication journey', () => {

  it('allows a new user to create an account, log in, and view the protected profile dashboard', () => {
    // 1. Visit the landing page configuration via our baseUrl
    cy.exec('cd ../server && npm run db:seed');
    cy.visit('/create-account');

    // 2. Select form elements and simulate typing (Cypress handles timing natively)
    cy.get('form[aria-label="create account form"]').within(() => {
      cy.get('input[id="name"]').type('Robert');
      cy.get('input[id="email"]').type('robert@example.com');
      cy.get('input[id="password"]').type('Secret1234');
      cy.get('button[type="submit"]').click();
    });

    // 3. Assert the network layer processed the authentication contract and redirected
    cy.url().should('include', '/admin/profile');

    // 4. Assert the UI updated its physical text based on data returned from Postgres
    cy.get('h1').should('contain', 'Welcome, Robert');

    // 5. Simulate logging out by clicking the logout button in the account menu
    cy.get('button[aria-label="account menu toggle"]').click();
    cy.get('div[id="account-menu"]').within(() => {
      cy.get('button[role="menuitem"]').contains('Logout').click();
    });

    // 6. Assert that the user is redirected to the login page after logging out
    cy.url().should('include', '/login');
  });

  it('allows an existing user to log in, and view the protected profile dashboard', () => {
    // 1. Visit the landing page configuration via our baseUrl
    cy.visit('/login');

    // 2. Select form elements and simulate typing (Cypress handles timing natively)
    cy.get('form[aria-label="login form"]').within(() => {
      cy.get('input[id="email"]').type('robert@example.com');
      cy.get('input[id="password"]').type('Secret1234');
      cy.get('button[type="submit"]').click();
    });

    // 3. Assert the network layer processed the authentication contract and redirected
    cy.url().should('include', '/admin/profile');

    // 4. Assert the UI updated its physical text based on data returned from Postgres
    cy.get('h1').should('contain', 'Welcome, Robert');
  });

  it('enforces our security boundary by bouncing unauthenticated users to the gateway', () => {
    // Attempt to bypass the UI flow and jump straight to the administrative core data layer
    cy.visit('/admin/profile', { failOnStatusCode: false });

    // Assert that our Next.js middleware or route protection intercepted the loop
    cy.url().should('include', '/login');
  });

  it('allows a user to change their password and re-authenticate with the new credentials', () => {
    // 1. Seed the database to a known state and log in as the pre-seeded user
    cy.exec('cd ../server && npm run db:seed');
    cy.visit('/login');
    cy.get('form[aria-label="login form"]').within(() => {
      cy.get('input[id="email"]').type('bob@example.com');
      cy.get('input[id="password"]').type('Secret1234');
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('include', '/admin/profile');

    // 2. Submit a new password via the Security form on the profile dashboard
    cy.get('input[id="current-password"]').type('Secret1234');
    cy.get('input[id="new-password"]').type('NewSecret5678');
    cy.contains('button', 'Reset password').click();

    // 3. Assert the success notification confirms the password was updated in the database
    cy.contains('Password updated').should('be.visible');

    // 4. Log out to invalidate the current session
    cy.get('button[aria-label="account menu toggle"]').click();
    cy.get('div[id="account-menu"]').within(() => {
      cy.get('button[role="menuitem"]').contains('Logout').click();
    });
    cy.url().should('include', '/login');

    // 5. Authenticate with the new password and confirm the protected session is granted
    cy.get('form[aria-label="login form"]').within(() => {
      cy.get('input[id="email"]').type('bob@example.com');
      cy.get('input[id="password"]').type('NewSecret5678');
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('include', '/admin/profile');
    cy.get('h1').should('contain', 'Welcome, Bob');
  });
});
describe('User Management Journey', () => {

  const loginAsBob = () => {
    cy.visit('/login');
    cy.get('form[aria-label="login form"]').within(() => {
      cy.get('input[id="email"]').type('bob@example.com');
      cy.get('input[id="password"]').type('Secret1234');
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('include', '/admin/profile');
  };

  const loginAsTurner = () => {
    cy.visit('/login');
    cy.get('form[aria-label="login form"]').within(() => {
      cy.get('input[id="email"]').type('turner.vickery@gmail.com');
      cy.get('input[id="password"]').type('Secret1234');
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('include', '/admin/profile');
  };

  beforeEach(() => {
    cy.exec('cd ../server && npm run db:seed');
  });

  it('allows a user to update their profile name and see the change persist on next login', () => {
    // 1. Authenticate as Bob and confirm the current display name in the heading
    loginAsBob();
    cy.get('h1').should('contain', 'Welcome, Bob');

    // 2. Clear the name field and type the updated value in the Personal Information form
    cy.get('input[id="name"]').clear().type('Robert');
    cy.contains('button', 'Save changes').click();

    // 3. Assert the success notification confirms the profile was persisted to the database
    cy.contains('Profile updated successfully').should('be.visible');

    // 4. Log out so a fresh session will load the updated name from the auth response
    cy.get('button[aria-label="account menu toggle"]').click();
    cy.get('div[id="account-menu"]').within(() => {
      cy.get('button[role="menuitem"]').contains('Logout').click();
    });
    cy.url().should('include', '/login');

    // 5. Re-authenticate and confirm the updated name is returned by the server
    cy.get('form[aria-label="login form"]').within(() => {
      cy.get('input[id="email"]').type('bob@example.com');
      cy.get('input[id="password"]').type('Secret1234');
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('include', '/admin/profile');
    cy.get('h1').should('contain', 'Welcome, Robert');
  });

  it('allows an admin to delete a user and verify their content is cascade-deleted from the database', () => {
    // 1. Authenticate as the admin user and navigate to the Users management page
    loginAsTurner();
    cy.get('h1').should('contain', 'Welcome, Turner');
    cy.visit('/admin/users');
    cy.url().should('include', '/admin/users');

    // 2. Assert Bob Jones is present in the users table before deletion
    cy.get('tbody').should('contain.text', 'Bob Jones');

    // 3. Open the row actions dropdown for Bob and trigger the delete action
    cy.contains('tr', 'Bob Jones').within(() => {
      cy.get('button[aria-label="Row actions"]').click();
    });
    cy.get('[role="menu"]').should('be.visible');
    cy.wait(200);
    cy.contains('[role="menuitem"]', 'Delete').click();

    // 4. Assert Bob is removed from the users table
    cy.get('tbody').should('not.contain.text', 'Bob Jones');

    // 5. Navigate to the briefs table and verify Bob's content was cascade-deleted by Postgres
    cy.visit('/admin/briefs');
    cy.get('tbody').should('not.contain.text', 'Learning postgres');

    // 6. Assert Turner's own content was not affected by the deletion
    cy.get('tbody').should('contain.text', 'My First Post');
  });
});

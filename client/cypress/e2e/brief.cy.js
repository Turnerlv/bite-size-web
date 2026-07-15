describe('The Full Brief Creation Journey (Isolated Specs)', () => {

  const loginAsBob = () => {
    cy.visit('/login');
    cy.get('form[aria-label="login form"]').within(() => {
      cy.get('input[id="email"]').type('bob@example.com');
      cy.get('input[id="password"]').type('Secret1234');
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('include', '/admin/profile');
  };

  beforeEach(() => {
    cy.exec('cd ../server && npm run db:seed');
  });

  it('allows a user to create a new brief', () => {
    // 1. Authenticate and navigate to the brief creation form
    loginAsBob();
    cy.contains('button', 'Add brief').click();
    cy.url().should('include', '/admin/briefs/new');

    // 2. Fill in the brief fields and confirm Editor.js has fully rendered before typing
    cy.get('form[aria-label="brief form"]').within(() => {
      cy.get('input[name="title"]').type('New Brief Title');
      cy.get('textarea[id="description"]').type('This is a description for the new brief.');
      cy.get('button[id="category"]').click();
      cy.get('div.flex-col').find('select').select('Technology', { force: true });

      cy.get('#editorjs')
        .should('be.visible')
        .find('.codex-editor', { timeout: 10000 })
        .should('exist');

      cy.get('#editorjs').within(() => {
        cy.get('div[contenteditable="true"]')
          .first()
          .click({ force: true })
          .type('This is the body content.', { delay: 30 })
          .blur();
      });

      cy.wait(300);
      cy.get('button[type="submit"]').click();
    });

    // 3. Assert the new brief title appears in the admin table after a successful save
    cy.url().should('match', /\/admin\/briefs$/);
    cy.get('tbody > tr').should('be.visible').should('contain.text', 'New Brief Title');
  });

  it('allows a user to select an existing brief and update its content', () => {
    // 1. Authenticate and create a brief to serve as the update target
    loginAsBob();
    cy.visit('/admin/briefs/new');
    cy.get('form[aria-label="brief form"]').within(() => {
      cy.get('input[name="title"]').type('Editable Brief');
      cy.get('textarea[id="description"]').type('Before update description.');
      cy.get('button[id="category"]').click();
      cy.get('div.flex-col').find('select').select('Technology', { force: true });

      cy.get('#editorjs').should('be.visible').find('.codex-editor', { timeout: 10000 }).should('exist');
      cy.get('#editorjs').within(() => {
        cy.get('div[contenteditable="true"]')
          .first()
          .click({ force: true })
          .type('Original body content.', { delay: 30 })
          .blur();
      });
      cy.wait(300);
      cy.get('button[type="submit"]').click();
    });

    // 2. Select the newly-created brief from the table to open the edit form
    cy.url().should('match', /\/admin\/briefs$/);
    cy.get('tbody > tr:contains("Editable Brief")').click();

    // 3. Update all editable fields with revised content
    cy.get('form[aria-label="brief form"]').within(() => {
      cy.get('input[name="title"]').click({ force: true }).type('{selectall}{backspace}Updated Brief Title');
      cy.get('textarea[id="description"]').click({ force: true }).type('{selectall}{backspace}This is an updated description.');

      cy.get('#editorjs').should('be.visible').find('.codex-editor', { timeout: 10000 }).should('exist');
      cy.get('#editorjs').within(() => {
        cy.get('div[contenteditable="true"]')
          .first()
          .click({ force: true })
          .clear({ force: true })
          .type('Updated body content.', { delay: 30 })
          .blur();
      });
      cy.wait(300);
      cy.get('button[type="submit"]').click();
    });

    // 4. Assert the updated title is reflected in the briefs table
    cy.url().should('match', /\/admin\/briefs$/);
    cy.get('tbody > tr').should('be.visible').should('contain.text', 'Updated Brief Title');
  });

  it('renders pre-seeded content accurately on the public feed without logging in', () => {
    // 1. Visit the public briefs feed directly without any authentication
    cy.visit('/briefs');

    // 2. Assert the seeded article title is rendered in the public content layer
    cy.get('body').should('contain.text', 'Learning postgres');
  });

  it('allows a user to delete one of their own briefs', () => {
    // 1. Authenticate and navigate to the briefs management table
    loginAsBob();
    cy.visit('/admin/briefs');
    cy.get('tbody').should('contain.text', 'Learning postgres');

    // 2. Open the row actions dropdown for the target brief
    cy.contains('tr', 'Learning postgres').within(() => {
      cy.get('button[aria-label="Row actions"]').click();
    });

    // 3. Wait for the dropdown animation to complete and click the destructive action
    cy.get('[role="menu"]').should('be.visible');
    cy.wait(200);
    cy.contains('[role="menuitem"]', 'Delete').click();

    // 4. Assert the brief is removed from the admin table
    cy.get('tbody').should('not.contain.text', 'Learning postgres');
  });
});

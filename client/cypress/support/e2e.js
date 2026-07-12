// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err) => {
  // Prevent Cypress from failing tests due to Next.js development hydration mismatches
  if (
    err.message.includes('Hydration failed') ||
    err.message.includes('Minified React error #418') ||
    err.message.includes('Minified React error #423') ||
    err.message.includes('dangerouslySetInnerHTML') ||
    err.message.includes('Text content did not match')
  ) {
    return false; // Confirms to Cypress that this error should be ignored safely
  }

  // Prevent failures on font or asset network 404s (e.g., FiraCode-VF)
  if (err.message.includes('Failed to load resource')) {
    return false;
  }

  // Let genuine application logic errors continue to fail the runner intentionally
  return true;
});
module.exports = {
  // Tells Jest to run tests in a Node.js environment (not a browser)
  testEnvironment: 'node',

  // Automatically clear mock calls and instances between every single test
  clearMocks: true,

  // Tells Jest where to find your test files
  testMatch: ['**/tests/**/*.test.js'],

  // The path to a module that runs once BEFORE each test file executes
  setupFilesAfterEnv: ['./tests/setup.js'],

  // Forces Jest to exit after all tests complete (prevents hanging open handles)
  forceExit: true,
};
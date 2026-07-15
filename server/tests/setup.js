// 1. Force the environment to "test" to prevent accidental production database wipes
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'super-secret-test-key';

// 2. Global lifecycle hooks
beforeAll(async () => {
  // If you are using a mock database memory server (like mongodb-memory-server),
  // you would connect to it here.
  console.log('--- Global Test Setup Initiated ---');
});

afterEach(async () => {
  // Clean up database collections or reset heavy mocks here 
  // so data from Test A doesn't bleed into Test B.
  jest.clearAllMocks();
});

afterAll(async () => {
  // Disconnect from database memory servers or close open connections here
  console.log('--- Global Test Teardown Complete ---');
});
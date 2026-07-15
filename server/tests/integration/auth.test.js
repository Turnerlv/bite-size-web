const request = require('supertest');
const jwt = require('jsonwebtoken');

// Server token
jest.mock('../../src/middleware/tokenCheck', () => jest.fn()); 

// Mock the userQueries module
jest.mock('../../src/db/userQueries', () => ({
  createUser: jest.fn(),
  getUserByEmail: jest.fn(),
  getUserById: jest.fn(),
  updatePassword: jest.fn(),
}));

// Mock the authMiddleware module
jest.mock('../../src/middleware/authMiddleware', () => ({
  verifyToken: jest.fn((req, res, next) => next()),
  verifyUserOwner: jest.fn((req, res, next) => next()),
  authorizeRole: jest.fn(() => (req, res, next) => next()),
  verifyResourceOwner: jest.fn(() => (req, res, next) => next()),
}));

const app = require('../../src/app');
const tokenCheck = require('../../src/middleware/tokenCheck');
const users = require('../../src/db/userQueries');
const { verifyToken } = require('../../src/middleware/authMiddleware');


//********* Integration tests for the auth routes **********/ 
describe('Create account route', () => {

  beforeEach(() => {
    jest.resetAllMocks();
    tokenCheck.mockImplementation((req, res, next) => {
      req.authorizedTime = 'Wednesday, June 17, 2026';
      next();
    });
  });

  it('should create a new user with the provided credentials', async () => {
    users.createUser.mockResolvedValue({
      id: '123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'user'
    });

    const res = await request(app)
      .post('/api/auth/create-account')
      .send({ name: 'John Doe', email: 'johndoe@example.com', provider_key: 'examplepassword' });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toEqual({ id: '123', name: 'John Doe', role: 'user' });
  });

});

describe('Protected auth routes', () => {

  beforeEach(() => {
    jest.resetAllMocks();
    tokenCheck.mockImplementation((req, res, next) => {
      req.authorizedTime = 'Wednesday, June 17, 2026';
      next();
    });
  });

  it('should login the user if they are authorized', async () => {
    users.getUserByEmail.mockResolvedValue({
      id: '123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'user',
      provider_key: '$2a$10$8P7sSazwwsfuZJ0azMnkXulhqtLW7Bl1H4woKmWtFQNXqxt7RxBN6'
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'johndoe@example.com', provider_key: 'examplepassword' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful!");
    expect(res.body.user).toEqual({ id: '123', name: 'John Doe', role: 'user' });
  });

  it('should return 401 if the login credentials are invalid', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wronguser@example.com', provider_key: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid email or password.');
  });

});

describe('Change password route', () => {

  beforeEach(() => {
    jest.resetAllMocks();
    tokenCheck.mockImplementation((req, res, next) => {
      req.authorizedTime = 'Wednesday, June 17, 2026';
      next();
    });
    verifyToken.mockImplementation((req, res, next) => {
      req.user = { userId: 1, role: 'user' };
      next();
    });
  });

  it('should update the password if credentials are valid', async () => {
    users.getUserById.mockResolvedValue({
      id: 1,
      name: 'John Doe',
      role: 'user',
      provider: 'local',
      provider_key: '$2a$10$8P7sSazwwsfuZJ0azMnkXulhqtLW7Bl1H4woKmWtFQNXqxt7RxBN6'
    });
    users.updatePassword.mockResolvedValue();

    const res = await request(app)
      .put('/api/auth/change-password')
      .send({ current_password: 'examplepassword', new_password: 'newpassword' });

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toEqual({ id: 1, name: 'John Doe', role: 'user' });
  });

  it('should return 401 if the user is not authenticated', async () => {
    verifyToken.mockImplementationOnce((req, res, next) => {
      res.status(401).json({ error: 'Access denied' });
    });

    const res = await request(app)
      .put('/api/auth/change-password')
      .send({ current_password: 'examplepassword', new_password: 'newpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Access denied');
  });

});


const request = require('supertest');

jest.mock('../../src/middleware/tokenCheck', () =>
  jest.fn((req, res, next) => {
    req.authorizedTime = 'Wednesday, June 17, 2026';
    next();
  })
);

jest.mock('../../src/db/userQueries', () => ({
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  getUserByEmail: jest.fn(),
  createUser: jest.fn(),
  updateUserProfile: jest.fn(),
  deleteUser: jest.fn(),
}));

jest.mock('../../src/middleware/authMiddleware', () => ({
  verifyToken: jest.fn((req, res, next) => {
    req.user = { userId: 1, role: 'admin' };
    next();
  }),
  verifyUserOwner: jest.fn((req, res, next) => next()),
  authorizeRole: jest.fn(() => (req, res, next) => next()),
  verifyResourceOwner: jest.fn(() => (req, res, next) => next()),
}));

const app = require('../../src/app');
const users = require('../../src/db/userQueries');
const { verifyToken } = require('../../src/middleware/authMiddleware');


//********* Integration tests for the user routes **********/
describe('Get all users route', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    users.getAllUsers.mockResolvedValue([
      { id: 1, name: 'John Doe', email: 'johndoe@example.com', createdAt: '2026-06-17T00:00:00.000Z' },
      { id: 2, name: 'Jane Doe', email: 'janedoe@example.com', createdAt: '2026-06-17T00:00:00.000Z' },
    ]);

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      { id: 1, name: 'John Doe', email: 'johndoe@example.com', createdAt: '2026-06-17T00:00:00.000Z' },
      { id: 2, name: 'Jane Doe', email: 'janedoe@example.com', createdAt: '2026-06-17T00:00:00.000Z' },
    ]);
  });

  it('should return 401 if the user is not authenticated', async () => {
    verifyToken.mockImplementationOnce((req, res, next) => {
      res.status(401).json({ error: 'Access denied' });
    });

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Access denied');
  });

});

describe('Get user by ID route', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a user by ID', async () => {
    users.getUserById.mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'user',
      provider: 'local',
      createdAt: '2026-06-17T00:00:00.000Z',
    });

    const res = await request(app).get('/api/users/user-by-id/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'user',
      provider: 'local',
      createdAt: '2026-06-17T00:00:00.000Z',
    });
  });

});

describe('Get user by email route', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a user by email', async () => {
    users.getUserByEmail.mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'user',
    });

    const res = await request(app).get('/api/users/user-by-name/johndoe@example.com');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'user',
    });
  });

  it('should return 401 if the user is not authenticated', async () => {
    verifyToken.mockImplementationOnce((req, res, next) => {
      res.status(401).json({ error: 'Access denied' });
    });

    const res = await request(app).get('/api/users/user-by-name/johndoe@example.com');

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Access denied');
  });

});

describe('Create user route', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    users.createUser.mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'user',
    });

    const res = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe', email: 'johndoe@example.com', provider: 'local', provider_key: 'examplepassword' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'user',
    });
  });

});

describe('Update user route', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the user profile', async () => {
    users.updateUserProfile.mockResolvedValue({
      id: 1,
      name: 'John Updated',
      email: 'johndoe@example.com',
      createdAt: '2026-06-17T00:00:00.000Z',
    });

    const res = await request(app)
      .put('/api/users/user-by-id/1')
      .send({ name: 'John Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: 'John Updated',
      email: 'johndoe@example.com',
      createdAt: '2026-06-17T00:00:00.000Z',
    });
  });

  it('should return 401 if the user is not authenticated', async () => {
    verifyToken.mockImplementationOnce((req, res, next) => {
      res.status(401).json({ error: 'Access denied' });
    });

    const res = await request(app)
      .put('/api/users/user-by-id/1')
      .send({ name: 'John Updated' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Access denied');
  });

});

describe('Delete user route', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a user', async () => {
    users.deleteUser.mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    const res = await request(app).delete('/api/users/user-by-id/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    });
  });

  it('should return 401 if the user is not authenticated', async () => {
    verifyToken.mockImplementationOnce((req, res, next) => {
      res.status(401).json({ error: 'Access denied' });
    });

    const res = await request(app).delete('/api/users/user-by-id/1');

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Access denied');
  });

});

const request = require('supertest');

// Server token
jest.mock('../../src/middleware/tokenCheck', () =>
  jest.fn((req, res, next) => {
    req.authorizedTime = 'Wednesday, June 17, 2026';
    next();
  })
);

jest.mock('../../src/db/blogQueries', () => ({
  createBlogPost: jest.fn(),
  getBlogs: jest.fn(),
  getBlogsByAuthor: jest.fn(),
  getBlogById: jest.fn(),
  updateBlogPost: jest.fn(),
  getBlogBySlug: jest.fn(),
  deleteBlog: jest.fn(),
}));

// Mock the authMiddleware module
jest.mock('../../src/middleware/authMiddleware', () => ({
  verifyToken: jest.fn((req, res, next) => {
    req.user = { userId: 1, role: 'admin' };
    next();
  }),
  authorizeRole: jest.fn((...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: User role cannot access this resource' });
    }
    next();
  }),
  verifyResourceOwner: jest.fn((getFn) => async (req, res, next) => {
    if (req.user.role === 'admin') return next();
    const resource = await getFn(req.params.id);
    if (req.user.userId !== resource.author_id) {
      return res.status(403).json({ error: 'Forbidden: User role cannot access this resource' });
    }
    next();
  }),
  verifyUserOwner: jest.fn((req, res, next) => next()),
}));

const app = require('../../src/app');
const blogs = require('../../src/db/blogQueries');
const { verifyToken } = require('../../src/middleware/authMiddleware');


//********* Integration tests for the blog routes **********/ 
describe('Create blog route', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new blog post with the blog information', async () => {
    blogs.createBlogPost.mockResolvedValue({
      id: '123',
      title: 'Test Blog',
      description: 'This is a test blog post.',
      category: 'Test Category',
      image_url: 'https://example.com/image.jpg',
      content: 'This is a test blog post.',
      author: 'John Doe',
      slug: 'test-blog',
      createdAt: '2026-06-17T00:00:00.000Z'
    });

    const res = await request(app)
      .post('/api/blogs')
      .send({ title: 'Test Blog', content: 'This is a test blog post.', author: '123' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      id: '123',
      title: 'Test Blog',
      description: 'This is a test blog post.',
      category: 'Test Category',
      image_url: 'https://example.com/image.jpg',
      content: 'This is a test blog post.',
      author: 'John Doe',
      slug: 'test-blog',
      createdAt: '2026-06-17T00:00:00.000Z'
    });
  });

  it('should return 401 if the user is not authenticated', async () => {
    verifyToken.mockImplementationOnce((req, res, next) => {
      res.status(401).json({ error: 'Access denied' });
    });

    const res = await request(app)
      .post('/api/blogs')
      .send({ title: 'Test Blog', content: 'This is a test blog post.', author: '123' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Access denied');
  });

  it('should return 403 if the user is not authorized', async () => {
    verifyToken.mockImplementationOnce((req, res, next) => {
      req.user = { userId: 1, role: 'guest' }; // Simulate a guest user
      next();
    });

    const res = await request(app)
      .post('/api/blogs')
      .send({ title: 'Test Blog', content: 'This is a test blog post.', author: '123' });

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe('Forbidden: User role cannot access this resource');
  });
});

describe('Get all blogs route', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all blog posts', async () => {
    blogs.getBlogs.mockResolvedValue([
      { id: '1', title: 'Blog 1', slug: 'blog-1' },
      { id: '2', title: 'Blog 2', slug: 'blog-2' },
    ]);

    const res = await request(app).get('/api/blogs');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      { id: '1', title: 'Blog 1', slug: 'blog-1' },
      { id: '2', title: 'Blog 2', slug: 'blog-2' },
    ]);
  });

});

describe('Get blogs by author route', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all blogs by a specific author', async () => {
    blogs.getBlogsByAuthor.mockResolvedValue([
      { id: '1', title: 'Blog 1', author: 'John Doe' },
    ]);

    const res = await request(app).get('/api/blogs/by-author/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: '1', title: 'Blog 1', author: 'John Doe' }]);
  });

  it('should return 401 if the user is not authenticated', async () => {
    verifyToken.mockImplementationOnce((req, res, next) => {
      res.status(401).json({ error: 'Access denied' });
    });

    const res = await request(app).get('/api/blogs/by-author/1');

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Access denied');
  });

});

describe('Get blog by ID route', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a blog post by ID', async () => {
    blogs.getBlogById.mockResolvedValue({
      id: '1', title: 'Blog 1', slug: 'blog-1'
    });

    const res = await request(app).get('/api/blogs/blog-by-id/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: '1', title: 'Blog 1', slug: 'blog-1' });
  });

});

describe('Get blog by slug route', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a blog post by slug', async () => {
    blogs.getBlogBySlug.mockResolvedValue({
      id: '1', title: 'Blog 1', slug: 'blog-1'
    });

    const res = await request(app).get('/api/blogs/blog-by-slug/blog-1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: '1', title: 'Blog 1', slug: 'blog-1' });
  });

});

describe('Update blog route', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a blog post', async () => {
    // Mock the user to determine if they are the owner of the blog
    verifyToken.mockImplementationOnce((req, res, next) => {
      req.user = { userId: 2, role: 'user' };
      next();
    });

    // Mock the blog data for verifyResourceOwner
    blogs.getBlogById.mockResolvedValue({ 
      id: '1',
      title: 'Updated Blog',
      slug: 'updated-blog',
      author_id: 2,
    });

    // Main updateBlogPost mock
    blogs.updateBlogPost.mockResolvedValue({
      id: '1',
      title: 'Updated Blog',
      slug: 'updated-blog',
      author: 'John Doe',
    });

    const res = await request(app)
      .put('/api/blogs/blog-by-id/1')
      .send({ title: 'Updated Blog', content: 'Updated content.' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: '1', title: 'Updated Blog', slug: 'updated-blog', author: 'John Doe' });
  });

  it('should return 401 if the user is not authenticated', async () => {
    verifyToken.mockImplementationOnce((req, res, next) => {
      res.status(401).json({ error: 'Access denied' });
    });

    const res = await request(app)
      .put('/api/blogs/blog-by-id/1')
      .send({ title: 'Updated Blog', content: 'Updated content.' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Access denied');
  });

});

  it('should return 403 if the user is not the owner of the blog', async () => {
    // Mock the user to determine if they are the owner of the blog
    verifyToken.mockImplementationOnce((req, res, next) => {
      req.user = { userId: 3, role: 'user' };
      next();
    });

    // Mock the blog data for verifyResourceOwner
    blogs.getBlogById.mockResolvedValue({ 
      id: '1',
      title: 'Updated Blog',
      slug: 'updated-blog',
      author_id: 2,
    });

    // Main updateBlogPost mock
    blogs.updateBlogPost.mockResolvedValue({
      id: '1',
      title: 'Updated Blog',
      slug: 'updated-blog',
      author: 'John Doe',
    });

    const res = await request(app)
      .put('/api/blogs/blog-by-id/1')
      .send({ title: 'Updated Blog', content: 'Updated content.' });

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe('Forbidden: User role cannot access this resource');
  });

describe('Delete blog route', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a blog post', async () => {
    blogs.deleteBlog.mockResolvedValue({
      id: '1', title: 'Blog 1', slug: 'blog-1'
    });

    const res = await request(app).delete('/api/blogs/blog-by-id/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: '1', title: 'Blog 1', slug: 'blog-1' });
  });

  it('should return 401 if the user is not authenticated', async () => {
    verifyToken.mockImplementationOnce((req, res, next) => {
      res.status(401).json({ error: 'Access denied' });
    });

    const res = await request(app).delete('/api/blogs/blog-by-id/1');

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Access denied');
  });

    it('should return 403 if the user is not the owner of the blog', async () => {
    // Mock the user to determine if they are the owner of the blog
    verifyToken.mockImplementationOnce((req, res, next) => {
      req.user = { userId: 3, role: 'user' };
      next();
    });

    // Mock the blog data for verifyResourceOwner
    blogs.getBlogById.mockResolvedValue({ 
      id: '1',
      title: 'Updated Blog',
      slug: 'updated-blog',
      author_id: 2,
    });

    const res = await request(app).delete('/api/blogs/blog-by-id/1');

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe('Forbidden: User role cannot access this resource');
  });

});


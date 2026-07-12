const express = require('express');
const blogsRouter = express.Router();
const blogQueries = require('../db/blogQueries');
const generateUniqueSlug = require('../utils/slugger');
const { verifyToken, authorizeRole, verifyResourceOwner } = require('../middleware/authMiddleware')

// Error catcher
const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);

// Post blog
blogsRouter.post('/',
    verifyToken,
    authorizeRole('user', 'admin'),
    wrap(async (req, res) => {
        const title = req.body.title;
        const description = req.body.description;
        const category = req.body.category;
        const imageURL = req.body.image_url;
        const content = JSON.stringify(req.body.content);
        const authorId = req.body.author || req.user.userId; // Use author from body or fallback to authenticated user
        const slug = await generateUniqueSlug(null, title);
        const newBlog = await blogQueries.createBlogPost(title, description, category, imageURL, content, authorId, slug)
        res.status(201)
        res.send(newBlog)
    }))


// Get all blogs
blogsRouter.get('/', async (req, res) => {
    const blogs = await blogQueries.getBlogs()
    res.send(blogs)
})

// Get blogs by author
blogsRouter.get('/by-author/:authorId',
    verifyToken,
    authorizeRole('user', 'admin'),
    wrap(async (req, res) => {
        const blogs = await blogQueries.getBlogsByAuthor(req.params.authorId)
        res.send(blogs)
    }))

// Get blog by ID
blogsRouter.get('/blog-by-id/:id', async (req, res) => {
    const id = req.params.id
    const blog = await blogQueries.getBlogById(id)
    res.send(blog)
})

// Update blog
blogsRouter.put('/blog-by-id/:id',
    verifyToken,
    authorizeRole('user', 'admin'),
    verifyResourceOwner(blogQueries.getBlogById),
    wrap(async (req, res) => {
        const title = req.body.title;
        const description = req.body.description;
        const category = req.body.category;
        const imageURL = req.body.image_url;
        const content = JSON.stringify(req.body.content);
        const slug = await generateUniqueSlug(req.params.id, title);
        const updatedBlog = await blogQueries.updateBlogPost(req.params.id, title, description, category, imageURL, content, slug)
        res.send(updatedBlog)
    }))

//Get blog by slug
blogsRouter.get('/blog-by-slug/:slug', async (req, res) => {
    const slug = req.params.slug
    const blog = await blogQueries.getBlogBySlug(slug)
    res.send(blog)
})

// Delete blog
blogsRouter.delete('/blog-by-id/:id',
    verifyToken,
    authorizeRole('user', 'admin'),
    verifyResourceOwner(blogQueries.getBlogById),
    wrap(async (req, res) => {
        const id = req.params.id
        const deletedBody = await blogQueries.deleteBlog(id)
        res.send(deletedBody)
    }))

module.exports = blogsRouter;
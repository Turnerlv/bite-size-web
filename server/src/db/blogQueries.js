const db = require('./dbconn')


function blogValidation(blog) {
    if (!blog) {
        const error = new Error('No blog found')
        error.statusCode = 404
        throw error
    }
}

const blogQueries = {

    async createBlogPost(title, description, category, imageURL, content, author, slug) {
        const query = `
            WITH inserted_blog AS (
                INSERT INTO blogs (title, description, category, image_url, content, author_id, slug, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
                RETURNING *
            )
            SELECT 
                b.id, 
                b.title, 
                b.description,
                b.category,
                b.image_url,
                b.content, 
                u.name AS author, 
                b.slug,
                b.is_published AS "isPublished",
                b.created_at AS "createdAt"
            FROM inserted_blog AS b
            JOIN users AS u ON b.author_id = u.id;
        `;
        const { rows: [blog] } = await db.query(query, [title, description, category, imageURL, content, author, slug])
        return blog
    },

    async getBlogs() {
        const query = `
                SELECT 
                    b.id, 
                    b.title, 
                    b.description,
                    b.category,
                    b.image_url,
                    b.content, 
                    u.name AS author,
                    b.slug,
                    b.is_published AS "isPublished",
                    b.created_at AS "createdAt"
                FROM blogs AS b
                INNER JOIN users AS u ON u.id = b.author_id
                WHERE b.is_published = TRUE
                ORDER BY b.created_at DESC;
            `;
        const { rows: allBlogs } = await db.query(query)
        return allBlogs
    },

    async getBlogsByAuthor(authorId) {
        const query = `
                SELECT 
                    b.id, 
                    b.title, 
                    b.description,
                    b.category,
                    b.image_url,
                    b.content, 
                    u.name AS author,
                    b.slug,
                    b.is_published AS "isPublished",
                    b.created_at AS "createdAt"
                FROM blogs AS b
                INNER JOIN users AS u ON u.id = b.author_id
                WHERE b.author_id = $1
                ORDER BY b.created_at DESC;
            `;
        const { rows: blogs } = await db.query(query, [authorId])
        return blogs
    },

    async getBlogById(id) {
        const query = `
            SELECT 
                b.id, 
                b.title, 
                b.description,
                b.category,
                b.image_url,
                b.content, 
                b.author_id,
                u.name AS author,
                b.slug,
                b.is_published AS "isPublished",
                b.created_at AS "createdAt"
            FROM blogs AS b
            INNER JOIN users AS u ON u.id = b.author_id
            WHERE b.id = $1;
        `;
        const { rows: [blog] } = await db.query(query, [id])
        blogValidation(blog)
        return blog
    },

    async updateBlogPost(id, title, description, category, imageURL, content, slug) {
        const query = `
            UPDATE blogs AS b
            SET 
                title = $1, 
                description = $2,
                category = $3,
                image_url = $4,
                content = $5,
                slug = $6
            FROM users AS u
            WHERE b.author_id = u.id 
            AND b.id = $7
            RETURNING 
                b.id, 
                b.title, 
                b.description,
                b.image_url,
                b.content, 
                u.name AS author, 
                b.created_at AS "createdAt";
        `;
        const { rows: [blog] } = await db.query(query, [title, description, category, imageURL, content, slug, id])
        blogValidation(blog)
        return blog
    },

    async getBlogBySlug(slug) {
        const query = `
            SELECT 
                b.id, 
                b.title, 
                b.description,
                b.category,
                b.image_url,
                b.content, 
                u.name AS author,
                b.slug,
                b.is_published AS "isPublished",
                b.created_at AS "createdAt"
            FROM blogs AS b
            INNER JOIN users AS u ON u.id = b.author_id
            WHERE b.slug = $1
            AND b.is_published = TRUE;
        `;
        const { rows: [blog] } = await db.query(query, [slug])
        blogValidation(blog)
        return blog
    },

    async deleteBlog(id) {
        const query = `
                DELETE FROM blogs AS b
                USING users AS u
                WHERE b.author_id = u.id 
                AND b.id = $1
                RETURNING 
                    b.id, 
                    b.title, 
                    u.name AS author, 
                    b.created_at AS "createdAt";
            `;
        const { rows: [blog] } = await db.query(query, [id])
        blogValidation(blog)
        console.log
        return blog
    }
}

module.exports = blogQueries;
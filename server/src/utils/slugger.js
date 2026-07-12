const slugify = require('slugify')
const db = require('../db/dbconn')

async function generateUniqueSlug(id = null, title) {

    let slug = slugify(title, { lower: true, strict: true });

    const result = await db.query(`SELECT id FROM blogs WHERE slug = $1${id ? ' AND id != $2' : ''};`, id ? [slug, id] : [slug]);

    if (result.rows.length > 0) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    return slug;
}

module.exports = generateUniqueSlug;
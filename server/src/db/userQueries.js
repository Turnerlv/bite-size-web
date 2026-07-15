const db = require('./dbconn')

function userValidation(user) {
    if (!user) {
        const error = new Error('No user found')
        error.statusCode = 404
        throw error
    }
}

const userQueries = {

    async getAllUsers() {
        const query = `
            SELECT
                id,
                name,
                email,
                created_at AS "createdAt"
            FROM users
            ORDER BY name ASC;
        `;
        const { rows: allUsers } = await db.query(query)
        return allUsers
    },

    async getUserById(id) {
        const query = `
            SELECT 
                u.id, 
                u.name, 
                u.email, 
                u.role, 
                a.provider,
                a.provider_key,
                u.created_at AS "createdAt"
            FROM users u
            INNER JOIN user_auth a ON u.id = a.user_id
            WHERE u.id = $1;
        `;
        const { rows: [user] } = await db.query(query, [id])
        userValidation(user)
        return user
    },

    async getUserByEmail(email) {
        const query = `
            SELECT 
                u.id, 
                u.name, 
                u.email, 
                u.role, 
                a.provider_key
            FROM users u
            INNER JOIN user_auth a ON u.id = a.user_id
            WHERE u.email = $1 AND a.provider = 'local';
        `;
        const { rows: [user] } = await db.query(query, [email])
        return user
    },

    async createUser(name, email, provider, providerKey) {
        const userQuery = `
            INSERT INTO users (name, email, role)
            VALUES ($1, $2, $3)
            RETURNING
                id,
                name,
                email,
                role;
        `;
        const authQuery = `
            INSERT INTO user_auth (user_id, provider, provider_key)
            VALUES ($1, $2, $3);
        `;
        const client = await db.pool.connect();
        try {
            await db.query('BEGIN')
            const { rows: [user] } = await db.query(userQuery, [name, email, 'user'])
            await db.query(authQuery, [user.id, provider, providerKey])
            await db.query('COMMIT')
            return user
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    },

    async updateUserProfile(id, name) {
        const query = `
            UPDATE users
            SET
                name = $1
            WHERE id = $2
            RETURNING
                id,
                name,
                email,
                created_at AS "createdAt";
        `;
        const { rows: [user] } = await db.query(query, [name, id])
        userValidation(user)
        return user
    },

    async updatePassword(id, newPassword) {
        const query = `
            UPDATE user_auth
            SET
                provider_key = $1
            WHERE user_id = $2;
        `;
        await db.query(query, [newPassword, id])
    },

    async deleteUser(id) {
        const query = `
            DELETE FROM users
            WHERE id = $1
            RETURNING
                id,
                name,
                email;
        `;
        const { rows: [user] } = await db.query(query, [id])
        userValidation(user)
        return user
    }
}

module.exports = userQueries;

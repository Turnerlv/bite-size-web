const fs = require('fs')
const path = require('path')
const db = require('../db/dbconn')

const init = async () => {
    try {
        const sqlPath = path.join(__dirname, 'setup-db.sql')
        const sql = fs.readFileSync(sqlPath, 'utf-8')

        await db.query(sql)

        console.log("✅ Tables created successfully!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error initializing database:", err);
        process.exit(1);
    }
}
init()
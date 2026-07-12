const fs = require('fs')
const path = require('path')
const db = require('../db/dbconn')

const seed = async () => {
    try {
        const sqlPath = path.join(__dirname, 'populate-db.sql')
        const sql = fs.readFileSync(sqlPath, 'utf-8')

        await db.query(sql)

        console.log("Data successfully seeded!");
        process.exit(0);
    } catch (err) {
        console.error('Error seeding data: ', err);
        process.exit(1);
    }
}
seed()
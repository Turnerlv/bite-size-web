const { Pool } = require('pg');
const config = require('../../config')

const pool = new Pool(config)

pool.on('connect', () => {
    console.log('Pool connected to postgres')
})

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
}

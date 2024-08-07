const pool = require('./pool')

async function s() {
    const { rows } = await pool.query('SELECT * FROM users;')
    console.log(rows)
}
s()
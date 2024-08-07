const pool = require('./pool')

async function createUserModel() {
    await pool.query("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, firstName VARCHAR (255), lastName VARCHAR (255), username VARCHAR (255), password VARCHAR (255), isMember boolean, isAdmin boolean);")
}

async function createMessages() {
    await pool.query('CREATE TABLE IF NOT EXISTS messages (message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title VARCHAR (255), time DATE, message VARCHAR (255), user_id INTEGER, CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id));')
}
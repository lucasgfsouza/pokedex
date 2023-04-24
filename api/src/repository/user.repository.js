const db = require('../db'); // Importe o módulo de conexão ao banco de dados que você está usando

const create = async (username, password) => {

    const result = await db.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
        [username, password]
    );

    return result.rows[0].id;
};

const update = async (userId, username, password) => {

    await db.query(
        'UPDATE users SET username = $1, password = $2 WHERE id = $3',
        [username, password, userId]
    );
};

const deleteUser = async (userId) => {
    await db.query('DELETE FROM users WHERE id = $1', [userId]);
};

const findByUsername = async (username) => {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

    return result.rows[0];
};

module.exports = {
    create,
    update,
    deleteUser,
    findByUsername
};

// Hämtar db anslutning
const db = require('../db');

// Hämtar alla klockor
async function getAll() {
    const [rows] = await db.query('SELECT * FROM watches;');
    return rows;
}

// Hämtar en specifik klocka med givet id
async function getById(id) {
    const [rows] = await db.query('SELECT * FROM watches WHERE id = ?', [id]);
    return rows[0];
}

module.exports = { getAll, getById };
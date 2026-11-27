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

// POST - lägg till klocka
async function create(brand, model, price, is_owned) {
    const [result] = await db.query(
        'INSERT INTO watches (brand, model, price, is_owned) VALUES (?, ?, ?, ?)',
        [brand, model, price, is_owned]
    );
    return result.insertId; // <-- ID:t som databasen gav den nyinlagda klockan.
}

module.exports = { getAll, getById, create };
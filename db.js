// Databaskoppling med mysql
const mysql = require('mysql2/promise');

// En pool återanvänder anslutningar istället för att öppna ny vid varje anrop
const db = mysql.createPool({ uri: process.env.DATABASE_URL });

module.exports = db;
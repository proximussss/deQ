const { Pool } = require('pg');
require('dotenv').config();

// Debug database connection parameters
console.log('Database connection parameters:');
console.log('Host:', process.env.DB_HOST);
console.log('Port:', process.env.DB_PORT);
console.log('Database:', process.env.DB_DATABASE);
console.log('User:', process.env.DB_USER);
console.log('Password length:', process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 0);

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: false
});

// Add a listener for connection errors
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

module.exports = { pool };
// test-db.js
const { Client, Pool } = require('pg');
require('dotenv').config();

async function createDatabaseIfNotExists() {
  // Connect to PostgreSQL without specifying a database
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'postgres' // Default database
  });

  try {
    await client.connect();
    
    // Check if database exists
    const result = await client.query(`
      SELECT 1 FROM pg_database WHERE datname = $1
    `, ['flashcards']);
    
    if (result.rows.length === 0) {
      console.log('Database "flashcards" does not exist. Creating...');
      // Create the database
      await client.query('CREATE DATABASE flashcards');
      console.log('Database "flashcards" created successfully!');
    } else {
      console.log('Database "flashcards" already exists');
    }
  } catch (err) {
    console.error('Error checking/creating database:', err);
  } finally {
    await client.end();
  }
}

async function testConnection() {
  // First, ensure the database exists
  await createDatabaseIfNotExists();
  
  // Now test connection to the flashcards database
  const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    ssl: false
  });

  try {
    console.log('Testing database connection to flashcards...');
    const res = await pool.query('SELECT NOW()');
    console.log('Database connection successful!');
    console.log('Server time:', res.rows[0].now);
    await pool.end();
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
}

testConnection();
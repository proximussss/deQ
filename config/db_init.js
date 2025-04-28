const { pool } = require('./db');

// Function to initialize the database schema
const initializeDatabase = async () => {
  try {
    // Create users table for authentication
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        avatar VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create session logs table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS session_logs (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        time TIME NOT NULL,
        score REAL NOT NULL,
        module VARCHAR(255) NOT NULL,
        session_num INTEGER NOT NULL,
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create module tables
    const modules = [
      'formal_languages_automata',
      'machine_learning',
      'parallel_computing',
      'software_design'
    ];

    for (const module of modules) {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS ${module} (
          id SERIAL PRIMARY KEY,
          front TEXT NOT NULL,
          back TEXT NOT NULL,
          correct VARCHAR(50),
          response TEXT,
          user_id INTEGER REFERENCES users(id),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }

    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
};

// Export the function for use in server.js
module.exports = { initializeDatabase };
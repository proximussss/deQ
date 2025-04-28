const express = require('express');
const path = require('path');
const cors = require('cors');
const { pool } = require('./config/db');
require('dotenv').config();

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/modules', require('./routes/modules'));
app.use('/api/cards', require('./routes/cards'));
app.use('/api/sessions', require('./routes/sessions'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Define port
const PORT = process.env.PORT || 5000;

// Initialize database and start server
const startServer = async () => {
  try {
    console.log('Connecting to database...');
    await pool.connect();
    console.log('Database connected');
    
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to database:', err.message);
    process.exit(1);
  }
};

startServer();
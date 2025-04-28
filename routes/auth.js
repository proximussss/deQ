const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const { pool } = require('../config/db');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT id, name, email, avatar FROM users WHERE id = $1',
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      
      if (userCheck.rows.length === 0) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const user = userCheck.rows[0];

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Return JWT
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/auth/google
// @desc    Authenticate with Google OAuth
// @access  Public
router.post('/google', async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const { email, name, picture } = ticket.getPayload();

    // Check if user exists
    let userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    let user;
    
    if (userCheck.rows.length === 0) {
      // Create new user if doesn't exist
      const newUser = await pool.query(
        'INSERT INTO users (name, email, avatar) VALUES ($1, $2, $3) RETURNING id, name, email, avatar',
        [name, email, picture]
      );
      
      user = newUser.rows[0];
    } else {
      user = userCheck.rows[0];
    }

    // Return JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Google auth error:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
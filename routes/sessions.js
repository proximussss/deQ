const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { pool } = require('../config/db');

// @route   GET api/sessions
// @desc    Get session logs
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Get session logs for the user
    const logsResult = await pool.query(`
      SELECT id, date, time, score, module, session_num
      FROM session_logs
      WHERE user_id = $1
      ORDER BY date DESC, time DESC
      LIMIT 50
    `, [req.user.id]);

    // Format module names to be more user-friendly
    const logs = logsResult.rows.map(log => ({
      id: log.id,
      date: log.date,
      time: log.time,
      score: log.score,
      module: log.module.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      sessionNum: log.session_num
    }));

    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
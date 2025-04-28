const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { pool } = require('../config/db');

// @route   GET api/modules
// @desc    Get all available modules
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Get all module tables
    const modules = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public' 
      AND table_name != 'users' 
      AND table_name != 'session_logs'
    `);

    // Format module names to be more user-friendly
    const formattedModules = modules.rows.map(module => {
      const name = module.table_name;
      return {
        id: name,
        name: name.split('_').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
      };
    });

    res.json(formattedModules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/modules/:name/stats
// @desc    Get stats for a specific module
// @access  Private
router.get('/:name/stats', auth, async (req, res) => {
  try {
    const { name } = req.params;
    
    // Validate module name to prevent SQL injection
    const validModules = ['formal_languages_automata', 'machine_learning', 'parallel_computing', 'software_design'];
    if (!validModules.includes(name)) {
      return res.status(400).json({ msg: 'Invalid module name' });
    }

    // Get total cards and correct cards
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN correct = 'Correct' THEN 1 END) as correct
      FROM ${name}
      WHERE user_id = $1
    `, [req.user.id]);

    const total = parseInt(stats.rows[0].total);
    const correct = parseInt(stats.rows[0].correct) || 0;
    const percentage = total > 0 ? Math.round((correct / total * 100) * 10) / 10 : 0;

    res.json({
      total,
      correct,
      percentage
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
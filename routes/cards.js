const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { pool } = require('../config/db');

// @route   GET api/cards/:module
// @desc    Get all cards for a specific module
// @access  Private
router.get('/:module', auth, async (req, res) => {
  try {
    const { module } = req.params;
    
    // Validate module name to prevent SQL injection
    const validModules = ['formal_languages_automata', 'machine_learning', 'parallel_computing', 'software_design'];
    if (!validModules.includes(module)) {
      return res.status(400).json({ msg: 'Invalid module name' });
    }

    // Get cards from the module
    const cardsResult = await pool.query(`
      SELECT id, front, back, correct, response
      FROM ${module}
      WHERE user_id = $1
      ORDER BY id
    `, [req.user.id]);

    const cards = cardsResult.rows.map(card => ({
      id: card.id,
      front: card.front,
      back: card.back,
      correct: card.correct,
      response: card.response
    }));

    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/cards/:module
// @desc    Add a new card to a module
// @access  Private
router.post('/:module', auth, async (req, res) => {
  try {
    const { module } = req.params;
    const { front, back } = req.body;
    
    // Validate module name to prevent SQL injection
    const validModules = ['formal_languages_automata', 'machine_learning', 'parallel_computing', 'software_design'];
    if (!validModules.includes(module)) {
      return res.status(400).json({ msg: 'Invalid module name' });
    }

    // Validate inputs
    if (!front || !back) {
      return res.status(400).json({ msg: 'Front and back are required' });
    }

    // Add the card
    const newCard = await pool.query(`
      INSERT INTO ${module} (front, back, user_id)
      VALUES ($1, $2, $3)
      RETURNING id, front, back, correct, response
    `, [front, back, req.user.id]);

    res.json(newCard.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/cards/:module/:id
// @desc    Update a card
// @access  Private
router.put('/:module/:id', auth, async (req, res) => {
  try {
    const { module, id } = req.params;
    const { front, back, correct, response } = req.body;
    
    // Validate module name to prevent SQL injection
    const validModules = ['formal_languages_automata', 'machine_learning', 'parallel_computing', 'software_design'];
    if (!validModules.includes(module)) {
      return res.status(400).json({ msg: 'Invalid module name' });
    }

    // Check if the card exists and belongs to the user
    const cardCheck = await pool.query(`
      SELECT * FROM ${module} WHERE id = $1 AND user_id = $2
    `, [id, req.user.id]);

    if (cardCheck.rows.length === 0) {
      return res.status(404).json({ msg: 'Card not found' });
    }

    // Update fields that are provided
    let query = `UPDATE ${module} SET `;
    const values = [];
    let valueIndex = 1;

    if (front !== undefined) {
      query += `front = $${valueIndex}, `;
      values.push(front);
      valueIndex++;
    }

    if (back !== undefined) {
      query += `back = $${valueIndex}, `;
      values.push(back);
      valueIndex++;
    }

    if (correct !== undefined) {
      query += `correct = $${valueIndex}, `;
      values.push(correct);
      valueIndex++;
    }

    if (response !== undefined) {
      query += `response = $${valueIndex}, `;
      values.push(response);
      valueIndex++;
    }

    // Remove trailing comma and space
    query = query.slice(0, -2);

    // Add WHERE clause and RETURNING
    query += ` WHERE id = $${valueIndex} AND user_id = $${valueIndex + 1} RETURNING id, front, back, correct, response`;
    values.push(id, req.user.id);

    // Execute the update
    const updatedCard = await pool.query(query, values);

    res.json(updatedCard.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/cards/:module/reset
// @desc    Reset all card scores for a module
// @access  Private
router.put('/:module/reset', auth, async (req, res) => {
  try {
    const { module } = req.params;
    
    // Validate module name to prevent SQL injection
    const validModules = ['formal_languages_automata', 'machine_learning', 'parallel_computing', 'software_design'];
    if (!validModules.includes(module)) {
      return res.status(400).json({ msg: 'Invalid module name' });
    }

    // Get current stats for logging
    const statsResult = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN correct = 'Correct' THEN 1 END) as correct
      FROM ${module}
      WHERE user_id = $1
    `, [req.user.id]);

    const total = parseInt(statsResult.rows[0].total);
    const correct = parseInt(statsResult.rows[0].correct) || 0;
    const percentage = total > 0 ? Math.round((correct / total * 100) * 10) / 10 : 0;

    // Get next session number
    const sessionResult = await pool.query(`
        SELECT MAX(session_num) as max_session
        FROM session_logs
        WHERE module = $1 AND user_id = $2
      `, [module, req.user.id]);
  
      const nextSession = (sessionResult.rows[0].max_session || 0) + 1;
  
      // Log the session
      await pool.query(`
        INSERT INTO session_logs (date, time, score, module, session_num, user_id)
        VALUES (CURRENT_DATE, CURRENT_TIME, $1, $2, $3, $4)
      `, [percentage, module, nextSession, req.user.id]);
  
      // Reset all card scores
      await pool.query(`
        UPDATE ${module}
        SET correct = NULL, response = NULL
        WHERE user_id = $1
      `, [req.user.id]);
  
      // Get updated stats
      const newStatsResult = await pool.query(`
        SELECT 
          COUNT(*) as total,
          COUNT(CASE WHEN correct = 'Correct' THEN 1 END) as correct
        FROM ${module}
        WHERE user_id = $1
      `, [req.user.id]);
  
      const newTotal = parseInt(newStatsResult.rows[0].total);
      const newCorrect = parseInt(newStatsResult.rows[0].correct) || 0;
      const newPercentage = newTotal > 0 ? Math.round((newCorrect / newTotal * 100) * 10) / 10 : 0;
  
      res.json({
        status: 'success',
        message: 'Scores reset successfully',
        stats: {
          total: newTotal,
          correct: newCorrect,
          percentage: newPercentage
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;
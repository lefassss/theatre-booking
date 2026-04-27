const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');

// Get all shows
router.get('/', authMiddleware, (req, res) => {
  const { theatreId, title } = req.query;
  let query = 'SELECT * FROM shows WHERE 1=1';
  const params = [];

  if (theatreId) {
    query += ' AND theatre_id = ?';
    params.push(theatreId);
  }
  if (title) {
    query += ' AND title LIKE ?';
    params.push(`%${title}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});

// Get show by id
router.get('/:id', authMiddleware, (req, res) => {
  db.query(
    'SELECT * FROM shows WHERE show_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(404).json({ message: 'Show not found' });
      res.json(results[0]);
    }
  );
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');

// Get all showtimes for a show
router.get('/', authMiddleware, (req, res) => {
  const { showId } = req.query;
  let query = 'SELECT * FROM showtimes WHERE 1=1';
  const params = [];

  if (showId) {
    query += ' AND show_id = ?';
    params.push(showId);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});

// Get showtime by id
router.get('/:id', authMiddleware, (req, res) => {
  db.query(
    'SELECT * FROM showtimes WHERE showtime_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(404).json({ message: 'Showtime not found' });
      res.json(results[0]);
    }
  );
});

module.exports = router;
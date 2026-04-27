const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');

// Get all theatres
router.get('/', authMiddleware, (req, res) => {
  db.query('SELECT * FROM theatres', (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});

// Get theatre by id
router.get('/:id', authMiddleware, (req, res) => {
  db.query(
    'SELECT * FROM theatres WHERE theatre_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(404).json({ message: 'Theatre not found' });
      res.json(results[0]);
    }
  );
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/auth');

// Get user reservations
router.get('/user', authMiddleware, (req, res) => {
  db.query(
    `SELECT r.*, s.title, st.show_date, st.show_time, st.price, t.name as theatre_name
     FROM reservations r
     JOIN showtimes st ON r.showtime_id = st.showtime_id
     JOIN shows s ON st.show_id = s.show_id
     JOIN theatres t ON s.theatre_id = t.theatre_id
     WHERE r.user_id = ?`,
    [req.user.user_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json(results);
    }
  );
});

// Create reservation
router.post('/', authMiddleware, (req, res) => {
  const { showtime_id, seats } = req.body;
  const user_id = req.user.user_id;

  db.query(
    'SELECT available_seats FROM showtimes WHERE showtime_id = ?',
    [showtime_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(404).json({ message: 'Showtime not found' });

      if (results[0].available_seats < seats)
        return res.status(400).json({ message: 'Not enough seats available' });

      db.query(
        'INSERT INTO reservations (user_id, showtime_id, seats) VALUES (?, ?, ?)',
        [user_id, showtime_id, seats],
        (err2) => {
          if (err2) return res.status(500).json({ message: 'Server error' });

          db.query(
            'UPDATE showtimes SET available_seats = available_seats - ? WHERE showtime_id = ?',
            [seats, showtime_id]
          );

          res.status(201).json({ message: 'Reservation created successfully' });
        }
      );
    }
  );
});

// Cancel reservation
router.delete('/:id', authMiddleware, (req, res) => {
  db.query(
    'SELECT * FROM reservations WHERE reservation_id = ? AND user_id = ?',
    [req.params.id, req.user.user_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(404).json({ message: 'Reservation not found' });

      const seats = results[0].seats;
      const showtime_id = results[0].showtime_id;

      db.query(
        'UPDATE reservations SET status = ? WHERE reservation_id = ?',
        ['cancelled', req.params.id],
        (err2) => {
          if (err2) return res.status(500).json({ message: 'Server error' });

          db.query(
            'UPDATE showtimes SET available_seats = available_seats + ? WHERE showtime_id = ?',
            [seats, showtime_id]
          );

          res.json({ message: 'Reservation cancelled successfully' });
        }
      );
    }
  );
});

module.exports = router;
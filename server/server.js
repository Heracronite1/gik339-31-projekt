const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./gik339.db');

const express = require('express');
const server = express();

// ===== MIDDLEWARE =====
server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });

// ===== START SERVER =====
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// ===== GET ALL GAMES =====
server.get('/games', (req, res) => {
  const sql = 'SELECT * FROM games';

  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(rows);
    }
  });
});

// ===== GET ONE GAME =====
server.get('/games/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM games WHERE id = ?';

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(row);
    }
  });
});

// ===== CREATE GAME =====
server.post('/games', (req, res) => {
  const { title, studio, genre, platform } = req.body;

  const sql =
    'INSERT INTO games (title, studio, genre, platform) VALUES (?, ?, ?, ?)';

  db.run(sql, [title, studio, genre, platform], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send({
        message: 'Game added',
        id: this.lastID
      });
    }
  });
});

// ===== UPDATE GAME =====
server.put('/games', (req, res) => {
  const { id, title, studio, genre, platform } = req.body;

  const sql =
    'UPDATE games SET title = ?, studio = ?, genre = ?, platform = ? WHERE id = ?';

  db.run(sql, [title, studio, genre, platform, id], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send({
        message: 'Game updated',
        changes: this.changes
      });
    }
  });
});

// ===== DELETE GAME =====
server.delete('/games/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM games WHERE id = ?';

  db.run(sql, [id], function (err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send({
        message: 'Game deleted',
        changes: this.changes
      });
    }
  });
});
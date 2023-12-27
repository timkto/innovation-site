// app.js
const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();
app.use(express.json());

// Open SQLite database
const dbPromise = open({
  filename: './database.sqlite',
  driver: sqlite3.Database,
});

// Initialize database
async function initializeDb() {
  const db = await dbPromise;
  await db.exec('CREATE TABLE IF NOT EXISTS data (key STRING PRIMARY KEY, json TEXT)');
}

initializeDb();

// List All (GET)
app.get('/data', async (req, res) => {
  const db = await dbPromise;
  const data = await db.all('SELECT * FROM data');
  res.send(data);
});

// Create (POST)
app.post('/data', async (req, res) => {
  const { key, payload } = req.body;
  const db = await dbPromise;
  const result = await db.run('INSERT INTO data (key, json) VALUES (?, ?)', key, JSON.stringify(req.body));
  res.status(201).send({ result });
});

// Read (GET)
app.get('/data/:key', async (req, res) => {
  const db = await dbPromise;
  const { key } = req.params;
  const data = await db.get('SELECT json FROM data WHERE key = ?', key);
  if (data) {
    res.send(JSON.parse(data.json));
  } else {
    res.status(404).send({ error: 'Data not found' });
  }
});

// Update (PUT)
app.put('/data/:key', async (req, res) => {
  const { key } = req.params;
  const { json } = req.body;
  const db = await dbPromise;
  const result = await db.run('UPDATE data SET json = ? WHERE key = ?', JSON.stringify(json), key);
  if (result.changes) {
    res.send({ message: 'Data updated successfully' });
  } else {
    res.status(404).send({ error: 'Data not found' });
  }
});

// Delete (DELETE)
app.delete('/data/:key', async (req, res) => {
  const { key } = req.params;
  const db = await dbPromise;
  const result = await db.run('DELETE FROM data WHERE key = ?', key);
  if (result.changes) {
    res.send({ message: 'Data deleted successfully' });
  } else {
    res.status(404).send({ error: 'Data not found' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

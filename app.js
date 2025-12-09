// backend/app.js — single-file server (inline model)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// DB connection (edit URI if needed)
const uri = "mongodb+srv://ibabani_db_user:WuQOZeH0TWig45ot@songdb.mcrhxoo.mongodb.net/songdb";
mongoose
  .connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Inline Mongoose model so no external file is required
const { Schema, model } = mongoose;
const SongSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    releaseDate: { type: Date },
    popularity: { type: Number, min: 0 },
    genre: { type: String, trim: true }
  },
  { timestamps: true }
);
const Song = model('Song', SongSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple health route
app.get('/', (req, res) => res.send('Server is running'));

// GET all songs (route: /songs)
app.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find({}).sort({ createdAt: -1 });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single song by id
app.get('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST create
app.post('/songs', async (req, res) => {
  try {
    const newSong = new Song(req.body);
    const saved = await newSong.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update
app.put('/songs/:id', async (req, res) => {
  try {
    const updated = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Song not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/songs/:id', async (req, res) => {
  try {
    const deleted = await Song.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Song not found' });
    res.json({ message: 'Song deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

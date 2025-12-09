// ----------------- IMPORTS -----------------
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./db'); // connects to MongoDB
const Song = require('./models/song'); // make sure the filename is song.js

// ----------------- SETUP -----------------
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----------------- ROUTES -----------------
const router = express.Router();

// GET /songs → fetch all songs
router.get("/songs", async (req, res) => {
    try {
        let query = {};
        if (req.query.genre) {
            query = { genre: req.query.genre };
        }
        const songs = await Song.find(query); // async/await
        res.json(songs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST /songs → add a new song
router.post("/songs", async (req, res) => {
    try {
        const newSong = new Song(req.body);
        const savedSong = await newSong.save();
        res.status(201).json(savedSong);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /songs/:id → update a song
router.put("/songs/:id", async (req, res) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSong);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /songs/:id → delete a song
router.delete("/songs/:id", async (req, res) => {
    try {
        await Song.findByIdAndDelete(req.params.id);
        res.json({ message: "Song deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.use("/", router);

// ----------------- START SERVER -----------------
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

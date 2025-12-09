const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    releaseDate: { type: Date },
    popularity: { type: Number, min: 0 },
    genre: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Song', SongSchema);

// backend/db.js
const mongoose = require('mongoose');

const uri = "mongodb+srv://ibabani_db_user:WuQOZeH0TWig45ot@songdb.mcrhxoo.mongodb.net/songdb";

const options = {
  // keepAlive and timeouts to avoid quick buffering timeouts
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // wait up to 30s for server selection
  connectTimeoutMS: 30000
};

mongoose.connect(uri, options)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("Full error:", err);
    process.exit(1); // stop server so you can fix connection
  });

// Optional: helpful event listeners
mongoose.connection.on('connecting', () => console.log('MongoDB connecting...'));
mongoose.connection.on('connected', () => console.log('MongoDB connected'));
mongoose.connection.on('error', err => console.error('MongoDB error event:', err));
mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));

module.exports = mongoose;

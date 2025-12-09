const mongoose = require('mongoose');

// Replace <username>, <password>, <dbname> with your MongoDB Atlas credentials
const uri = "mongodb+srv://ibabani_db_user:WuQOZeH0TWig45ot@songdb.mcrhxoo.mongodb.net/";

mongoose.connect(uri)  // Mongoose v9+ does not need extra options
    .then(() => console.log("✅ Connected to MongoDB!"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose;

// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
   attendance: [{ type: Date }],
  // Other user data fields
});

module.exports = mongoose.model('User', userSchema);

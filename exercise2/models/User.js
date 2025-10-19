const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  profilePictureURL: String,
  dob: Date,
  role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);

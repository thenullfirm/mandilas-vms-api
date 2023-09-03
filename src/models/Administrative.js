const mongoose = require('mongoose');
require('dotenv').config();

const administrativeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  loggedIn: {
    type: Boolean,
  },
});

const Administrative = mongoose.model('Administrative', administrativeSchema);

module.exports = Administrative;

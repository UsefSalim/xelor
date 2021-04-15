const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    ennum: ['User', 'Admin'],
    default: 'User',
  },
});

module.exports = model('user', userSchema);

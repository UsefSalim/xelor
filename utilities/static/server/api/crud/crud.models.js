const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const testSchema = Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = model('test', testSchema);

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ModelName = Schema({
  // name: {
  //   type: String,
  //   required: true,
  // }
});

module.exports = model('user', ModelName);

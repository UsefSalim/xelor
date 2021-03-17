const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ModelNameSchema = Schema({
  // name: {
  //   type: String,
  //   required: true,
  // }
});

module.exports = model('ModelName', ModelNameSchema);

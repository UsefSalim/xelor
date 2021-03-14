const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const SchemaName = Schema({
  // name: {
  //   type: String,
  //   required: true,
  // }
});

module.exports = model('user', SchemaName);

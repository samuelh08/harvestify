const mongoose = require('mongoose');

const client = {
  email: String,
  password: String,
  name: String,
  lastname: String,
  tel: Number,
};

module.exports = mongoose.model('client', client);

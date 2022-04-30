const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  tel: {
    type: Number,
    required: true,
  },
};

const client = new Schema(fields, {
  timestamps: true,
});

module.exports = mongoose.model('client', client);

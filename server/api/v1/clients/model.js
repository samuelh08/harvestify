const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
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

module.exports = {
  Model: mongoose.model('client', client),
  fields,
};

const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  // _id: mongoose.Schema.Types.ObjectId,  automatically added by mongoose
  name: String,
  department: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
};

const references = {
  userId: {
    type: mongoose.ObjectId,
    ref: 'producer',
    required: true,
  },
};

const location = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('location', location),
  fields,
  references,
};

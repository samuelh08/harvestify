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
    type: Schema.Types.ObjectId,
    ref: 'producer',
    required: true,
  },
};

const location = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('location', location),
  fields,
  references,
};

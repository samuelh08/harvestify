const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
};

const references = {
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'cart',
    required: true,
  },
};

const review = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('review', review),
  fields,
  references,
};

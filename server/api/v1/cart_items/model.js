const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  quantity: {
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
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
};

const client = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('client', client),
  fields,
  references,
};

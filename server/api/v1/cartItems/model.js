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
    type: mongoose.ObjectId,
    ref: 'product',
    required: true,
  },
};

const cartItem = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('cartItem', cartItem),
  fields,
  references,
};

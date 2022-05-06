const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  adress: {
    type: String,
    required: true,
    trim: true,
  },
  delivery_price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
};

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'client',
    required: true,
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: 'payment',
    required: true,
  },
};

const cart = new Schema(fields, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

const virtuals = {
  cartItems: {
    ref: 'cartItem',
    localField: '_id',
    foreignField: 'cartId',
  },
};

cart.virtual('cartItems', virtuals.cartItems);

module.exports = {
  Model: mongoose.model('cart', cart),
  fields,
  references,
  virtuals,
};

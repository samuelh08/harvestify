const mongoose = require('mongoose');
const { body } = require('express-validator');

const { Schema } = mongoose;

const fields = {
  address: {
    type: String,
    required: true,
    trim: true,
  },
  deliveryPrice: {
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
  review: {
    ref: 'review',
    localField: '_id',
    foreignField: 'reviewId',
  },
};

cart.virtual('cartItems', virtuals.cartItems);
cart.virtual('review', virtuals.review);

const sanitizers = [body('adress').escape()];

module.exports = {
  Model: mongoose.model('cart', cart),
  fields,
  references,
  virtuals,
  sanitizers,
};

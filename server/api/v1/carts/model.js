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
    type: mongoose.ObjectId,
    ref: 'client',
    required: true,
  },
};

const cart = new Schema(Object.assign(fields, references), {
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
  cartItemsCount: {
    ref: 'cartItem',
    localField: '_id',
    foreignField: 'cartId',
    count: true,
  },
  review: {
    ref: 'review',
    localField: '_id',
    foreignField: 'cartId',
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

const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  quantity: {
    // quantity of product in stock
    type: Number,
    required: true,
  },
  unit: {
    // unit of product [kg, liter, piece, etc]
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  }, // name of product
  picture: {
    type: String,
    required: true,
    trim: true,
  }, // picture of product
  category: {
    type: String,
    required: true,
    trim: true,
  }, // category of product [vegetable, fruit, etc]
  price: {
    type: Number,
    required: true,
  }, // price of product by unit
};

const references = {
  userId: {
    type: mongoose.ObjectId,
    ref: 'producer',
    required: true,
  },
};

const product = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('product', product),
  fields,
  references,
};

const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  quantity: {
    // quantity of product in stock
    type: String,
    required: true,
    trim: true,
  },
  unit: {
    // unit of product [kg, liter, piece, etc]
    type: String,
    required: true,
    trim: true,
  },
  name: { String, required: true }, // name of product
  picture: { String, required: true }, // picture of product
  category: { String, required: true }, // category of product [vegetable, fruit, etc]
  price: { Number, required: true }, // price of product by unit
};

const references = {
  producerId: {
    type: Schema.Types.ObjectId,
    ref: 'producer',
    required: true,
  },
};

module.exports = mongoose.model('product', product);

const product = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('product', product),
  fields,
  references,
};

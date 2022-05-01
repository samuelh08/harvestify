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
  clientId: {
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

const client = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('client', client),
  fields,
  references,
};

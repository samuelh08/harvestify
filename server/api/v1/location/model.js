const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  // _id: mongoose.Schema.Types.ObjectId,  automatically added by mongoose
  name: String,
  department: { String, required: true },
  city: { String, required: true },
  address: { String, required: true },
};

const references = {
  producerId: {
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

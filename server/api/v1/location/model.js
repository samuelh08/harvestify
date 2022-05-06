const mongoose = require('mongoose');

const location = {
  // _id: mongoose.Schema.Types.ObjectId,  automatically added by mongoose
  producer_Id: {
    String: mongoose.Schema.Types.ObjectId,
    ref: 'producer',
    required: true,
  },
  name: String,
  department: { String, required: true },
  city: { String, required: true },
  address: { String, required: true },
};

module.exports = mongoose.model('location', location);

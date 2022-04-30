const mongoose = require('mongoose');

const location = {
  // _id: mongoose.Schema.Types.ObjectId,  automatically added by mongoose
  producer_Id: mongoose.Schema.Types.ObjectId,
  name: String,
  department: { String, required: true },
  city: { String, required: true },
  address: { String, required: true },
};

module.exports = mongoose.model('location', location);

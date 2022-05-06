const mongoose = require('mongoose');

const product = {
  // _id: mongoose.Schema.Types.ObjectId,  automatically added by mongoose
  producer_Id: {
    // eslint-disable-next-line
    String: mongoose.Schema.Types.ObjectId,
    ref: 'producer',
    required: true,
  },
  name: { String, required: true },
  picture: { String, required: true },
  category: { String, required: true },
  price: { Number, required: true },
};

module.exports = mongoose.model('product', product);

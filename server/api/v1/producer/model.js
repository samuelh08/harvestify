const mongoose = require('mongoose');

const producer = {
  email: String,
  password: String,
  name: String,
  products: [
    {
      name: String,
      description: String,
      price: Number,
      image: String,
    },
  ],
  bankAccount: {
    bank: String,
    account: String,
    accountHolder: String,
  },
  picture: String,
  bio: String,
};

module.exports = mongoose.model('producer', producer);

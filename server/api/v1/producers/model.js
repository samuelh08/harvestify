const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');
// import mongoose and bcryptjs
const { Schema } = mongoose; //
// import Schema from mongoose
// fields is an object with the following properties:
const fields = {
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  tel: {
    type: Number,
    required: true,
  },
};
// create a schema (fields object and options object)
const producer = new Schema(fields, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

// create a model
producer
  .virtual('name')
  .get(function getName() {
    return `${this.firstname} ${this.lastname}`;
  })
  .set(function setName(name) {
    const [firstname = '', lastname = ''] = name.split(' ');
    this.firstname = firstname;
    this.lastname = lastname;
  });

const virtuals = {
  products: {
    ref: 'product',
    localField: '_id',
    foreignField: 'productId',
  },
};

cart.virtual('products', virtuals.products);

const hiddenFields = ['password'];

// hide the password field
producer.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  hiddenFields.forEach((field) => {
    if (Object.hasOwnProperty.call(doc, field)) {
      delete doc[field];
    }
  });
  return doc;
};

// hash the password before saving if user is new
producer.pre('save', async function save(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

// compare the password before login
producer.methods.verifyPassword = function verifyPassword(password) {
  return compare(password, this.password);
};

// export the model
module.exports = {
  Model: mongoose.model('producer', producer),
  fields,
  virtuals,
};

const mongoose = require('mongoose');

const { Schema } = mongoose;

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

const client = new Schema(fields, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

client
  .virtual('name')
  .get(function getName() {
    return `${this.firstname} ${this.lastname}`;
  })
  .set(function setName(name) {
    const [firstname = '', lastname = ''] = name.split(' ');
    this.firstname = firstname;
    this.lastname = lastname;
  });

const hiddenFields = ['password'];

client.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  hiddenFields.forEach((field) => {
    if (Object.hasOwnProperty.call(doc, field)) {
      delete doc[field];
    }
  });
  return doc;
};

module.exports = {
  Model: mongoose.model('client', client),
  fields,
};

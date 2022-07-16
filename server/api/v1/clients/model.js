const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');
const validator = require('validator');
const { body } = require('express-validator');

const { Schema } = mongoose;

const fields = {
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
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
    type: String,
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

client.pre('save', async function save(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

client.methods.verifyPassword = function verifyPassword(password) {
  return compare(password, this.password);
};

const sanitizers = [body('email').isEmail().normalizeEmail()];

module.exports = {
  Model: mongoose.model('client', client),
  fields,
  sanitizers,
};

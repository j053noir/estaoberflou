const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');

const { Schema } = mongoose;

const fields = {
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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: props => `${props.value} is not a valid email.`,
    },
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
};

const user = new Schema(fields, {
  timestamps: true,
});

const blacklistFields = ['password'];

user.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  blacklistFields.forEach(field => {
    if (Object.hasOwnProperty.call(doc, fields)) {
      delete doc[field];
    }
  });
  return doc;
};

user.pre('save', function save(next) {
  if (this.isNew || this.isModified('password')) {
    hash(this.password, 10).then(hashText => {
      this.password = hashText;
      next();
    });
  } else {
    next();
  }
});

module.exports = {
  Model: mongoose.model('user', user),
  fields,
};

user.methods.verifyPassword = function verifyPassword(password) {
  return compare(password, this.password);
};

module.exports = {
  Model: mongoose.model('user', user),
  fields,
};

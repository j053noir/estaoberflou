const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  nombre: {
    type: String,
    default: '',
    trim: true,
  },
  apellido: {
    type: String,
    default: '',
    required: true,
  },
  activo: {
    type: String,
    default: '0',
  },
};

const user = new Schema(fields, {
  timestamps: true,
});
module.exports = mongoose.model('user', user);

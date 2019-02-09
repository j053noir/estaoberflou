const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  description: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
};

const references = {
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
};

const task = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

module.exports = {
  ModelTask: mongoose.model('task', task),
  fields,
  references,
};

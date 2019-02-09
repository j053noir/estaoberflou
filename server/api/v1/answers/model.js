const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
  text: {
    type: String,
    required: true,
    trim: true,
  },
};

const references = {
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'question',
    required: true,
  },
};

const answer = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

module.exports = {
  answer: mongoose.model('answer', answer),
  fields,
  references,
};

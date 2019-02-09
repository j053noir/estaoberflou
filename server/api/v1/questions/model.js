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
  // answers: {
  //   tyoe: Schema.Types.ObjectId,
  //   ref: 'answer',
  // }
};

const question = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

module.exports = {
  question: mongoose.model('question', question),
  fields,
  references,
};

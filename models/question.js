'use strict';

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    word: { type: String },
    answer: { type: String },
    m: {type: Number, default: 1},
    next: Number
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, result) {
        delete result._id;
        delete result.__v;
      },
    },
  }
);

module.exports = mongoose.model('Question', questionSchema);

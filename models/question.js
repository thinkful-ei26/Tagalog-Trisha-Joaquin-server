'use strict';

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    word: { type: String,/*  required: true */ },
    answer: { type: String, /* required: true */ },
    m: {type: Number, default: 1},
    next: Number
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, result) {
        delete result._id;
        delete result.__v;
        delete result.password;
      },
    },
  }
);

module.exports = mongoose.model('Question', questionSchema);

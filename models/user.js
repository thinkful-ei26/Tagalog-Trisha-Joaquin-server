'use strict';

//each user should have preloaded question

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Question = require('./question');

const UserSchema = new mongoose.Schema({
  name : { 
    type : String, 
    default: '',
    required: true, 
  },
  username : { 
    type : String, 
    required: true, 
    unique: true 
  },
  password : { 
    type : String, 
    required : true 
  }, 
  questionData: [ Question.schema ],
  head: {
    type: Number,
    default: 0
  }
});

// _id still exists but just replacing user.id on virtualize whenever you toJSON something
UserSchema.set('toJSON', {
  virtuals: true, 
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password; //delete plaintext password so it doesn't come back in the response
  }
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username,
    name: this.name || '',
    id: this._id,
    words: this.words,
    head: this.head,

  };
};

UserSchema.methods.validatePassword = function (incomingPassword) {
  return bcrypt.compare(incomingPassword, this.password);
};

UserSchema.statics.hashPassword = function (incomingPassword) {
  const digest = bcrypt.hash(incomingPassword, 10);
  return digest;
};

UserSchema.methods.generateQuestions = function userGenerateQuestions() {
  //if there's questions already in questionData in the user collection, resolve the promise
  if (this.questionData.length > 0) {
    return Promise.resolve(this);
  }

  //otherwise, generate questions from seeded question db
  return Question.find().then( questions => {
    this.questionData = questions;
    return this.save();
  });
};

module.exports = mongoose.model('User', UserSchema);
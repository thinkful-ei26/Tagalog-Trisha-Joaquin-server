'use strict';

const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

const User = require('../models/user');
const Question = require('../models/question');
const { users, questions } = require('../db/data');

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose.connect(DATABASE_URL, { useNewUrlParser:true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => { 
    console.info('Delete Data');
    return Promise.all([
      User.deleteMany(),
      Question.deleteMany()
    ]);
  })
  .then(() => {
    console.info('Seeding Database');
    return Promise.all([
      User.insertMany(users),
      Question.insertMany(questions)
    ]);
  })
  .then(results => {
    console.info(`Inserted ${results.length} Users`);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err);
  });
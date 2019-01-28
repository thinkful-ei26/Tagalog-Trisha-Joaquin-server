'use strict';

const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

const User = require('../models/user');
const { users } = require('../db/data');

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose.connect(DATABASE_URL, { useNewUrlParser:true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => User.insertMany(users))
  .then(results => {
    console.info(`Inserted ${results.length} Users`);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err);
  });
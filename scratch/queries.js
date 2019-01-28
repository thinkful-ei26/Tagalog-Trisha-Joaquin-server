'use strict';

const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

const User = require('../models/user');
const { users } = require('../db/data');

mongoose.connect(DATABASE_URL, { useNewUrlParser:true })
  .then(() => {
    // const searchTerm = 'lady gaga';
    // let filter = {};

    // if (searchTerm) {
    //   filter.title = { $regex: searchTerm, $options: 'i' };
    // }

    return User.find().sort({ updatedAt: 'desc' });
  })
  .then(results => {
    console.log(results);
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });
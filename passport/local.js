'use strict';

const { Strategy : LocalStrategy } = require('passport-local');
const User = require('../models/user');

//define your 'basicStrategy': how your credentials are validated
const localStrategy = new LocalStrategy((username, password, done) => {
  let user;

  User.findOne({ username })
    .then( results => {
      user = results;

      //if the user does not exist in db, then reject promise
      if(!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username',
          location: 'username'
        });
      }

      //using passport-local, validate the password provided
      return user.validatePassword(password);
    }) //once the password is validated:
    .then( isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect password',
          location: 'password'
        });
      }
      //if no issues, then call done() and return user
      // next() is not avaible in passport so we call done()
      return done(null, user);
    })
    .catch( err => {
      if (err.reason === 'LoginError') {
        return done(null, false);
      }
      // again, we call done(err) instead of next(err) b/c of passport
      return done(err);
    });
});

module.exports = localStrategy;
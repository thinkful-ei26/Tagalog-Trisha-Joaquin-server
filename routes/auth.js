'use strict';

const express = require('express');
const passport = require('passport');
const jwt= require('jsonwebtoken');

//make sure you add JWT_SECRET & EXPIRY on config, install dotenv, and create a .env file
const { JWT_SECRET, JWT_EXPIRY } = require('../config');
const router = express.Router();
const options = { session: false, failWithError: true };
const localAuth = passport.authenticate('local', options);

//jwt.sign() invokes the User schema toJSON() which removes the password and __v from payload
const createAuthToken = (user) => {
  return jwt.sign( { user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
    // algorithm: 'HS256'
  });
};

/* POST on /api/login and send jwt authToken as response*/
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  //on login, generate questions req.user.userGenerateQuestions()
  res.json({ authToken });
});

//Protect endpoints using JWT Strategy 
const jwtAuth = passport.authenticate('jwt', options);

//refresh token on /api/refresh/
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = router;
'use strict';

const express = require('express');
const passport = require('passport');

const User = require('../models/user');
const router = express.Router();

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });
router.use(jwtAuth);

router
  .route('/')

  .get((req, res, next) => {
    User.findById(req.user.id)
      .then((user) => {
        const { word, id } = user.questionData[0].question; //the index needs to dynamically change 
        // { question: { word, id}}
        res.json({ question: { word, id}});
      })
      .catch(next);
  })
  .post((req, res, next) => {
    
    console.log('REQBODY',req.body);
    console.log(req.user.id);
    
    User.findById(req.user.id)
      .then(result => {
        console.log(result.questionData[0].question);
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(next);
  });

module.exports = router;

//get the answer, change the next pointer, based on the response send a feedback 

// /api/question should render a 
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
    const { question, answer } = req.body;
    console.log('req.body',req.body);

    // if (!question || !question.id) {
    //   const err = new Error('`question.id` required in request body');
    //   err.code = 400;
    //   throw err;
    // }

    // if (!answer) {
    //   const err = new Error('`answer` required');
    //   err.code = 400;
    //   throw err;
    // }
    
    // let correct;
    // let currentQuestion;

    User.findById(req.user.id)
      .then(result => {
        //currentQuestion = result.questionData[0].question;
        // console.log('currentQuestion',currentQuestion);
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(next);
  });

module.exports = router;

//get the answer, change the next pointer, based on the response send a feedback 

// /api/question should render a 
/* 
 { "questionData": [
        {
            "_id": "5c51e50889dd45ea88d9f7eb",
            "question": {
                "word": "saya",
                "answer": "happy",
                "id": "5c50ac2fb7ae31aa49dcf335"
            }
        }
        ]
 }

*/
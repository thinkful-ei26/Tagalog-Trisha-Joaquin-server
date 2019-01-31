'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');
const Question = require('../models/question');
const router = express.Router();

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });
router.use(jwtAuth);

let currentHead = 0;

router
  .get( '/', (req, res, next) => {
    User.findById(req.user.id)
      .then((user) => {
        //on click of the next button, change the currentQUestion
        const { word, answer, id } = user.questionData[user.head];  //head is defaulted to zero
        // { question: { word, id}}
        //res.json(user);
        res.json({word, answer, id, head: user.head }); 
        //after confirming the answer matches on the client side, do a put request to change the m, we need the question id to be able to find the question id on the server
    
      })
      .catch(err => next(err));
  });

// router
//   .get( '/next', (req, res, next) => {
//     User.findById(req.user.id)
//       .then((user) => {
//         const { word, answer, id } = user.questionData[user.head+1]; 
//         user.head++;
//         res.json({word, answer, id, head: user.head }); 
//         //after confirming the answer matches on the client side, do a put request to change the m, we need the question id to be able to find the question id on the server
    
//       })
//       .catch(err => next(err));
//   });

// /* ========== PUT/UPDATE A SINGLE ITEM ========== */
// router
//   .put('/next',(req, res, next) => {
//     //const { id } = req.params;
//     // const { name } = req.body;
//     //const userId = req.user.id;
    
//     User.findById()
//       .then(result => {
//         res.json(result);
//       })
//       .catch(err => {
//         next(err);
//       });
//     // } 
//   });

// /* ========== PUT/UPDATE A SINGLE ITEM ========== */
router
  .put('/:userid',(req, res, next) => {
    const { userid } = req.params;

    let changeQ = {
      head: currentHead+1
    };

    //if the answer is correct: 
    //if( userinput === answer ){
    User.findOneAndUpdate(userid, changeQ, { new: true})
      .then(result => {
        //res.json(changeM);
        res.json(result.questionData[currentHead]);
      })
      .then(result => {
        return currentHead++;
      })
      .catch(err => {
        next(err);
      });
    // } 
  });

module.exports = router;
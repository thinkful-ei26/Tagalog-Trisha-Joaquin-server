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
    //console.log('REQBODY',req.body);
    //const { word, id } = req.body;
    //const userId = req.user.id;

    // /***** Never trust users - validate input *****/
    // if (!mongoose.Types.ObjectId.isValid(userid)) {
    //   const err = new Error('The `id` is not valid');
    //   err.status = 400;
    //   return next(err);
    // }

    // if (!word) {
    //   const err = new Error('Missing `word` in request body');
    //   err.status = 400;
    //   return next(err);
    // }

    // if (!id && !mongoose.Types.ObjectId.isValid(id)) {
    //   const err = new Error('Missing question `id` in request body');
    //   err.status = 400;
    //   return next(err);
    // }

    // if (!answer) {
    //   const err = new Error('Missing `answer` in request body');
    //   err.status = 400;
    //   return next(err);
    // }

    // if (!userinput) {
    //   const err = new Error('Missing `userinput` in request body');
    //   err.status = 400;
    //   return next(err);
    // }

    let changeQ = {
      head: currentHead+1
    };

    //if the answer is correct: 
    //if( userinput === answer ){
    User.findOneAndUpdate(userid, changeQ, { new: true})
      .then(result => {
        //res.json(changeM);
        res.json(result);
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
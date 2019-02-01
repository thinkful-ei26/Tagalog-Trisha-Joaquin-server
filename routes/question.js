'use strict';

const express = require('express');
//const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');
//const Question = require('../models/question');
const router = express.Router();

const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true
});
router.use(jwtAuth);

router.get('/', (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      // let currentHead = 0;

      const { head } = user;
      //on click of the next button, change the currentQUestion
      //console.log('user', user);
      const { word, answer, id } = user.questionData[head]; //head is defaulted to zero
      // { question: { word, id}}
      //res.json(user);
      console.log('currentHead: ', head);
      res.json({ word, answer, id, head: head });
      //after confirming the answer matches on the client side, do a put request to change the m, we need the question id to be able to find the question id on the server
    })
    .catch(err => next(err));
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:userid', (req, res, next) => {
  const { userid } = req.params;
  const { word, answer, id, head, userinput } = req.body.answer;
  console.log('REQ.BODY PUT: ', req.body.answer);

  User.findById(userid)
    .then(user => {
      //console.log('reqbody.head: ',head);
      //console.log('USER PUT:', user.questionData[head]);

      //save the value of the current head
      let currentHead = user.head;
      //console.log('current Head is',currentHead);

      // save the node that you just answered
      let currentNode = user.questionData[head];
      //console.log('current node is', currentNode);

      //if answer is correct
      if (userinput === user.questionData[head].answer) {
        //console.log('ANSWER IS CORRECT', user.questionData[head]);
        //change the mValue
        user.questionData[head].m *= 2;
        //change the totalCorrect of the user
      } else {
        //console.log('ANSWER IS INCORRECT', user.questionData[head]);
        //change the mValue
        user.questionData[head].m = 1;
        //change the totalCorrect of the user
      }

      /* ====== NEXT QUESTION LINKED LIST MANIPULATION ==== */
      //find the location of the answered node based on mValue
      let newLocation = currentNode.m;
      //console.log('NEW LOCATION IS', newLocation); // if incorrect = 1, correct *2

      //change the current head to whoever answered node's next pointer is addressed to
      user.head = currentNode.next > 0 ? currentNode.next : 0;
      //console.log('NEW HEAD IS', user.head); //based on .next value = 2 for 'saya'

      let current = currentNode;
      let counter = 0;
      //find the new insertion point on questionData array
      // newLocation = 4; counter: 0
      while (counter < newLocation && counter < user.questionData.length - 1) {
        current = user.questionData[current.next];
        counter++;
      }

      //console.log('NEW NODE AFTER WHILE', current);
      //node is now where we want our currentNode to be inserted

      //console.log('PREVIOUS ANSWERED NODE:',user.questionData[currentHead]);
      //console.log('current.next',current.next);
      user.questionData[currentHead].next = current.next;
      current.next = currentHead;

      //save all the updates we just made to user.head and user.words:

      console.log('updated user: ', user);
      console.log('new head', user.head);
      console.log('reqbody previous head: ', head);
      // return res.json(user);
      return User.findByIdAndUpdate(
        userid,
        { head: user.head, questionData: [...user.questionData] },
        { new: true }
      ); //need to update questionData
    })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = router;

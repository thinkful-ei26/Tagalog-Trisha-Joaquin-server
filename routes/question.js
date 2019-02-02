'use strict';

const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true
});
router.use(jwtAuth);

router.get('/', (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      const { head } = user;
      //on click of the next button, change the currentQuestion
      //console.log('user', user);
      const { word, answer, id } = user.questionData[head]; //head is defaulted to zero
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
      //console.log('reqbody.head: ',head); // 0
      // console.log('USER PUT:', user.questionData[head]); // next = 1, word = sandali, head = 0

      //save the value of the current head
      let currentHead = user.head;
      //console.log('current Head is',currentHead); //currentHead is a tempHead = 0;

      //save the node that you just answered
      let currentNode = user.questionData[head];
      //console.log('current node is', currentNode);

      //if answer is correct
      if (userinput === user.questionData[head].answer) {
        // console.log('correct answer: CURRENT QUESTION in if statement:', user.questionData[head]);
        //change the mValue
        user.questionData[head].m *= 2;
        //user.questionData[head].next = 0;
        console.log('change current m value if answer is correct: ',user.questionData[head]);
        //change the totalCorrect of the user
      } else {
        console.log('INCORRECT answer: current QUESTION in if statement', user.questionData[head]);
        //change the mValue
        user.questionData[head].m = 1;
        //change the totalCorrect of the user
        console.log('change current m value to ONE if incorrect: ',user.questionData[head].m);
      }

      /* ====== NEXT QUESTION LINKED LIST MANIPULATION ==== */
      //find the location of the answered node based on mValue
      let newLocation = currentNode.m;
      console.log('NEW LOCATION IS', newLocation); // if incorrect = 1, correct *2

      //change the current head to whoever answered node's next pointer is addressed to
      user.head = currentNode.next > 0 ? currentNode.next : 0;
      console.log('NEW HEAD IS', user.head); //based on .next value = 2 for 'saya'

      let current = currentNode;
      let counter = 0;
      //find the new insertion point on questionData array
      // newLocation = 4; counter: 0
      while (counter < newLocation && counter < user.questionData.length - 1) {
        current = user.questionData[current.next];
        counter++;
      }

      console.log('new node resulting from while loop: ', current);
      //node is now where we want our currentNode to be inserted

      //console.log('previous answered node:',user.questionData[currentHead]);
      //console.log('current.next',current.next);
      console.log('87 before: ',user.questionData[currentHead]);
      user.questionData[currentHead].next = current.next;
      console.log('87 after: ',user.questionData[currentHead]);
      current.next = currentHead;

      //save all the updates we just made to user.head and user.words:

      // console.log('updated user: ', user);
      // console.log('new head', user.head);
      // console.log('reqbody previous head: ', head);
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

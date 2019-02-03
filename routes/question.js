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
      const { head, counter } = user;
      //on click of the next button, change the currentQuestion
      //console.log('user', user);
      const { word, answer, id } = user.questionData[head]; //head is defaulted to zero
      //console.log('user get: ', user);
      res.json({ counter, word, answer, id, head: head });
      //after confirming the answer matches on the client side, do a put request to change the m, we need the question id to be able to find the question id on the server
    })
    .catch(err => next(err));
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:userid', (req, res, next) => {
  const { userid } = req.params;
  const { head, userinput } = req.body.answer;
 
  User.findById(userid)
    .then(user => {
   
      //save the value of the current head
      let currentHead = user.head;
   
      //save the node that you just answered
      let currentNode = user.questionData[head];
      //console.log('current node is', currentNode);

      //if answer is correct
      if (userinput === user.questionData[head].answer) {
        //double the mValue if answer is correct
        user.questionData[head].m *= 2;
      } else { // if incorrect, change current m value to ONE 
        user.questionData[head].m = 1;
        //change the totalCorrect of the user questions for progress bar
      }

      /* ========= NEXT QUESTION LINKED LIST ========= */

      //find the location of the answered node based on mValue
      let newLocation = currentNode.m;
      
      //set the current head to the answered node's next pointer
      user.head = currentNode.next > 0 ? currentNode.next : 0;
      
      let current = currentNode;
      let nodeCounter = 0;
      //find the currentNode's new insertion point on questionData linkedlist
      while (nodeCounter < newLocation && nodeCounter < user.questionData.length - 1) {
        current = user.questionData[current.next];
        nodeCounter++;
      }

      //node is now where we want our currentNode to be inserted
      // console.log('updated node resulting from while loop: ', current);
     
      //update the next on the previous question & the current question by swapping the current node's next with the currentHead's next (held in a temp var)
      user.questionData[currentHead].next = current.next;
      current.next = currentHead;

      //save all the updates we just made to user.head and user.words:
      return User.findByIdAndUpdate(
        userid,
        { 
          head: user.head, 
          questionData: [...user.questionData],
          counter: user.counter +1
        },
        { new: true }
      ); //need to update questionData
    })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = router;

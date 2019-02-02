User.save()
//CHANGE M

- on the put endpoint capture a single user in a var (using findOne or findById)
The put gets fired from the client, by the action 'fetchNextQuestion'. This action is fired from the component 'card' on the client, when the user clicks the 'next' button.

- fetchNextQuestion makes a put call to the endpoint '/routes/question/:id', which gets routed to questionsRouter, where the following logic gets applied. The route handler queries the database for the user (findOne or findById)  then opens up a promise chain and inside a '.then()' it manipulates the M value of the question, depending on the whether the asnwer is correct or not.

Here is an example:
router.put('/current', (req, res) => {
  console.log(req.user)

  const userId = req.user.id;
  let correctAnswer = '';
  let answeredCorrectly = false; 

  User.findOne({_id:userId})
    .then(user => {
      // console.log('user:', user)
      const current = user.questions[user.head];
      correctAnswer = current.answer;

      if (current.answer === req.body.answer){
        answeredCorrectly = true;
        current.score += 1;
      }

      user.head = user.head + 1;
      console.log('user:', user)
      return user.save();
        
    })
    .then(() => res.json({answeredCorrectly, correctAnswer}))
})

- manipulate user data (M value and head) Use if(wrong or right)/else conditionals

- currentQIndex = user.head //

- currentQ = user.questions[currentQindex] //save the current node (current question)

- if(userAnswer ==== CurrentQ.answer)

- currectQ.mValue \*=2

- else currectQ.mValue =1

- user.head = currentQ.next;

Tauhida ParveenTauhida Parveen9:54 AM
//CHANGE HEAD

- let temp = currectQ //Save current head to a var

- for(i=0; < temp.MVal, i++) //To find the new location for the current node(user.head)

- const tempIndex = temp.next; //create a var to point to the next node in the sequence

- temp = currectQ[tempIndex] // What is this doing? define temp as

- currectQ.next = temp.next

temp.next = currectQIndex

user.save()

'use strict';

const express = require('express');
<<<<<<< HEAD
const cors = require('cors');
const bodyParser = require('body-parser');
=======
>>>>>>> 85afe4edec1d4eb0af51a5952b4131a11a4027e7
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const cors = require('cors');

// const User = require('./models/user');
// const { users } = require('./db/data');

const usersRouter = require('./routes/users');

const { PORT, CLIENT_ORIGIN, DATABASE_URL } = require('./config');
//const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

<<<<<<< HEAD

app.get('/', (req, res) => {
  return res.json({ message: 'Success' });
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
=======
// Create a static webserver
app.use(express.static('public'));

// Parse request body
app.use(express.json());

// Mount routers
// app.get('/users', (req, res, next) => {
//   User.find()
//     .then(results => {
//       res.json(results);
//     })
//     .catch(
//       err => next(err)
//     );
// });

app.use('/api/users', usersRouter);


//mount localStrategy, jwtStrategy

// Custom 404 Not Found route handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error first handler
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log(err.name === 'FakeError' ? '' : err);
  }
});

// function runServer(port = PORT) {
//   const server = app
//     .listen(port, () => {
//       console.info(`App listening on port ${server.address().port}`);
//     })
//     .on('error', err => {
//       console.error('Express failed to start');
//       console.error(err);
//     });
// }

// if (require.main === module) {
//   dbConnect();
//   runServer();
// }

// Listen for incoming connections
if (require.main === module) {
  // Connect to DB and Listen for incoming connections
  mongoose.connect(DATABASE_URL)
    .then(instance => {
      const conn = instance.connections[0];
      console.info(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`);
>>>>>>> 85afe4edec1d4eb0af51a5952b4131a11a4027e7
    })
    .catch(err => {
      console.error(err);
    });

  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

module.exports = { app };

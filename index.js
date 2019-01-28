'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const cors = require('cors');

const passport = require('passport');
const localStrategy = require('./passport/local');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

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

// Create a static webserver
app.use(express.static('public'));

// Parse request body
app.use(express.json());

// Mount routers
app.use('/api/users', usersRouter);
app.use('/api/login', authRouter);
app.use('/api/refresh', authRouter);

//mount localStrategy, jwtStrategy
passport.use(localStrategy);
//passport.use(jwtStrategy);

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

'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');
const { PORT, CLIENT_ORIGIN, DATABASE_URL } = require('./config');
const { dbConnect } = require('./db-mongoose');
const { error404, error500 } = require('./error-middleware');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const questionRouter = require('./routes/question');

// Create an Express application
const app = express();

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('autoIndex', false);

//mount localStrategy, jwtStrategy
passport.use(localStrategy);
passport.use(jwtStrategy);

// Log all requests. Skip logging during
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

//allow cross origin communication b/w front-end & backend
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
app.use('/api/auth/', authRouter); //login & refresh
app.use('/api/question', questionRouter);

app.use(error404);
app.use(error500);

// // Listen for incoming connections
// if (require.main === module) {
//   // Connect to DB and Listen for incoming connections
//   mongoose.connect(DATABASE_URL)
//     .then(instance => {
//       const conn = instance.connections[0];
//       console.info(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`);
//     })
//     .catch(err => {
//       console.error(err);
//     });

//   app.listen(PORT, function () {
//     console.info(`Server listening on ${this.address().port}`);
//   }).on('error', err => {
//     console.error(err);
//   });
// }

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };

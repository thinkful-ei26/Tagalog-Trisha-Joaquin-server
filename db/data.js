// 'use strict';
// // seed data for multiple users

// const users = [
//   {
//     _id: '000000000000000000000001',
//     name: 'Trisha',
//     username: 'kronicle114',
//     // hash for "password"
//     password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi'
//   },
//   {
//     _id: '000000000000000000000002',
//     name: 'Joaquin',
//     username: 'joaquinfox',
//     // hash for "password"
//     password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi'
//   }
// ];

// const questions = [
//   {
//     word: 'saya', 
//     answer: 'happy'
//   },
//   {
//     word: 'tawa', 
//     answer: 'laughing'
//   },
//   {
//     word: 'kamusta', 
//     answer: 'How are you?'
//   },
// ];

// module.exports = { users, questions };

'use strict';
// seed data for multiple users
const questions = [
  {
    word: 'saya', 
    answer: 'happy'
  },
  {
    word: 'tawa', 
    answer: 'laughing'
  },
  {
    word: 'kamusta', 
    answer: 'How are you?'
  },
  {
    word: 'mahal', 
    answer: 'love'
  },
  {
    word: 'hindi', 
    answer: 'no'
  },
  {
    word: 'mahirap', 
    answer: 'tough'
  },
  {
    word: 'sarap', 
    answer: 'delicious'
  },
  {
    word: 'sandali', 
    answer: 'wait'
  },
  {
    word: 'malungkot', 
    answer: 'sad'
  },
  {
    word: 'umaga', 
    answer: 'morning'
  },
  {
    word: 'gabi', 
    answer: 'night'
  },
];

const users = [
  {
    _id: '000000000000000000000001',
    name: 'Trisha',
    username: 'kronicle114',
    // hash for "password"
    password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi',
    questionData: questions,
    head: 1
  },
  {
    _id: '000000000000000000000002',
    name: 'Joaquin',
    username: 'joaquinfox',
    // hash for "password"
    password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi',
    questionData: questions,
    head: 2
  }
];

module.exports = { users };

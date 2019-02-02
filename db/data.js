'use strict';

// seed data for multiple users
const questions = [
  {
    word: 'saya', 
    answer: 'happy',
    m: 1,
    next: 1
  },
  {
    word: 'tawa', 
    answer: 'laughing',
    m: 1,
    next: 2
  },
  {
    word: 'kamusta', 
    answer: 'How are you?',
    m: 1,
    next: 3
  },
  {
    word: 'mahal', 
    answer: 'love',
    m: 1,
    next: 4
  },
  {
    word: 'hindi', 
    answer: 'no',
    m: 1,
    next: 5
  },
  {
    word: 'mahirap', 
    answer: 'tough',
    m: 1,
    next: 6
  },
  {
    word: 'sarap', 
    answer: 'delicious',
    m: 1,
    next: 7
  },
  {
    word: 'sandali', 
    answer: 'wait',
    m: 1,
    next: 8
  },
  {
    word: 'malungkot', 
    answer: 'sad',
    m: 1,
    next: 9
  },
  {
    word: 'umaga', 
    answer: 'morning',
    m: 1,
    next: 10
  },
  {
    word: 'gabi', 
    answer: 'night',
    m: 1,
    next: 0
  },
];

const users = [
  {
    _id: '000000000000000000000001',
    name: 'Trisha',
    username: 'kronicle114',
    // hash for "password123"
    password: '$2a$10$Wz21bpsMCBBRdRztr2.ZYOw9sJGkFgcowKZCMtvaqdBuhvofmZHRe',
    questionData: questions,
    head: 1
  },
  {
    _id: '000000000000000000000002',
    name: 'Joaquin',
    username: 'joaquinfox',
    // hash for "password123"
    password: '$2a$10$Wz21bpsMCBBRdRztr2.ZYOw9sJGkFgcowKZCMtvaqdBuhvofmZHRe',
    questionData: questions,
    head: 2
  }
];

module.exports = { users, questions };

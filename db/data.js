'use strict';
// seed data for multiple users
// User #1 = "Ms Green" is related to odd number _id
// User #2 = "Mr Yellow" is related to odd number _id

const users = [
  {
    _id: '000000000000000000000001',
    firstname: 'Trisha',
    lastname: 'Aguinaldo',
    username: 'kronicle114',
    // hash for "password"
    password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi'
  },
  {
    _id: '000000000000000000000002',
    firstname: 'Joaquin',
    lastname: 'Fox',
    username: 'joaquinfox',
    // hash for "password"
    password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi'
  }
];

module.exports = { users };
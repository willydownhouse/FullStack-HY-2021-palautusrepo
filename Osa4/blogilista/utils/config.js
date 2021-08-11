require('dotenv').config();

let PORT = process.env.PORT;
let DB_CONNECTION =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DB_CONNECTION
    : process.env.DB_CONNECTION;

module.exports = {
  DB_CONNECTION,
  PORT,
};

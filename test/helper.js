'use strict';
const dotenv = require('dotenv');

dotenv.config();

const {runServer, closeServer} = require('../server');

before(function() {
  return runServer(process.env.TEST_PORT)
});

after(function() {
    return closeServer();
});
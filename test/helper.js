'use strict';
const dotenv = require('dotenv');

dotenv.config();

const {runServer, closeServer} = require('../server');

// Before and After Test Functions

before(function() {
  return runServer(process.env.TEST_PORT)
});

after(function() {
    return closeServer();
});
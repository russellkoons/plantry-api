'use strict';
const dotenv = require('dotenv');
const knex = require('knex')
dotenv.config();

const {runServer, closeServer} = require('../server');

before(function() {
  knex.migrate.latest()
    .then(() =>  runServer(process.env.TEST_PORT));
});

after(function() {
    return closeServer();
});
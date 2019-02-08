const environment = process.env.ENVIRONMENT || 'test'
const config = require('./knexfile.js')[environment];
module.exports = require('knex')(config);
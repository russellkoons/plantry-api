const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const {app} = require('../app');
const {User} = require('../models');
const {JWT_SECRET} = require('../config/config');

chai.use(chaiHttp);
const should = chai.should();

describe('Auth', function() {
  let user;
  let username;
  let password;

  beforeEach(function() {
    username = faker.internet.userName();
    password = faker.internet.password();

    return User.hashPassword(password)
      .then(hash => User.create({
        username,
        password: hash
      }))
      .then(u => {
        user = u;
      });
  });

  describe('POST login', function() {
    it('Should return a valid JWT', function() {
      return chai.request(app)
        .post('/auth/login')
        .send({
          username,
          password
        })
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.authToken.should.be.a('string');
          jwt.verify(res.body.authToken, JWT_SECRET);
        });
    })
  })
})
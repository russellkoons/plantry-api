const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {app} = require('../app');
const {User} = require('../models');

dotenv.config();

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
      .then(hash => User.query().insert({
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
          jwt.verify(res.body.authToken, process.env.JWT_SECRET);
        });
    });

    it('should return a valid JWT with correct fields', function() {
      return chai.request(app)
        .post('/auth/login')
        .send({
          username,
          password
        })
        .then(res => {
          const payload = jwt.verify(res.body.authToken, process.env.JWT_SECRET);

          payload.user.id.should.equal(user.id);
          payload.user.username.should.equal(user.username);
        });
    });

    it('should return a JWT that does not have a password', function() {
      return chai.request(app)
        .post('/auth/login')
        .send({
          username,
          password
        })
        .then(res => {
          const payload = jwt.verify(res.body.authToken, process.env.JWT_SECRET);

          payload.should.not.have.property('password');
        })
    })
  })
})
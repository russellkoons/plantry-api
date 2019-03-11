'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const {app} = require('../app');
const {User} = require('../models');

chai.use(chaiHttp);
const should = chai.should();

// User Tests

describe('Users', function() {
  describe('POST endpoint', function() {
    it('Should create a new user', function() {
      const newUser = {
        username: faker.internet.userName(),
        password: faker.internet.password()
      };

      return chai.request(app)
        .post('/users')
        .send(newUser)
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.should.be.a('object');
          res.body.should.include.keys('id', 'username');
          res.body.username.should.equal(newUser.username);

          newUser.id = res.body.id;

          return User.query().findById(res.body.id);
        })
        .then(user => {
          user.id.should.equal(newUser.id);
          user.username.should.equal(newUser.username);
        })
    })
  })
})
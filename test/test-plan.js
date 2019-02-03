'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const {app} = require('../app');
const {Plan, User} = require('../models');
const {JWT_SECRET, JWT_EXPIRY} = require('../config/config');

chai.use(chaiHttp);
const should = chai.should();

let user;
let authToken;

function seedUser() {
  user = {
    username: faker.internet.userName(),
    password: faker.internet.password()
  };

  return User.hashPassword(user.password)
    .then(hash => User.create({
      username: user.username,
      password: hash
    }))
    .then(u => {
      user = u.apiRepr();
      authToken = jwt.sign({user}, JWT_SECRET, {expiresIn: JWT_EXPIRY});
    });
}

function generatePlan(userId=null) {
  const date = faker.date.recent()
  const plan = {
    date: date.toDateString()
  }
  if (userId) {
    plan.user_id = userId;
  }
  return plan;
}

function seedData() {
  return seedUser()
    .then(() => {
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(Plan.create(generatePlan(user.id)));
      }
      return Promise.all(promises);
    });
}

describe('Plan', function() {
  beforeEach(function() {
    return User.truncate({cascade: true})
      .then(() => seedData());
  });

  describe('POST', function() {
    it('Should make a new plan', function() {
      const newDate = faker.date.recent();
      const newPlan = {
        date: newDate.toDateString()
      };

      return chai.request(app)
        .post('/plans')
        .send(newPlan)
        .set('Authorization', `Bearer ${authToken}`)
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys('id', 'date');
          res.body.id.should.not.be.null;
          res.body.date.should.equal(newPlan.date);

          return Plan.findByPk(res.body.id)
        })
        .then(plan => {
          plan.date.should.equal(newPlan.date);
          plan.user_id.should.equal(user.id);
        });
    });
  });

  describe('PUT', function() {
    it('should update a plan', function() {
      let plan;
      const update = {
        date: 'January 16, 2000'
      }

      return Plan.findOne()
        .then(p => {
          plan = p;
          update.id = plan.id.toString();

          return chai.request(app)
            .put(`/plans/${plan.id}`)
            .send(update)
            .set('Authorization', `Bearer ${authToken}`);
        })
        .then(res => {
          res.should.have.status(204);

          return Plan.findByPk(plan.id);
        })
        .then(_plan => {
          _plan.date.should.equal(update.date);
          _plan.user_id.should.equal(user.id);
        });
    });
  })

  describe('DELETE', function() {
    it('should delete a plan by ID', function() {
      let plan;
      return Plan.findOne()
        .then(p => {
          plan = p;
          return chai.request(app)
            .delete(`/plans/${plan.id}`)
            .set('Authorization', `Bearer ${authToken}`);
        })
        .then(res => {
          res.should.have.status(204);
          return Plan.findByPk(plan.id);
        })
        .then(_plan => {
          should.not.exist(_plan);
        });
    });
  });
})
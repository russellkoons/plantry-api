'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {app} = require('../app');
const {Plan, User} = require('../models');

dotenv.config();

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
    .then(hash => User.query()
      .insert({
      username: user.username,
      password: hash
    }))
    .then(u => {
      user = {
        id: u.id,
        username: u.username
      };
      authToken = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY});
    });
}

function generatePlan(userId=null) {
  const date = faker.date.recent()
  const plan = {
    date: date.toDateString(),
    mealplans: [
      {
        meal: faker.random.word(),
        time: 'Breakfast',
        day: 'Monday'
      }
    ]
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
        promises.push(Plan.query().insertGraph(generatePlan(user.id)));
      }
      return Promise.all(promises);
    });
}

describe('Plan', function() {
  beforeEach(function() {
    return User.query()
      .deleteById(1)
      .then(() => seedData());
  });

  describe('GET', function() {
    it('should return plans made by user', function() {
      return chai.request(app)
        .get('/plans')
        .set('Authorization', `Bearer ${authToken}`)
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.should.be.a('object');
          res.body.length.should.equal(5);
        });
    });
  });

  describe('POST', function() {
    it('Should make a new plan', function() {
      const newDate = faker.date.recent();
      const newPlan = {
        user_id: user.id,
        date: newDate.toDateString(),
        mealplans: [
          {
            meal: faker.random.word(),
            time: 'Lunch',
            day: 'Sunday'
          }
        ]
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
          res.body.user_id.should.equal(user.id);
        })
    });
  });

  describe('PUT', function() {
    it('should update a plan', function() {
      const newDate = faker.date.recent();
      let plan;
      const update = {
        user_id: user.id,
        date: newDate.toDateString(),
        mealplans: [
          {
            meal: faker.random.word(),
            time: 'Lunch',
            day: 'Sunday'
          }
        ]
      }

      return Plan.query()
        .findOne({user_id: user.id})
        .then(p => {
          plan = p;
          update.id = plan.id;

          return chai.request(app)
            .put(`/plans/${plan.id}`)
            .send(update)
            .set('Authorization', `Bearer ${authToken}`);
        })
        .then(res => {
          res.should.have.status(204);

          return Plan.query().findById(plan.id);
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
      return Plan.query()
        .findOne({user_id: user.id})
        .then(p => {
          plan = p;
          return chai.request(app)
            .delete(`/plans/${plan.id}`)
            .set('Authorization', `Bearer ${authToken}`);
        })
        .then(res => {
          res.should.have.status(204);
          return Plan.query().findById(plan.id);
        })
        .then(_plan => {
          should.not.exist(_plan);
        });
    });
  });
})
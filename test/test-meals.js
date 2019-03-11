'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {app} = require('../app');
const {Meal, User} = require('../models');

dotenv.config();

chai.use(chaiHttp);
const should = chai.should();

let user;
let authToken;

// Meal Seeding Functions

function seedUser() {
  user = {
    username: faker.internet.userName(),
    password: faker.internet.password()
  };

  return User.hashPassword(user.password)
    .then(hash => User.query().insert({
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

function generateMeal(userId=null) {
  const meal = {
    meal: faker.random.word(),
    ingredients: [
      {ingredient: faker.random.word()},
      {ingredient: faker.random.word()}
    ],
    url: '',
    notes: faker.lorem.words(10)
  }
  if (userId) {
    meal.user_id = userId;
  }
  return meal;
}

function seedData() {
  return seedUser()
    .then(() => {
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(Meal.query().insertGraph(generateMeal(user.id)));
      }
      return Promise.all(promises);
    });
}

// Meal Tests

describe('Meals', function() {
  beforeEach(function() {
    return User.query()
      .deleteById(1)
      .then(() => seedData());
  });

  describe('GET', function() {
    it('should return meals made by user', function() {
      return chai.request(app)
        .get('/meals')
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
    it('Should make a new meal', function() {
      const newMeal = generateMeal();

      return chai.request(app)
        .post('/meals')
        .send(newMeal)
        .set('Authorization', `Bearer ${authToken}`)
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys('id', 'meal', 'ingredients', 'url', 'notes', 'user_id', 'createdAt', 'updatedAt');
          res.body.id.should.not.be.null;
          res.body.meal.should.equal(newMeal.meal);
          res.body.user_id.should.equal(user.id);
          res.body.url.should.equal(newMeal.url);
          res.body.notes.should.equal(newMeal.notes)
        })
    });
  });

  describe('PUT', function() {
    it('should update a meal', function() {
      let meal;
      const update = generateMeal(user.id);

      return Meal.query()
        .findOne({user_id: user.id})
        .then(m => {
          meal = m;
          update.id = meal.id;

          return chai.request(app)
            .put(`/meals/${meal.id}`)
            .send(update)
            .set('Authorization', `Bearer ${authToken}`);
        })
        .then(res => {
          res.should.have.status(201);

          return Meal.query().findById(meal.id);
        })
        .then(_meal => {
          _meal.meal.should.equal(update.meal);
          _meal.user_id.should.equal(user.id);
        });
    });
  })
})
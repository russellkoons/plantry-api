'use strict';

const User = require('./user');
const Plan = require('./plans');
const Meal = require('./meals');
const Ingredient = require('./ingredients');

const db = {
  User,
  Plan,
  Meal,
  Ingredient
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;

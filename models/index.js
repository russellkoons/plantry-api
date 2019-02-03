'use strict';

const User = require('./user');
const Plan = require('./plan');
const Meal = require('./meal');
const Ingredient = require('./ingredient');

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

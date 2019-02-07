'use strict';

const {Ingredient} = require('./ingredient');
const {Meal} = require('./meal');
const {MealPlan} = require('./mealplan')
const {Plan} = require('./plan');
const {Time} = require('./time');
const {User} = require('./user');

const db = {
  Ingredient,
  Meal,
  MealPlan,
  Plan,
  Time,
  User
};

module.exports = db;
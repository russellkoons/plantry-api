'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const MealPlan = sequelize.define('MealPlan', {

}, {
  tableName: 'mealsplans',
  underscored: true
})

module.exports = MealPlan;
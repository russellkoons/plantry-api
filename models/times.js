'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Time = sequelize.define('Time', {
  time: {
    type:   Sequelize.ENUM,
    values: ['Breakfast', 'Lunch', 'Dinner'],
    allowNull: false
  }
}, {
  tableName: 'times',
  underscored: true
});

Time.associate = function(models) {
  Time.hasMany(
    models.Meal,
    {foreignKey: {allowNull: false}}
  );

  Time.hasMany(
    models.MealPlan,
    {foreignKey: {allowNull: false}}
  );

  Time.hasMany(
    models.MealTime,
    {foreignKey: {allowNull: false}}
  );
}

Time.prototype.apiRepr = function() {
  return {
    id: this.id,
    time: this.time,
    meals: meals,
    mealsplans: mealsplans,
    mealstimes: mealstimes
  }
}

module.exports = Time;
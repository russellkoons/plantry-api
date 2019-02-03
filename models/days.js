'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Day = sequelize.define('Day', {
  day: {
    type:   Sequelize.ENUM,
    values: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    allowNull: false
  }
}, {
  tableName: 'days',
  underscored: true
});

Day.associate = function(models) {
  Day.hasMany(
    models.MealPlan,
    {
      as: 'mealsplans',
      foreignKey: {
        as: 'mealsplans_id',
        allowNull: false
      }
    }
  );
}

Day.prototype.apiRepr = function() {
  return {
    id: this.id,
    day: this.day,
    mealsplans: mealsplans
  }
}

module.exports = Day;
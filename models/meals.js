'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Meal = sequelize.define('Meal', {
  meal: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: Sequelize.ENUM('Breakfast', 'Lunch', 'Dinner')
}, {
  tableName: 'meals',
  underscored: true
});

Meal.associate = function(models) {
  Meal.hasMany(
    models.Ingredient,
    {
      as: 'ingredients',
      foreignKey: {
        as: 'ingredient_id',
        allowNull: false
      }
    }
  );

  Meal.belongsTo(
    models.User,
    {foreignKey: {allowNull: false}}
  );
}

Meal.prototype.apiRepr = function() {
  return {
    id: this.id,
    meal: this.meal,
    time: this.time,
    ingredients: ingredients
  }
}

module.exports = Meal;
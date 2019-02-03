'use strict';
module.exports = (sequelize, DataTypes) => {
  const meals = sequelize.define('meals', {
    meal: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {});
  meals.associate = function(models) {
    // associations can be defined here
  };
  return meals;
};
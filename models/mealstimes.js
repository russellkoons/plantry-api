'use strict';
module.exports = (sequelize, DataTypes) => {
  const mealstimes = sequelize.define('mealstimes', {
    meal_id: DataTypes.INTEGER
  }, {});
  mealstimes.associate = function(models) {
    // associations can be defined here
  };
  return mealstimes;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const mealsplans = sequelize.define('mealsplans', {
    meal_id: DataTypes.INTEGER
  }, {});
  mealsplans.associate = function(models) {
    // associations can be defined here
  };
  return mealsplans;
};
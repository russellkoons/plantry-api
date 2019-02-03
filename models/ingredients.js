'use strict';
module.exports = (sequelize, DataTypes) => {
  const ingredients = sequelize.define('ingredients', {
    ingredient: DataTypes.STRING
  }, {});
  ingredients.associate = function(models) {
    // associations can be defined here
  };
  return ingredients;
};
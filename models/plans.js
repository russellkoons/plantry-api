'use strict';
module.exports = (sequelize, DataTypes) => {
  const plans = sequelize.define('plans', {
    date: DataTypes.STRING
  }, {});
  plans.associate = function(models) {
    // associations can be defined here
  };
  return plans;
};
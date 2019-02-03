'use strict';
module.exports = (sequelize, DataTypes) => {
  const days = sequelize.define('days', {
    day: DataTypes.STRING,
    sort: DataTypes.INTEGER
  }, {});
  days.associate = function(models) {
    // associations can be defined here
  };
  return days;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const times = sequelize.define('times', {
    time: DataTypes.STRING,
    sort: DataTypes.INTEGER
  }, {});
  times.associate = function(models) {
    // associations can be defined here
  };
  return times;
};
'use strict';
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
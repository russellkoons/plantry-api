'use strict';
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  underscored: true
});

User.associate = function(models) {
  User.hasMany(
    models.Plan,
    {
      as: 'plans',
      foreignKey: {
        as: 'user_id',
        allowNull: false}
    }
  );

  User.hasMany(
    models.Meal,
    {
      as: 'meals',
      foreignKey: {
        as: 'user_id',
        allowNull: false
      }
    }
  );
};

User.prototype.apiRepr = function(plans, meals) {
  return {
    id: this.id,
    username: this.username,
    plans: plans,
    meals: meals
  }
};

User.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

User.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

module.exports = User;
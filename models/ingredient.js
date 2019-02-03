'use strict';
const Sequelize = require('sequelize');
const {sequelize} = require('../db/sequelize');

const Ingredient = sequelize.define('Ingredient', {
  ingredient: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'ingredients',
  underscored: true
});

Ingredient.associate = function(models) {
  Ingredient.belongsTo(
    models.Meal,
    {foreignKey: {allowNull: false}}
  );
}

Ingredient.prototype.apiRepr = function() {
  return {
    id: this.id,
    ingredient: this.ingredient
  }
}

module.exports = Ingredient;
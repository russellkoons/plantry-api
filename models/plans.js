'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Plan = sequelize.define('Plan', {
  date: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'plans',
  underscored: true
});

Plan.associate = function(models) {
  Plan.hasMany(
    models.Meal,
    {
      as: 'meals',
      foreignKey: {
        as: 'meal_id',
        allowNull: false
      }
    }
  );

  // Plan.hasMany(
  //   models.MealPlan,
  //   {
  //     as: 'mealsplans',
  //     foreignKey: {
  //       as: 'mealsplans_id',
  //       allowNull: false
  //     }
  //   }
  // )

  Plan.belongsTo(
    models.User,
    {foreignKey: {allowNull: false}}
  );
}

Plan.prototype.apiRepr = function() {
  return {
    id: this.id,
    date: this.date,
    meals: meals,
    mealsplans: mealsplans
  }
}

module.exports = Plan;
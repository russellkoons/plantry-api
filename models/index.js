'use strict';

const {sequelize} = require('../db/sequelize');
const Sequelize = require('sequelize');
const UserModel = require('./user');
const PlanModel = require('./plan');
const MealModel = require('./meal');
const DayModel = require('./day');
const IngredientModel = require('./ingredient');

const User = UserModel(sequelize, Sequelize);
const Plan = PlanModel(sequelize, Sequelize);
const Meal = MealModel(sequelize, Sequelize);
const Ingredient = IngredientModel(sequelize, Sequelize);
const Day = DayModel(sequelize, Sequelize);
const MealPlan = sequelize.define('mealplans', {});

Plan.belongsTo(User);
Ingredient.belongsTo(Meal);
Meal.belongsToMany(Plan, { through: MealPlan, unique: false });
Plan.belongsToMany(Meal, { through: MealPlan, unique: false });
Meal.hasMany(Day, { as: 'days' });

const db = {
  User,
  Plan,
  Meal,
  Ingredient,
  MealPlan
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;

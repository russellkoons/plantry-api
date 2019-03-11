const { Model } = require('objection');
const knex = require('../knex');

Model.knex(knex);

// Meal Plan Model

class MealPlan extends Model {
  static get tableName() {
    return 'mealplans'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        meal: {type: 'string'},
        time: {type: 'enum'},
        day: {type: 'enum'}
      }
    }
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/plan`,
        join: {
          from: 'mealplans.id',
          through: {
            from: 'meals_plans.mealplan_id',
            to: 'meals_plans.plan_id'
          },
          to: 'plans.id'
        }
      }
    }
  }
}

module.exports = { MealPlan };
const { Model } = require('objection');
const knex = require('../knex');

Model.knex(knex);

class MealPlan extends Model {
  static get tableName() {
    return 'mealplans'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        plan_id: {type: 'integer'},
        meal: {type: 'string'},
        time: {type: 'enum'},
        day: {type: 'enum'}
      }
    }
  }

  static get relationMappings() {
    const Plan = require('./user');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Plan,
        join: {
          from: 'mealplans.plan_id',
          to: 'plans.id'
        }
      }
    }
  }
}

module.exports = { MealPlan };
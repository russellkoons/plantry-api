const { Model } = require('objection');
const knex = require('../knex');

Model.knex(knex);

// User Model

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        username: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    const Plan = require('./plan');
    const Meal = require('./meal')
    return {
      plans: {
        relation: Model.HasManyRelation,
        modelClass: Plan,
        join: {
          from: 'users.id',
          to: 'plans.user_id'
        }
      },
      meals: {
        relation: Model.HasManyRelation,
        modelClass: Meal,
        join: {
          from: 'users.id',
          to: 'meals.user_id'
        }
      }
    }
  }
}

module.exports = { User }
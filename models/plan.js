const { Model } = require('objection');
const knex = require('../knex');

Model.knex(knex);

class Plan extends Model {
  static get tableName() {
    return 'plans'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        user_id: {type: 'integer'},
        date: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    const User = require('./user');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'plans.user_id',
          to: 'users.id'
        }
      },
      mealplans: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/mealplan`,
        join: {
          from: 'plans.id',
          to: 'mealplans.plan_id'
        }
      }
    }
  }
}

module.exports = { Plan };
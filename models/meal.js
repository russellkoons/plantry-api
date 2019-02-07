const { Model } = require('objection');
const knex = require('../knex');

Model.knex(knex);

class Meal extends Model {
  static get tableName() {
    return 'meals';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        user_id: {type: 'integer'},
        meal: {type: 'string'},
        url: {type: 'string'},
        notes: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    const User = require('./user');
    const Plan = require('./plan');

    return {
      ingredients: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/ingredient`,
        join: {
          from: 'meals.id',
          to: 'ingredients.meal_id'
        }
      },
      times: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/time`,
        join: {
          from: 'meals.id',
          through: {
            from: 'mealtimes.meal_id',
            to: 'mealtimes.time_id'
          },
          to: 'times.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'meals.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = { Meal }
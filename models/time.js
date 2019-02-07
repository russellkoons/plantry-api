const { Model } = require('objection');
const knex = require('../knex');

Model.knex(knex);

class Time extends Model {
  static get tableName() {
    return 'times';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        time: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    const Meal = require('./meal');

    return {
      meals: {
        relation: Model.ManyToManyRelation,
        modelClass: Meal,
        join: {
          from: 'times.id',
          through: {
            from: 'mealtimes.time_id',
            to: 'mealtimes.meal_id'
          },
          to: 'meals.id'
        }
      }
    }
  }
}

module.exports = { Time };
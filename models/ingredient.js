const { Model } = require('objection');
const knex = require('../knex');

Model.knex(knex);

// Ingredient Model

class Ingredient extends Model {
  static get tableName() {
    return 'ingredients';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        meal_id: {type: 'integer'},
        ingredient: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    const Meal = require('./meal');

    return {
      meal: {
        relation: Model.BelongsToOneRelation,
        modelClass: Meal,
        join: {
          from: 'ingredients.meal_id',
          to: 'meals.id'
        }
      } 
    }
  }
}

module.exports = { Ingredient };
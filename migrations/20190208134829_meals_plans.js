
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meals_plans', function(t) {
      t.increments('id').primary();
      t.integer('mealplan_id').references('mealplans.id').onDelete('CASCADE');
      t.integer('plan_id').references('plans.id').onDelete('CASCADE');
    })
  ]); 
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('meals_plans')
  ]);
};


exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('mealtimes', function(t) {
      t.increments('id').primary();
      t.integer('meal_id').references('meals.id');
      t.integer('time_id').references('times.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('mealtimes')
  ]);
};

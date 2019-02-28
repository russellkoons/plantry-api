
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('mealtimes', function(t) {
      t.increments('id').primary();
      t.integer('meal_id').references('meals.id').onDelete('CASCADE');
      t.integer('time_id').references('times.id').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('mealtimes')
  ]);
};

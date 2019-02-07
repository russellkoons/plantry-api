
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('mealplans', function(t) {
      t.increments('id').primary();
      t.integer('plan_id').references('plans.id').onDelete('CASCADE');
      t.string('meal')
      t.enum('time', ['Breakfast', 'Lunch', 'Dinner']);
      t.enum('day', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    })
  ]); 
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('mealplans')
  ]);
};

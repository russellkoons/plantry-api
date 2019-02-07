
exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.createTable('ingredients', function(t) {
      t.increments('id').unsigned().primary();
      t.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
      t.dateTime('updatedAt').nullable().defaultTo(knex.fn.now());

      t.string('ingredient').notNull();
      t.integer('meal_id').references('meals.id')
    })
  ])  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('ingredients')
  ]);
};

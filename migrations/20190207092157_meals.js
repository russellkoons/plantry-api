
exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.createTable('meals', function(t) {
      t.increments('id').unsigned().primary();
      t.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
      t.dateTime('updatedAt').nullable().defaultTo(knex.fn.now());

      t.string('meal').notNull();
      t.integer('user_id').references('users.id');
      t.string('url');
      t.string('notes', 1000);
    })
  ])  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('meals')
  ]);
};


exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.createTable('plans', function(t) {
      t.increments('id').unsigned().primary();
      t.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
      t.dateTime('updatedAt').nullable().defaultTo(knex.fn.now());

      t.string('date').notNull();
      t.integer('user_id').references('users.id').onDelete('CASCADE');
    })
  ])  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('plans')
  ]);
};

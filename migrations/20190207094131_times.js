
exports.up = function(knex) {
  return Promise.all([ 
    knex.schema.createTable('times', function(t) {
      t.increments('id').unsigned().primary()
      t.dateTime('createdAt').notNull().defaultTo(knex.fn.now())
      t.dateTime('updatedAt').nullable().defaultTo(knex.fn.now())

      t.string('time').notNull()
    })
  ])  
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('times')
  ]);
};

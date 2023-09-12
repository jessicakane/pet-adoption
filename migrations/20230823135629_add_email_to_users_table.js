exports.up = function(knex) {
    return knex.schema.table('users', function(table) {
      table.string('email').notNullable().unique();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('users', function(table) {
      table.dropColumn('email');
    });
  };
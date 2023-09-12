exports.up = function(knex) {
    return knex.schema.table('users', function(table) {
      table.string('imageUrl'); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('users', function(table) {
      table.dropColumn('imageUrl'); 
    });
  };

exports.up = function(knex) {
    return knex.schema.table('pets', function(table) {
      table.string('imageUrl'); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('pets', function(table) {
      table.dropColumn('imageUrl'); 
    });
  };
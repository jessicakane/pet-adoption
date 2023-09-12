exports.up = function(knex) {
    return knex.schema.table('requests', function(table) {
        table.timestamp('dateMade').defaultTo(knex.fn.now()); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('requests', function(table) {
      table.dropColumn('dateMade'); 
    });
  };
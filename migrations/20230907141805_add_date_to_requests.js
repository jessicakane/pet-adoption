exports.up = function(knex) {
    return knex.schema.table("requests", (table) => {
        table.timestamp('date').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table("requests", (table) => {
      table.dropColumn('date');
    });
  };

exports.up = function (knex) {
    return knex.schema.alterTable('users', (table) => {
      table.timestamp('dateJoined').defaultTo(knex.fn.now()).alter();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('users', (table) => {
      // You can reverse the changes here if needed
    });
  };
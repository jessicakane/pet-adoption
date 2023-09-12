exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("userId").primary();
        table.string('firstName');
        table.string('lastName');
        table.timestamp('dateJoined');
        table.string('bio');
        table.string('password');
        table.boolean('admin');
        table.string('phoneNumber');
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('pets');
};

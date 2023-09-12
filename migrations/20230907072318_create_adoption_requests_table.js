exports.up = function(knex) {
    return knex.schema.createTable("requests", (table) => {
        table.increments("requestId").primary();
        table.integer('userId').unsigned();
        table.integer('petId').unsigned();
        table.integer('adminId').unsigned();
        table.string('requestType');
        table.foreign('userId').references('users.userId');
        table.foreign('petId').references('pets.petId'); 
        table.foreign('adminId').references('users.userId');
        table.integer('requestStatus');
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('requests');
};

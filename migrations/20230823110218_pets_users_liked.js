exports.up = function(knex) {
    return knex.schema.createTable("pets_users_liked", (table) => {
        table.integer('userId').unsigned();
        table.integer('petId').unsigned();
        table.primary(['userId', 'petId']);
        table.foreign('userId').references('users.userId');
        table.foreign('petId').references('pets.petId');  
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('pets');
};



exports.up = function(knex) {
    return knex.schema.createTable("pets", (table) => {
        table.increments("petId").primary();
        table.string('name');
        table.string('bio');
        table.timestamp('dateAdded');
        table.string('adoptionStatus');
        table.string('color');
        table.float('height');
        table.float('weight');
        table.string('type');
        table.boolean('hypoallergenic');
        table.string('breed');
        table.integer('userIdFeaturing').unsigned();
        table.integer('userIdOwning').unsigned();
        table.integer('userIdFostering').unsigned();
        table.foreign('userIdFeaturing').references('users.userId');
        table.foreign('userIdFostering').references('users.userId');
        table.foreign('userIdOwning').references('users.userId');
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('pets');
};

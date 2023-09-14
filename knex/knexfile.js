const path = require('path');
const pathToMigrations = path.resolve(__dirname, '../migrations');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    client: 'mysql2',
    connection: {
      host: 'localhost',
      database: 'pets_database',
      user:     'jess',
      password: 'jess',
     
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: pathToMigrations
    }
  

};

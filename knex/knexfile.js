const path = require('path');
const pathToMigrations = path.resolve(__dirname, '../migrations');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    client: 'mysql2',
    connection: {
      host: '164.92.240.250',
      database: 'pets_database',
      user:     'root',
      password: 'root',
     
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

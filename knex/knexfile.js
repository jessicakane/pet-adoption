const path = require('path');
const pathToMigrations = path.resolve(__dirname, '../migrations');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    client: 'mysql2',
    connection: {
      host: 'db-mysql-fra1-33493-do-user-14649989-0.b.db.ondigitalocean.com', // Replace with your DigitalOcean database cluster host
      database: 'defaultdb',     
      user: 'doadmin',          
      password: 'AVNS_TEjd5mFLYfFIfZdNnJD'
     
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

const dotenv = require('dotenv');
dotenv.config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    }
  },

  test: {
    client: 'pg',
    connection: {
      database: process.env.TEST_DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: process.env.DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

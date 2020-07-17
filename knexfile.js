const dotenv = require('dotenv');
dotenv.config();

// Knex Configuration

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
      max: 10,
      propagateCreateError: false
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.HEROKU_POSTGRESQL_AMBER_URL,
    pool: {
      min: 2,
      max: 10,
      propagateCreateError: false
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

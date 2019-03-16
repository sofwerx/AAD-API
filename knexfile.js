const DATABASE_CLIENT = process.env.DATABASE_CLIENT || 'pg';
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost/aad';

module.exports = {

  development: {
    client: 'postgres',
    connection: DATABASE_URL,
    // LOCAL TESTING Credentials
    // database: 'postgres',
    // user: 'postgres',
    // password: 'example',
    // port: 5432,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user: 'postgres',
      password: 'postgres'
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
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
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

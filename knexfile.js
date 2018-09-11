// Define DB connections for different environments
module.exports = {
    development: {
      client: 'pg',
      connection: 'postgres://localhost/aad'
    },
    test: {
      client: 'pg',
      connection: 'postgres://localhost/aad'
    },
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL
    }
  }
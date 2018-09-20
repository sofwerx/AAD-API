const DATABASE_CLIENT = process.env.DATABASE_CLIENT || 'pg'
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost/aad'

// Define DB connections for different environments
module.exports = {
    development: {
      client: DATABASE_CLIENT,
      connection: DATABASE_URL
    },
    test: {
      client: DATABASE_CLIENT,
      connection: DATABASE_URL
    },
    production: {
      client: DATABASE_CLIENT,
      connection: DATABASE_URL
    }
  }

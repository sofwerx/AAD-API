exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (table) => {
      // TABLE COLUMN DEFINITIONS HERE
      table.increments().primary()
      table.string('username', 255).notNull().defaultTo('').unique()
      table.string('email', 255).notNull().unique()
      table.specificType('hashed_password', 'char(60)').notNull()
      table.string('firstName').nullable() 
      table.string('lastName').nullable() 
      table.string('jobTitle').nullable() 
      table.string('company').nullable() 
      table.string('role').nullable() 
      table.timestamps(true, true)
    })
  }
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
  }
exports.up = (knex, Promise) => {
    return knex.schema.createTable('tools', (table) => {
      // TABLE COLUMN DEFINITIONS HERE
      table.increments().primary()
      table.string('name', 255).notNull().unique()
      table.string('url', 255).notNull().unique()
      table.timestamps(true, true)
    })
  }
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tools')
  }
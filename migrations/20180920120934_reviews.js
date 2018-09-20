exports.up = (knex, Promise) => {
    return knex.schema.createTable('reviews', (table) => {
      // TABLE COLUMN DEFINITIONS HERE
      table.increments().primary()
      table.integer('user_id').references('id').inTable('users').notNull().onDelete('CASCADE')
      table.string('text', 255).nullable()
      table.binary('binary', 255).nullable()
      table.timestamps(true, true)
    })
  }
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('reviews')
  }
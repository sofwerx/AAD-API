exports.up = (knex, Promise) => {
    return knex.schema.createTable('reviews', (table) => {
      // TABLE COLUMN DEFINITIONS HERE
      table.increments().primary()      
      table.string('username').references('username').inTable('users').nullable().onDelete('CASCADE')
      table.string('tool_name').nullable()
      table.boolean('editable').nullable()
      table.boolean('sharable').nullable()
      table.string('text', 3000).nullable()
      table.string('firstName').nullable() 
      table.string('lastName').nullable() 
      table.string('jobTitle').nullable() 
      table.string('company').nullable() 
      table.string('path').nullable() 
      table.timestamps(true, true)
    })
  }
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('reviews')
  }
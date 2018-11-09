exports.up = (knex, Promise) => {
    return knex.schema.createTable('sortoeOFF', (table) => {
      // TABLE COLUMN DEFINITIONS HERE
      table.increments().primary()      
      table.string('username').references('username').inTable('users').nullable().onDelete('CASCADE')
      table.string('answer_1').nullable()
      table.string('answer_2').nullable() 
      table.string('answer_3').nullable() 
      table.string('answer_4').nullable() 
      table.string('answer_5').nullable() 
      table.timestamps(true, true)
    })
  }
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('sortoeOFF')
  }
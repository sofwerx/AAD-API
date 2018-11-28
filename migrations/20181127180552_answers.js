exports.up = (knex, Promise) => {
    return knex.schema.createTable('answers', (table) => {
      // TABLE COLUMN DEFINITIONS HERE
      table.increments().primary()      
      table.string('tool_name').nullable()
      table.integer('review_id').nullable()
      table.string('answer_1').nullable()
      table.string('answer_2').nullable() 
      table.string('answer_3').nullable() 
      table.string('answer_4').nullable() 
      table.string('answer_5').nullable() 
      table.string('answer_6').nullable() 
      table.string('answer_7').nullable()
      table.string('answer_8').nullable() 
      table.string('answer_9').nullable()
      table.string('answer_10').nullable()
      table.string('answer_11').nullable()
      table.string('answer_12').nullable()
      table.string('answer_13').nullable()
      table.string('answer_14').nullable()
      table.string('answer_15').nullable()
      table.string('answer_16').nullable()
      table.string('answer_17').nullable()
      table.string('answer_18').nullable()
      table.string('answer_19').nullable()
      table.string('answer_20').nullable()
      table.timestamps(true, true)
    })
  }
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('answers')
  }
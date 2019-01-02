exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('answers').del()
   .then(function() {
     // Inserts seed entries
     return knex('answers').insert([])
     .then(function() {
       // Moves id column (PK) auto-incrementer to correct value after inserts
       return knex.raw("SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers))")
     })
   })
  } 
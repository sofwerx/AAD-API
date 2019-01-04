exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').del()
   .then(function() {
     // Inserts seed entries
     return knex('reviews').insert([])
     .then(function() {
       // Moves id column (PK) auto-incrementer to correct value after inserts
       return knex.raw("SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews))")
     })
   })
  } 
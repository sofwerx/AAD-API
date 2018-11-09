exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sortoeOFF').del()
   .then(function() {
     // Inserts seed entries
     return knex('sortoeOFF').insert([
       {
        id: 1,
        username: 'mlembke1',
        answer_1: "Here is awesome answer 1!",
        answer_2: "Here is awesome answer 2!",
        answer_3: "Here is awesome answer 3!",
        answer_4: "Here is awesome answer 4!",
        answer_5: "Here is awesome answer 5!",
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }
     ])
     .then(function() {
       // Moves id column (PK) auto-incrementer to correct value after inserts
       return knex.raw("SELECT setval('sortoeOFF_id_seq', (SELECT MAX(id) FROM sortoeOFF))")
     })
   })
  }
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').del()
   .then(function() {
     // Inserts seed entries
     return knex('reviews').insert([
       {
        id: 1,
        username: 'mlembke2',
        tool_name: 'SORTOE',
        text: 'awesome',
        firstName: "Mitch",
        lastName: "Lembke",
        jobTitle: "Web Developer",
        company: "ISPA Technology",
        editable: false,
        sharable: true,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }
     ])
     .then(function() {
       // Moves id column (PK) auto-incrementer to correct value after inserts
       return knex.raw("SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews))")
     })
   })
  } 
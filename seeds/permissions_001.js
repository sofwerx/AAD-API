exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('permissions').del()
   .then(function() {
     // Inserts seed entries
     return knex('permissions').insert([
       {
        id: 1,
        role: "guest",
        read: true,
        write:false,
        publish: false,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        role: "writer",
        read: true,
        write:true,
        publish: false,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 3,
        role: "manager",
        read: true,
        write:true,
        publish: true,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }
     ])
     .then(function() {
       // Moves id column (PK) auto-incrementer to correct value after inserts
       return knex.raw("SELECT setval('permissions_id_seq', (SELECT MAX(id) FROM permissions))")
     })
   })
  } 
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
   .then(function() {
     // Inserts seed entries
     return knex('users').insert([
      {
        username: 'adminAccount',
        role: "manager",
        email: 'admin@gmail.com',
        firstName: "Admin",
        lastName: "Admin",
        jobTitle: "Admin",
        company: "Admin",
        hashed_password: '$2b$10$vte7vKuPAaM4JelANw26kuH6E5D9LEME3EYh7nObtN5fZiCexTbVu',  // password
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }
     ])
     .then(function() {
       // Moves id column (PK) auto-incrementer to correct value after inserts
       return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
     })
   })
  }
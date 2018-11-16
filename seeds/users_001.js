exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
   .then(function() {
     // Inserts seed entries
     return knex('users').insert([
       {
        id: 1,
        username: 'mlembke1',
        email: 'mitchell.lembke@gmail.com',
        firstName: "Mitch",
        lastName: "Lembke",
        jobTitle: "Web Developer",
        company: "ISPA Technology",
        role: "manager",
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',  // youreawizard
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        username: 'testUser1',
        role: "manager",
        email: 'testUser1@gmail.com',
        firstName: "Test",
        lastName: "User1",
        jobTitle: "Scientist",
        company: "Labs&Co.",
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',  // youreawizard
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
       id: 2,
       username: 'testUser2',
       email: 'testUser2@gmail.com',
       firstName: "Test",
       lastName: "User2",
       jobTitle: "Coal Miner",
       company: "Miners",
       role: "writer",
       hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',  // youreawizard
       created_at: new Date('2016-06-29 14:26:16 UTC'),
       updated_at: new Date('2016-06-29 14:26:16 UTC')
     },
     {
      id: 3,
      username: 'testUser3',
      role: "guest",
      email: 'testUser3@gmail.com',
      firstName: "Test",
      lastName: "User3",
      jobTitle: "Accountant",
      company: "Money Company",
      hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',  // youreawizard
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
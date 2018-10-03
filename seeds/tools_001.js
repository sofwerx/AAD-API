exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tools').del()
   .then(function() {
     // Inserts seed entries
     return knex('tools').insert([
       {
        id: 1,
        name: 'SORTOE',
        url: 'https://sortoe.supermicro5.opswerx.org:65443/',
        description: "Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum",
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
       id: 2,
       name: 'AtN',
       url: 'www.google.com',
       description: "Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum",
       created_at: new Date('2016-06-29 14:26:16 UTC'),
       updated_at: new Date('2016-06-29 14:26:16 UTC')
     },
     {
      id: 3,
      name: 'TestTool3Name',
      url: 'www.google.com',
      description: "Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum",
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    }
     ])
     .then(function() {
       // Moves id column (PK) auto-incrementer to correct value after inserts
       return knex.raw("SELECT setval('tools_id_seq', (SELECT MAX(id) FROM tools))")
     })
   })
  }
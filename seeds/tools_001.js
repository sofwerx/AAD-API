exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tools').del()
   .then(function() {
     // Inserts seed entries
     return knex('tools').insert([
        {
        id: 1,
        name: 'MEADE/SORT-OE',
        url: 'https://sortoe.supermicro5.opswerx.org/',
        description: "MEADE/SORT-OE is a tool intended to save decision makers and operators time by aggregating stability data about countries and operating environments in one place with an easy to use interface. The tool provides users access to open source data gathered from many sources and processed using peer reviewed analytical methods with an intuitive interface for quickly understanding the stability trends in a country and the ability to drill down and see economic and social indicators.",
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
        },
        {
        id: 2,
        name: 'Argument Mapper',
        url: 'www.google.com',
        description: "Lorem Ispum Argument the Mapper Lorem Ispum Keep Argumenting Lorem Ispum Mapper Lorem Ispum Argument.",
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
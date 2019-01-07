
exports.up = function(knex, Promise) {
    return knex("tools").insert([
        {
            name: "Argument Mapper", 
            url: "www.google.com", 
            description: "Lorem Ipsum Argument Mapper Lorem Ipsum Argument Mapper",
            username: "AMusername",
            password: "AMpassword"
        },
    ]);
};

exports.down = function(knex, Promise) {
  return knex("tools")
        .where("name", "Argument Mapper")
        .del()
};

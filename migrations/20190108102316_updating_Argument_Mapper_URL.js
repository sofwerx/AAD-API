
exports.up = function(knex, Promise) {
    return knex("tools")
            .where("name", "Argument Mapper")
            .update({ url: "https://argument-mapper.supermicro5.opswerx.org/" })
}

exports.down = function(knex, Promise) {
    return knex("tools")
            .where("name", "Argument Mapper")
            .update({ url: "www.google.com" })
};

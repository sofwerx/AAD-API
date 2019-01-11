
exports.up = function(knex, Promise) {
    return knex("tools").insert([
        {
            name: "Argument Mapper", 
            url: "https://argument-mapper.supermicro5.opswerx.org/",
            description: "Argument Mapper is used to draft analytic products or facilitate analytic projects using a basic argument map. Argument maps are used to ensure appropriate logical argumentation is used in our products and services. Logical argumentation is a tradecraft standard mandated by ICD 203, Analytic Standards. This tool also facilitates understanding of additional analytic standards including analysis of alternatives and other tradecraft standards.",
            username: "",
            password: ""
        }
    ]);
};

exports.down = function(knex, Promise) {
  return knex("tools")
        .where("name", "Argument Mapper")
        .del()
};

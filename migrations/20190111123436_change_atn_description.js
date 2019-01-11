exports.up = function(knex, Promise) {
    return knex("tools")
            .where("name", "AtN")
            .update({ description: "AtN comprises a structured knowledge base of Processes that describe how adversaries perform activities to support their operations. The system objectives for AtN focus on several key themes: model-enabled analysis, tools to support interdisciplinary analysis teams, and visualization capabilities to support advanced data analytics. The core capabilities of AtN are: data processing and enrichment, modeling tools and analytical templates, case management, network and data visualization, and data analytics." })
}

exports.down = function(knex, Promise) {
    return knex("tools")
            .where("name", "AtN")
            .update({ description: "Lorem Ispum ATN the Lorem Ispum Keep ATNing Lorem Ispum Lorem Ispum ATN." })
};

const toolData = require('../sample_data/tools_sample');

exports.seed = (knex, Promise) => {
  Promise.resolve()
    .then(() => {
      return knex('Tool').insert(toolData);
    });
};

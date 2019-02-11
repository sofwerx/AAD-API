const knexModelHelper = require('../helpers/knex-model-helper');

const name = 'Tool';
const tableName = 'Tool';

const selectableProps = [
  'id',
  'tool_name',
  'description',
  'updated_at',
  'created_at'
];

module.exports = (knex) => {
  const knexHelper = knexModelHelper({
    knex,
    name,
    tableName,
    selectableProps
  });

  return {
    ...knexHelper
  };
};

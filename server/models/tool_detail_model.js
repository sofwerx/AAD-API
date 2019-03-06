const knexModelHelper = require('../helpers/knex-model-helper');

const name = 'ToolDetail';
const tableName = 'ToolDetail';

const selectableProps = [
  'id',
  'detail_key',
  'detail_value'
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

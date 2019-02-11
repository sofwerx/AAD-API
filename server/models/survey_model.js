const knexModelHelper = require('../helpers/knex-model-helper');

const name = 'Survey';
const tableName = 'Survey';

const selectableProps = [
  'id',
  'tool_id',
  'survey_name',
  'is_active',
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

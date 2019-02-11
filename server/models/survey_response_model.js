const knexModelHelper = require('../helpers/knex-model-helper');

const name = 'SurveyResponse';
const tableName = 'SurveyResponse';

const selectableProps = [
  'id',
  'user_id',
  'survey_id',
  'is_public',
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

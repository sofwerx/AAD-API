const knexModelHelper = require('../helpers/knex-model-helper');

const name = 'SurveyResponse';
const tableName = 'SurveyResponse';

const selectableProps = [
  'SurveyResponse.id',
  'user_id',
  'survey_id',
  'is_public',
  'SurveyResponse.created_at'
];

module.exports = (knex) => {
  const knexHelper = knexModelHelper({
    knex,
    name,
    tableName,
    selectableProps
  });

  const findAllByUserId = (userId) => {
    return knex.select(...selectableProps, 'Survey.survey_name', 'Tool.tool_name  ')
      .from(tableName)
      .join('Survey', 'Survey.id', 'SurveyResponse.survey_id')
      .join('Tool', 'Tool.id', 'Survey.tool_id')
      .where({ user_id: userId })
      .timeout(1000);
  };

  return {
    ...knexHelper,
    findAllByUserId
  };
};

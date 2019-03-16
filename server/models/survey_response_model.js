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
      .orderBy('created_at', 'desc')
      .timeout(1000);
  };

  const findById = (surveyResponseId) => {
    return knex.select(...selectableProps, 'Survey.survey_name', 'Tool.tool_name')
      .from(tableName)
      .join('Survey', 'Survey.id', 'SurveyResponse.survey_id')
      .join('Tool', 'Tool.id', 'Survey.tool_id')
      .where({ 'SurveyResponse.id': surveyResponseId })
      .timeout(1000)
      .first();
  };

  return {
    ...knexHelper,
    findAllByUserId,
    findById
  };
};

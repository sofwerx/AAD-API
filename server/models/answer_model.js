const knexModelHelper = require('../helpers/knex-model-helper');

const name = 'Answer';
const tableName = 'Answer';

const selectableProps = [
  'id',
  'survey_response_id',
  'question_id',
  'answer_text',
  'answer_numeric',
  'answer_bool'
];

const selectablePropsForSurveyResponse = [
  'question_id',
  'QuestionType.short_name as question_type',
  'question_text',
  'question_order',
  'answer_text',
  'answer_numeric',
  'answer_bool'
];

module.exports = (knex) => {
  const knexHelper = knexModelHelper({
    knex,
    name,
    tableName,
    selectableProps
  });

  const findAllBySurveyResponseId = (surveyResponseId) => {
    return knex.select(...selectablePropsForSurveyResponse)
      .from('Answer')
      .join('Question', 'Question.id', 'Answer.question_id')
      .join('QuestionType', 'QuestionType.id', 'Question.question_type_id')
      .where({ survey_response_id: surveyResponseId })
      .orderBy('question_order', 'asc')
      .timeout(1000);
  };

  return {
    ...knexHelper,
    findAllBySurveyResponseId
  };
};

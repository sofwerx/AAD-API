const knexModelHelper = require('../helpers/knex-model-helper');

const name = 'Question';
const tableName = 'Question';

const selectableProps = [
  'question_type_id',
  'survey_id',
  'question_order',
  'question_text',
  'question_subtext',
  'is_required',
  'updated_at',
  'created_at'
];

const surveySelectableProps = [
  'Question.id as id',
  'Question.question_order',
  'Question.question_text',
  'Question.question_subtext',
  'Question.is_required',
  'Question.question_type_id',
  'QuestionType.short_name as question_type',
  'QuestionType.is_multiple_choice'
];

module.exports = (knex) => {
  const knexHelper = knexModelHelper({
    knex,
    name,
    tableName,
    selectableProps
  });

  const findQuestionsBySurveyId = (surveyId) => {
    return knex.select(...surveySelectableProps)
      .from('Question')
      .join('QuestionType', 'QuestionType.id', 'Question.question_type_id')
      .where({ survey_id: surveyId })
      .orderBy('question_order', 'asc')
      .timeout(1000);
  };

  return {
    ...knexHelper,
    findQuestionsBySurveyId
  };
};

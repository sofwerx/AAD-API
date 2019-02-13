const knexModelHelper = require('../helpers/knex-model-helper');

const name = 'AnswerOption';
const tableName = 'AnswerOption';

const selectableProps = [
  'id',
  'answer_option_value',
  'option_order'
];

module.exports = (knex) => {
  const knexHelper = knexModelHelper({
    knex,
    name,
    tableName,
    selectableProps
  });

  const findAnswerOptions = ((questionTypeId, questionId) => {
    return knex.select(...selectableProps)
      .from(tableName)
      .where({ question_id: questionId })
      .orWhere({ question_type_id: questionTypeId })
      .orderBy('option_order', 'asc')
      .timeout(1000);
  });

  return {
    ...knexHelper,
    findAnswerOptions
  };
};

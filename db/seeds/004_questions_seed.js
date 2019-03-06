const sampleQuestionTypeData = require('../sample_data/question_type_sample');
const defaultAnswerOptionsData = require('../sample_data/answer_option_default_sample');
const surveyQuestionsData = require('../sample_data/survey_questions_sample');

exports.seed = (knex, Promise) => {
  return knex('QuestionType').insert(sampleQuestionTypeData)
    .then((questionTypeResult) => {
      const AnswerOptionPromises = [];
      defaultAnswerOptionsData.forEach((answerOptionSet) => {
        const questionType = answerOptionSet.question_type;
        answerOptionSet.values.forEach((answerValue, index) => {
          const answerOption = { answer_option_value: answerValue, option_order: index };
          AnswerOptionPromises.push(createDefaultAnswerOption(knex, answerOption, questionType));
        });
      });
      return Promise.all(AnswerOptionPromises);
    })
    .then(() => {
      const questionPromises = [];
      surveyQuestionsData.forEach((question) => {
        const questionType = question.question_type;
        const surveyName = question.survey_name;
        questionPromises.push(createQuestion(knex, question, questionType, surveyName));
      });
      return Promise.all(questionPromises);
    });
};

const createDefaultAnswerOption = (knex, answerOption, questionType) => {
  return knex('QuestionType').where('short_name', questionType).first()
    .then((questionTypeRecord) => {
      return knex('AnswerOption').insert({
        question_type_id: questionTypeRecord.id,
        answer_option_value: answerOption.answer_option_value,
        option_order: answerOption.option_order
      });
    });
};

const createQuestion = (knex, question, questionType, surveyName) => {
  let questionTypeRecord;
  let surveyRecord;

  return knex('QuestionType').where('short_name', questionType).first()
    .then((questionTypeResp) => {
      questionTypeRecord = questionTypeResp;
      return knex('Survey').where('survey_name', surveyName).first();
    })
    .then((surveyResp) => {
      surveyRecord = surveyResp;
    })
    .then(() => {
      return knex('Question').insert({
        survey_id: surveyRecord.id,
        question_type_id: questionTypeRecord.id,
        question_text: question.question_text,
        question_subtext: question.question_subtext,
        is_required: question.is_required,
        question_order: question.question_order
      });
    });
};

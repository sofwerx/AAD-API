const surveyAnswerData = require('../sample_data/survey_answers_sample');

exports.seed = (knex, Promise) => {
  const surveyAnswersPromises = [];
  surveyAnswerData.forEach((answer) => {
    const { username, question_text: questionText } = answer;
    surveyAnswersPromises.push(createSurveyAnswers(knex, answer, questionText, username));
  });
  return Promise.all(surveyAnswersPromises);
};

const createSurveyAnswers = (knex, answer, questionText, username) => {
  let surveyResponseRecord;
  let userRecord;
  let questionRecord;

  return knex('User').where('username', username).first()
    .then((user) => {
      userRecord = user;
      return knex('SurveyResponse').where('user_id', userRecord.id).first();
    })
    .then((surveyResponse) => {
      surveyResponseRecord = surveyResponse;
      return knex('Question').where('question_text', questionText).first();
    })
    .then((question) => {
      questionRecord = question;
      return knex('Answer').insert({
        survey_response_id: surveyResponseRecord.id,
        question_id: questionRecord.id,
        answer_text: answer.answer_text
      });
    });
};

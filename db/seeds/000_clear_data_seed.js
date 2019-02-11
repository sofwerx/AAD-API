exports.seed = (knex, Promise) => {
  return knex('Answer').del()
    .then(deletedAnswers => knex('SurveyResponse').del())
    .then(deletedSurveyResponse => knex('AnswerOption').del())
    .then(delAnswerOption => knex('Question').del())
    .then(delQuestion => knex('QuestionType').del())
    .then(delQuestionType => knex('Survey').del())
    .then(delSurvey => knex('ToolDetail').del())
    .then(delToolDetail => knex('Tool').del())
    .then(delTool => knex('User').del())
    .then(delUser => knex('UserRole').del());
};

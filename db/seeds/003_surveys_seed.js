const sampleSurveyData = require('../sample_data/surveys_sample');

exports.seed = (knex, Promise) => {
  Promise.resolve()
    .then(() => {
      const surveyPromises = [];
      sampleSurveyData.forEach((survey) => {
        const toolName = survey.tool_name;
        surveyPromises.push(createSurvey(knex, survey, toolName));
      });
      return Promise.all(surveyPromises);
    });
};

const createSurvey = (knex, survey, toolName) => {
  return knex('Tool').where('tool_name', toolName).first()
    .then((tool) => {
      return knex('Survey').insert({
        tool_id: tool.id,
        survey_name: survey.survey_name,
        is_active: survey.is_active
      });
    });
};

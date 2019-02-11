const surveyResponseData = require('../sample_data/survey_response_sample');

exports.seed = (knex, Promise) => {
  const surveyResponsePromises = [];
  surveyResponseData.forEach((surveyResponse) => {
    const surveyName = surveyResponse.survey_name;
    const userName = surveyResponse.username;
    surveyResponsePromises.push(createSurveyResponse(knex, surveyResponse, surveyName, userName));
  });
  return Promise.all(surveyResponsePromises);
};

const createSurveyResponse = (knex, surveyResponse, surveyName, userName) => {
  let surveyRecord;
  let userRecord;
  return knex('User').where('username', userName).first()
    .then((userResp) => {
      userRecord = userResp;
      return knex('Survey').where('survey_name', surveyName).first();
    })
    .then((surveyResp) => {
      surveyRecord = surveyResp;

      return knex('SurveyResponse').insert({
        survey_id: surveyRecord.id,
        user_id: userRecord.id,
        is_public: surveyResponse.is_public
      });
    });
};

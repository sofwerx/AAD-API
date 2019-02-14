const { SurveyResponse, Answer } = require('../models');

const surveyResponseIndex = (req, res, next) => {
  let where = {};
  if (req.query.public) {
    where = { is_public: req.query.public };
  }

  SurveyResponse.find(where)
    .then(surveyResponses => res.json({
      surveyResponses
    }))
    .catch(next);
};

const getSurveyResponse = (req, res, next) => {
  const surveyResponseId = req.params.survey_response_id;
  let surveyResponse;

  SurveyResponse.findById(surveyResponseId)
    .then((surveyResponseRecord) => {
      surveyResponse = surveyResponseRecord;
      return Answer.findAllBySurveyResponseId(surveyResponseId);
    })
    .then((answerRecords) => {
      surveyResponse.answers = answerRecords;
      return res.json({
        surveyResponse
      });
    })
    .catch(next);
};

const createSurveyResponse = (req, res, next) => {
  const props = req.body.surveyResponse;

  SurveyResponse.create({ ...props })
    .then(surveyResponse => res.json({
      surveyResponse
    }))
    .catch(next);
};

// TODO Unimplemeneted
const updateSurveyResponse = (req, res, next) => {
  const surveyResponseId = req.params.id;
};

const deleteSurveyResponse = (req, res, next) => {
  const surveyResponseId = req.params.id;

  SurveyResponse.destroy(surveyResponseId)
    .then((recordsDeleted) => {
      res.status(204).end();
    })
    .catch(next);
};

module.exports = {
  surveyResponseIndex,
  getSurveyResponse,
  createSurveyResponse,
  updateSurveyResponse,
  deleteSurveyResponse
};

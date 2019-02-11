const { SurveyResponse } = require('../models');

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
  const surveyResponseId = req.params.id;

  SurveyResponse.findById(surveyResponseId)
    .then(surveyResponse => res.json({
      surveyResponse
    }))
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

const getSurveyResponsesByUserId = (req, res, next) => {
  const userId = req.params.id;

  SurveyResponse.find({ user_id: userId })
    .then(surveyResponse => res.json({
      surveyResponse
    }))
    .catch(next);
};

module.exports = {
  surveyResponseIndex,
  getSurveyResponse,
  createSurveyResponse,
  updateSurveyResponse,
  deleteSurveyResponse,
  getSurveyResponsesByUserId
};

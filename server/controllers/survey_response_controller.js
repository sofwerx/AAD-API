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
  let createdSurveyResponse;
  // survey_id, user_id, is_public
  const props = req.body.surveyResponse;
  SurveyResponse.create({
    user_id: props.user_id,
    survey_id: props.survey_id,
    is_public: props.is_public
  })
    .then((newSurveyResponseRecord) => {
      // Iterate Answers and Add Each
      createdSurveyResponse = newSurveyResponseRecord;
      props.answers.forEach((answer) => {
        answer.survey_response_id = newSurveyResponseRecord[0].id;
      });
      return Answer.create(props.answers);
    })
    .then(() => res.json({
      surveyResponse: createdSurveyResponse
    })).catch(next);
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
  deleteSurveyResponse
};

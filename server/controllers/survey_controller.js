const { Survey } = require('../models');

const surveyIndex = (req, res, next) => {
  let where = {};
  if (req.query.isActive) {
    where = { is_active: req.query.isActive };
  }

  Survey.find(where)
    .then(surveys => res.json({
      surveys
    }))
    .catch(next);
};

const getSurvey = (req, res, next) => {
  const surveyId = req.params.id;

  Survey.findById(surveyId)
    .then((survey) => {
      // survey[0].survey_name = {asd: "asd"};
      console.log(survey);
      res.json({
        survey
      });
    })
    .catch(next);
};

// TODO Revisit after error handling implemented
const deleteSurvey = (req, res, next) => {
  const surveyId = req.params.id;

  Survey.destroy(surveyId)
    .then((recordsDeleted) => {
      res.status(204).end();
    })
    .catch(next);
};

const getSurveysByToolId = (req, res, next) => {
  const toolId = req.params.id;

  Survey.find({ tool_id: toolId })
    .then(surveys => res.json({
      surveys
    }))
    .catch(next);
};

module.exports = {
  surveyIndex,
  getSurvey,
  getSurveysByToolId,
  deleteSurvey
};

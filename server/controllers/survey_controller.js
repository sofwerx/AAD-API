const { Survey, Question, AnswerOption } = require('../models');

const surveyIndex = (req, res, next) => {
  let where = {};
  if (req.query.isActive) {
    where = { is_active: req.query.isActive };
  }

  return Survey.find(where)
    .then(surveys => res.json({
      surveys
    }))
    .catch(next);
};

const getSurvey = (req, res, next) => {
  const surveyId = req.params.survey_id;
  let constructedSurvey;
  let questions;

  Survey.findById(surveyId)
    .then((surveyRecord) => {
      constructedSurvey = surveyRecord;
      return Question.findQuestionsBySurveyId(surveyId);
    })
    .then((questionRecords) => {
      questions = questionRecords;

      return Promise.all(questions.map(populateQuestionAnswerOptions))
        .then(() => {
          constructedSurvey.questions = questions;
          res.json({
            survey: constructedSurvey
          });
        });
    })
    .catch(next);
};

const populateQuestionAnswerOptions = (question) => {
  return AnswerOption.findAnswerOptions(question.question_type_id, question.id)
    .then((answerOptions) => {
      question.answerOptions = answerOptions;
    });
};

const deleteSurvey = (req, res, next) => {
  const surveyId = req.params.survey_id;

  Survey.destroy(surveyId)
    .then((recordsDeleted) => {
      res.status(204).end();
    })
    .catch(next);
};

const getSurveysByToolId = (req, res, next) => {
  const toolId = req.params.tool_id;

  return Survey.find({ tool_id: toolId })
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

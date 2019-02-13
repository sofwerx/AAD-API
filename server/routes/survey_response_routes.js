const express = require('express');

const router = express.Router();

const {
  surveyResponseIndex,
  getSurveyResponse,
  createSurveyResponse,
  updateSurveyResponse,
  deleteSurveyResponse
} = require('../controllers/survey_response_controller');

router.route('/survey_responses')
  .get(surveyResponseIndex)
  .post(createSurveyResponse);

router.route('/survey_responses/:survey_response_id')
  .get(getSurveyResponse)
  .put(updateSurveyResponse)
  .delete(deleteSurveyResponse);

module.exports = router;

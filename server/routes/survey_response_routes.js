const express = require('express');
const auth = require('../helpers/auth_helper');

const router = express.Router();

const {
  surveyResponseIndex,
  getSurveyResponse,
  createSurveyResponse,
  deleteSurveyResponse
} = require('../controllers/survey_response_controller');

router.route('/survey_responses')
  .all(auth.required)
  .get(surveyResponseIndex)
  .post(createSurveyResponse);

router.route('/survey_responses/:survey_response_id')
  .all(auth.required)
  .get(getSurveyResponse)
  .delete(deleteSurveyResponse);

module.exports = router;

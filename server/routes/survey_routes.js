const express = require('express');

const router = express.Router();

const {
  surveyIndex,
  getSurvey,
  deleteSurvey
} = require('../controllers/survey_controller');

router.route('/surveys')
  .get(surveyIndex);

router.route('/surveys/:survey_id')
  .get(getSurvey);

router.route('/surveys/:survey_id')
  .delete(deleteSurvey);

module.exports = router;

const express = require('express');
const auth = require('../helpers/auth_helper');

const router = express.Router();

const {
  surveyIndex,
  getSurvey,
  deleteSurvey
} = require('../controllers/survey_controller');

router.route('/surveys')
  .all(auth.required)
  .get(surveyIndex);

router.route('/surveys/:survey_id')
  .all(auth.required)
  .get(getSurvey);

router.route('/surveys/:survey_id')
  .all(auth.required)
  .delete(deleteSurvey);

module.exports = router;

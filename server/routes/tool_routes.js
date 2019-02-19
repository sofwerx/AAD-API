const express = require('express');
const auth = require('../helpers/auth_helper');

const router = express.Router();

const {
  createTool,
  getTool,
  toolsIndex,
  getToolSurveys
} = require('../controllers/tool_controller');

const {
  getSurveysByToolId
} = require('../controllers/survey_controller');

router.route('/tools')
  .all(auth.required)
  .get(toolsIndex)
  .post(createTool);

router.route('/tools/:tool_id/surveys')
  .all(auth.required)
  .get(getToolSurveys);

router.route('/tools/:tool_id/surveys/:survey_id')
  .all(auth.required)
  .get(getSurveysByToolId);

router.route('/tools/:tool_id')
  .all(auth.required)
  .get(getTool);

module.exports = router;

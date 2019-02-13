const express = require('express');

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
  .get(toolsIndex)
  .post(createTool);

router.route('/tools/:tool_id/surveys')
  .get(getToolSurveys);

router.route('/tools/:tool_id/surveys/:survey_id')
  .get(getSurveysByToolId);

router.route('/tools/:tool_id')
  .get(getTool);

module.exports = router;

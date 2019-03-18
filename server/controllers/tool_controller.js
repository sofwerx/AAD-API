const {
  Tool, ToolDetail, Survey, SurveyResponse, Answer
} = require('../models');

const toolsIndex = (req, res, next) => {
  Tool.toolsIndex()
    .then((tools) => {
      tools.map((tool) => {
        tool.activeSurveys = Number.parseInt(tool.activeSurveys, 10);
        return tool;
      });

      return Promise.all(tools.map(populateToolDetails))
        .then(() => {
          // constructedSurvey.questions = questions;
          return res.json({
            tools
          });
        });
      // return res.json({
      //   tools
      // });
    })
    .catch(next);
};

const createTool = (req, res, next) => {
  const props = req.body.tool;

  Tool.create({ ...props })
    .then(project => res.json({
      project
    }))
    .catch(next);
};

const getTool = (req, res, next) => {
  const toolId = req.params.tool_id;
  Tool.findById(toolId)
    .then((tool) => {
      Promise.all([populateToolDetails(tool)])
        .then(() => {
          res.json({
            tool
          });
        })
        .catch(next);
    });
};

const getToolSurveys = (req, res, next) => {
  const toolId = req.params.tool_id;
  let isActiveWhere = {};
  if (req.query.isActive) {
    isActiveWhere = { is_active: req.query.isActive };
  }

  Survey.find({ ...isActiveWhere, tool_id: toolId })
    .then((surveys) => {
      res.json({
        surveys
      });
    })
    .catch(next);
};

const getSurveyResponsesByToolId = (req, res, next) => {
  const toolId = req.params.tool_id;
  SurveyResponse.findAllByToolId(toolId)
    .then(
      (surveyResponses) => {
        return Promise.all(surveyResponses.map(
          surveyResponse => retrieveSurveyResponseAnswers(surveyResponse)
        ));
      }
    )
    .then((surveyResponses) => {
      return res.json({
        surveyResponses
      });
    }).catch(next);
};

// Private Methods
const retrieveSurveyResponseAnswers = (surveyResponse) => {
  return Answer.findAllBySurveyResponseId(surveyResponse.id)
    .then((answerRecords) => {
      surveyResponse.answers = answerRecords;
      return surveyResponse;
    });
};

const populateToolDetails = (tool) => {
  return ToolDetail.find({ tool_id: tool.id })
    .then((toolDetails) => {
      tool.toolDetails = toolDetails;
    });
};

module.exports = {
  createTool,
  getTool,
  toolsIndex,
  getToolSurveys,
  getSurveyResponsesByToolId
};

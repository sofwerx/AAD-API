const { Tool, Survey } = require('../models');

const toolsIndex = (req, res, next) => {
  Tool.toolsIndex()
    .then(
      (tools) => {
        tools.map((tool) => {
          tool.activeSurveys = Number.parseInt(tool.activeSurveys, 10);
          return tool;
        });
        return res.json({
          tools
        });
      }
    )
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
    .then(tool => res.json({
      tool
    }))
    .catch(next);
};

const getToolSurveys = (req, res, next) => {
  const toolId = req.params.tool_id;
  Survey.find({ tool_id: toolId })
    .then((surveys) => {
      res.json({
        surveys
      });
    })
    .catch(next);
};


module.exports = {
  createTool,
  getTool,
  toolsIndex,
  getToolSurveys
};

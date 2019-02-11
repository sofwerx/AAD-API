const { Tool, Survey } = require('../models');

const toolsIndex = (req, res, next) => {
  Tool.findAll()
    .then(tools => res.json({
      tools
    }))
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
  const toolId = req.params.id;
  Tool.findById(toolId)
    .then(tool => res.json({
      tool
    }))
    .catch(next);
};

const getToolSurveys = (req, res, next) => {
  const toolId = req.params.id;
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

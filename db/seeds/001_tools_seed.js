const toolData = require('../sample_data/tools_sample');
const toolPermissionData = require('../sample_data/tool_permission_sample');


exports.seed = (knex, Promise) => {
  return knex('Tool').insert(toolData)
    .then(() => {
      const toolPermissionPromises = [];
      toolPermissionData.forEach((toolPermission) => {
        const toolName = toolPermission.tool_name;
        toolPermissionPromises.push(createToolPermission(knex, toolPermission, toolName));
      });
      return Promise.all(toolPermissionPromises);
    });
};

const createToolPermission = ((knex, toolDetail, toolName) => {
  return knex('Tool').where('tool_name', toolName).first()
    .then((tool) => {
      return knex('ToolPermission').insert({
        tool_id: tool.id,
        permission_type: toolDetail.permission_type,
        is_global: toolDetail.is_global
      });
    });
});

const toolData = require('../sample_data/tools_sample');
const toolPermissionData = require('../sample_data/tool_permission_sample');
const toolDetailData = require('../sample_data/tool_details_sample');

exports.seed = (knex, Promise) => {
  return knex('Tool').insert(toolData)
    .then(() => {
      const toolPermissionPromises = [];
      toolPermissionData.forEach((toolPermission) => {
        const toolName = toolPermission.tool_name;
        toolPermissionPromises.push(createToolPermission(knex, toolPermission, toolName));
      });
      return Promise.all(toolPermissionPromises);
    }).then(
      () => {
        const toolDetailPromises = [];
        toolDetailData.forEach((toolDetail) => {
          const toolName = toolDetail.tool_name;
          toolDetailPromises.push(createToolDetail(knex, toolDetail, toolName));
        });
        return Promise.all(toolDetailPromises);
      }
    );
};

const createToolPermission = ((knex, toolPermission, toolName) => {
  return knex('Tool').where('tool_name', toolName).first()
    .then((tool) => {
      return knex('ToolPermission').insert({
        tool_id: tool.id,
        permission_type: toolPermission.permission_type,
        is_global: toolPermission.is_global
      });
    });
});

const createToolDetail = ((knex, toolDetail, toolName) => {
  return knex('Tool').where('tool_name', toolName).first()
    .then((tool) => {
      return knex('ToolDetail').insert({
        tool_id: tool.id,
        detail_key: toolDetail.detail_key,
        detail_value: toolDetail.detail_value
      });
    });
});

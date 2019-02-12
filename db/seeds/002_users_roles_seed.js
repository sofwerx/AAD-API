const sampleUserData = require('../sample_data/users_sample');
const globalPermissionData = require('../sample_data/global_permission_sample');
const userToolPermissionsData = require('../sample_data/user_tool_permissions_sample');

exports.seed = (knex, Promise) => {
  Promise.resolve()
    .then(() => {
      const userPromises = [];
      sampleUserData.forEach((user) => {
        userPromises.push(createUser(knex, user));
      });
      return Promise.all(userPromises);
    }).then(() => {
      const globalPermissionPromises = [];
      globalPermissionData.forEach((globalPermission) => {
        globalPermissionPromises.push(createGlobalPermission(knex, globalPermission));
      });
      return Promise.all(globalPermissionPromises);
    })
    .then(() => {
      const userToolPermissionsPromises = [];
      userToolPermissionsData.forEach((userToolPermissions) => {
        userToolPermissionsPromises.push(createUserToolPermissions(knex, userToolPermissions));
      });
      return Promise.all(userToolPermissionsPromises);
    });
};

const createUser = (knex, user) => {
  return knex('User').insert({
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    job_title: user.job_title,
    company: user.company
  });
};

const createGlobalPermission = ((knex, globalPermission) => {
  return knex('User').where('username', globalPermission.username).first()
    .then((user) => {
      return knex('GlobalPermission').insert({
        user_id: user.id,
        permission_type: globalPermission.permission_type
      });
    });
});

const createUserToolPermissions = (knex, userToolPermissions) => {
  let userId;
  let toolPermissionId;
  return knex('User').where('username', userToolPermissions.username).first()
    .then((user) => {
      userId = user.id;
    })
    .then(() => {
      return knex.select('ToolPermission.id as tool_permission_id').from('ToolPermission')
        .join('Tool', 'Tool.id', 'ToolPermission.tool_id')
        .where('Tool.tool_name', userToolPermissions.tool_name)
        .where('ToolPermission.permission_type', userToolPermissions.permission_type)
        .first();
    })
    .then((result) => {
      return knex('UserToolPermissions').insert({
        user_id: userId,
        tool_permission_id: result.tool_permission_id
      });
    });
};

const sampleUserData = require('../sample_data/users_sample');
const sampleRoleData = require('../sample_data/roles_sample');

exports.seed = (knex, Promise) => {
  return knex('UserRole').insert(sampleRoleData)
    .then((rolesCreated) => {
      const userPromises = [];
      sampleUserData.forEach((user) => {
        const userRolename = user.rolename;
        userPromises.push(createUser(knex, user, userRolename));
      });
      return Promise.all(userPromises);
    });
};

const createUser = (knex, user, rolename) => {
  knex('UserRole').where('rolename', rolename).first().then((userRoleRecord) => {
    return knex('User').insert({
      role_id: userRoleRecord.id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      job_title: user.job_title,
      company: user.company
    });
  });
};

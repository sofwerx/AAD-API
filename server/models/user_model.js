const knexModelHelper = require('../helpers/knex-model-helper');

const name = 'User';
const tableName = 'User';

const selectableProps = [
  'id',
  'username',
  'email',
  'first_name',
  'last_name',
  'job_title',
  'company',
  'updated_at',
  'created_at'

];

module.exports = (knex) => {
  const knexHelper = knexModelHelper({
    knex,
    name,
    tableName,
    selectableProps
  });

  return {
    ...knexHelper
  };
};

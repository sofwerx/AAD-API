const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

const loginSelectableProps = [
  'id',
  'username',
  'email',
  'password'
];

const SALT_ROUNDS = 10;
const hashPassword = password => bcrypt.hash(password, SALT_ROUNDS);
const verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

// Always perform this logic before saving to db. This includes always hashing
// the password field prior to writing so it is never saved in plain text.
const beforeSave = (user) => {
  if (!user.password) return Promise.resolve(user);
  return hashPassword(user.password)
    .then(hash => ({ ...user, password: hash }))
    .catch(err => `Error hashing password: ${err}`);
};

module.exports = (knex) => {
  const knexHelper = knexModelHelper({
    knex,
    name,
    tableName,
    selectableProps
  });

  const generateJWT = (email, id) => {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
      email,
      id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, 'secret');
  };

  const create = props => beforeSave(props)
    .then(user => knexHelper.create(user));

  const update = (userId, props) => beforeSave(props)
    .then(user => knexHelper.update(userId, user));

  const validatePassword = (user, password) => {
    return verifyPassword(password, user.password);
  };

  const findForLogin = (filters) => {
    return knex.select(loginSelectableProps)
      .from(tableName)
      .where(filters)
      .timeout(knexHelper.timeout)
      .then((results) => {
        if (!Array.isArray(results)) return results;
        return results[0];
      });
  };

  return {
    ...knexHelper,
    create,
    update,
    validatePassword,
    findForLogin,
    generateJWT
  };
};

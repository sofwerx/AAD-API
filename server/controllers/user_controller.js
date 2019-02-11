const { User } = require('../models');

const usersIndex = (req, res, next) => {
  User.findAll()
    .then(users => res.json({
      users
    }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const props = req.body.user;

  User.create({ ...props })
    .then(user => res.json({
      user
    }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const userId = req.params.id;
  const props = req.body.user;

  User.update(userId, props)
    .then(user => res.json({
      user
    }))
    .catch(next);
};
const getUser = (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId)
    .then(user => res.json({
      user
    }))
    .catch(next);
};
// TODO Unimplemented
const getUserPermissions = (req, res, next) => {
};

module.exports = {
  usersIndex,
  createUser,
  updateUser,
  getUser,
  getUserPermissions
};

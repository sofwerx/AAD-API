const passport = require('passport');
const { SurveyResponse, User } = require('../models');

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
  const userId = req.params.user_id;
  const props = req.body.user;

  User.update(userId, props)
    .then(user => res.json({
      user
    }))
    .catch(next);
};
const getUser = (req, res, next) => {
  const userId = req.params.user_id;

  User.findById(userId)
    .then(user => res.json({
      user
    }))
    .catch(next);
};

const deleteUser = (req, res, next) => {
  const userId = req.params.user_id;

  User.destroy(userId)
    .then((deleteCount) => {
      return res.sendStatus(202);
    })
    .catch(next);
};


// TODO Unimplemented
const getUserPermissions = (req, res, next) => {
};

const getSurveyResponsesByUserId = (req, res, next) => {
  const userId = req.params.user_id;
  SurveyResponse.findAllByUserId(userId)
    .then(surveyResponses => res.json({
      surveyResponses
    }))
    .catch(next);
};

const loginUser = (req, res, next) => {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }
  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }
  return passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      const token = User.generateJWT(user.email, user.id);
      user.password = undefined;
      return res.json({ user, token });
    }
    return res.status(422).json(info);
  })(req, res, next);
};

module.exports = {
  usersIndex,
  createUser,
  updateUser,
  getUser,
  deleteUser,
  getUserPermissions,
  getSurveyResponsesByUserId,
  loginUser
};

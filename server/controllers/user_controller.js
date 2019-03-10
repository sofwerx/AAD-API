const passport = require('passport');
const jwt = require('express-jwt');
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
  const { username, email, password } = req.body.user;
  // Validate inputs
  if (!username) {
    return res.status(422).json({ errors: { Username: "can't be blank" } });
  }
  if (!email) {
    return res.status(422).json({ errors: { Email: "can't be blank" } });
  }
  if (!password) {
    return res.status(422).json({ errors: { Password: "can't be blank" } });
  }
  // Search for Users with username.
  return User.find({ username }).then((userRecordByUsername) => {
    // Throw error if User with Username is found.
    if (userRecordByUsername.length > 0) return res.status(422).json({ errors: { Warning: ': Username already in use.' } });
    return User.find({ email });
  }).then((userRecordByEmail) => {
    // Throw error if User with email is found.
    if (userRecordByEmail.length > 0) return res.status(422).json({ errors: { Warning: ': Email already in use.' } });
    // Return new User if valid.
    return User.create({ ...props })
      .then((newUserRecord) => {
        const token = User.generateJWT(newUserRecord[0].username, newUserRecord[0].id);
        return res.json({
          user: newUserRecord[0],
          token
        });
      });
  }).catch(next);
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

const getCurrentUser = (req, res, next) => {
  return User.findById(req.payload.id)
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
  if (!req.body.user.username) {
    return res.status(422).json({ errors: { Username: "can't be blank" } });
  }
  if (!req.body.user.password) {
    return res.status(422).json({ errors: { Password: "can't be blank" } });
  }
  return passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      const token = User.generateJWT(user.username, user.id);
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
  getCurrentUser,
  deleteUser,
  getUserPermissions,
  getSurveyResponsesByUserId,
  loginUser
};

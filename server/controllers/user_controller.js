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
const inviteToSlack = (req, res, next) => {
  const slackGroup = process.env.SLACK_GROUP;
  const slackTeam = process.env.SLACK_TEAM;
  const token = process.env.SLACK_TOKEN;


  const url = `https://${slackTeam}.slack.com/api/users.admin.invite`;
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `token=${token}&email=${req.body.email}&channels=${slackGroup}`
  })
    .then(slackResult => slackResult.json())
    .then(json => res.json(json))
    .catch(err => res.status(500).json(JSON.stringify(err)));
};

module.exports = {
  usersIndex,
  createUser,
  updateUser,
  getUser,
  getUserPermissions,
  inviteToSlack
};

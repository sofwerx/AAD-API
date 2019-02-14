const express = require('express');

const router = express.Router();

const {
  usersIndex,
  createUser,
  updateUser,
  getUser,
  getUserPermissions,
  getSurveyResponsesByUserId
} = require('../controllers/user_controller');

router.route('/users')
  .get(usersIndex)
  .post(createUser);

router.route('/users/:user_id')
  .get(getUser)
  .put(updateUser);

router.route('/users/:user_id/permissions')
  .get(getUserPermissions);

router.route('/users/:user_id/survey_responses')
  .get(getSurveyResponsesByUserId);

module.exports = router;

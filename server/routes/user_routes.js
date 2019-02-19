const express = require('express');
const auth = require('../helpers/auth_helper');

const router = express.Router();

const {
  usersIndex,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
  getUserPermissions,
  getSurveyResponsesByUserId
} = require('../controllers/user_controller');

router.route('/users/login')
  .all(auth.optional)
  .post(loginUser);

router.route('/users')
  .all(auth.required)
  .get(usersIndex)
  .post(createUser);

router.route('/users/:user_id')
  .all(auth.required)
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/users/:user_id/permissions')
  .all(auth.required)
  .get(getUserPermissions);

router.route('/users/:user_id/survey_responses')
  .all(auth.required)
  .get(getSurveyResponsesByUserId);

module.exports = router;

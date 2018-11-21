const express = require('express')
const router = express.Router()
const knex = require('../knex')

const updateUsername = (req, res, next) => {
  console.log("here is the req.body", req.body)
  console.log("Here is the current username", req.body.currentUsername)
  console.log("Here is the new username", req.body.newUsername)
  knex('users')
  .where("username", req.body.currentUsername)
  .update({ username: req.body.newUsername })
  .then(result => res.json(result))
  .catch(() => res.status(500))
}
router.patch('/',  updateUsername)
module.exports = router
const express = require('express')
const router = express.Router()
const knex = require('../knex')

const updateFullName = (req, res, next) => {
  knex('users')
  .where("id", req.body.user_id)
  .update({ firstName: req.body.firstName, lastName: req.body.lastName })
  .then(result => res.json(result))
  .catch(() => res.status(500))
}
router.patch('/',  updateFullName)
module.exports = router
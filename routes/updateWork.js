const express = require('express')
const router = express.Router()
const knex = require('../knex')

const updateWork = (req, res, next) => {
  knex('users')
  .where("id", req.body.user_id)
  .update({ jobTitle: req.body.jobTitle, company: req.body.company })
  .then(result => res.json(result))
  .catch(() => res.status(500))
}
router.patch('/',  updateWork)
module.exports = router
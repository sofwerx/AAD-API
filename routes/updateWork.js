const express = require('express')
const router = express.Router()
const knex = require('../knex')

const updateReviewsWork = (req, res, next) => {
  knex('reviews')
  .where('username', req.body.username)
  .update({ company: req.body.company,
            jobTitle: req.body.jobTitle })
  .then(result => next())
  .catch(() => res.status(500))
}

const updateWork = (req, res, next) => {
  knex('users')
  .where("id", req.body.user_id)
  .update({ jobTitle: req.body.jobTitle, company: req.body.company })
  .then(result => res.json(result))
  .catch(() => res.status(500))
}
router.patch('/',  updateReviewsWork, updateWork)
module.exports = router
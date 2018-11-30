const express = require('express')
const router = express.Router()
const knex = require('../knex')


const updateReviewsFullName = (req, res, next) => {
  knex('reviews')
  .where('username', req.body.username)
  .update({ firstName: req.body.firstName, 
            lastName: req.body.lastName})
  .then(result => next())
  .catch(() => res.status(500))
}
const updateFullName = (req, res, next) => {
  knex('users')
  .where("id", req.body.user_id)
  .update({ firstName: req.body.firstName, lastName: req.body.lastName })
  .then(result => res.json(result))
  .catch(() => res.status(500))
}
router.patch('/',  updateReviewsFullName, updateFullName)
module.exports = router
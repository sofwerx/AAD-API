const express = require('express')

const router = express.Router()
const knex = require('../knex')

const deleteAnswerSet = (req, res, next) => {
  knex('answers')
  .where('review_id', req.body.reviewId)
  .del()
  .then(() => next())
  .catch(err => next())
} 

const deleteReview = (req, res, next) => {
    return knex('reviews')
    .where('id', req.body.reviewId)
      .del()
      .then((result) => {
        res.json(result)
      })
  }

router.delete('/', deleteAnswerSet, deleteReview)
module.exports = router
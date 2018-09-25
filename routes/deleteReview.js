const express = require('express')

const router = express.Router()
const knex = require('../knex')

const deleteReview = (req, res, next) => {
    return knex('reviews')
    .where('id', req.body.reviewId)
      .del()
      .then((result) => {
        res.json(result)
      })
  }

router.delete('/', deleteReview)
module.exports = router
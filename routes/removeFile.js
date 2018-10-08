const express = require('express')

const router = express.Router()
const knex = require('../knex')

const removeFile = (req, res, next) => {
    return knex('reviews')
    .where('id', req.body.reviewId)
      .update({
          path: null
      })
      .then((result) => {
        res.json(result)
      })
  }

router.patch('/', removeFile)
module.exports = router
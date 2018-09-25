const express = require('express')

const router = express.Router()
const knex = require('../knex')

const updateReview = (req, res, next) => { 
    return knex('reviews')
      .where('id', req.body.reviewId)
      .update({
          tool_name: req.body.toolName,
          text: req.body.text
      })
      .returning('*')
      .then((result) => {
        res.send(result)
      })
  }


router.patch('/', updateReview)
module.exports = router
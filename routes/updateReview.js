const express = require('express')

const router = express.Router()
const knex = require('../knex')

const updateReviewNameText = (req, res, next) => { 
    return knex('reviews')
      .where('id', req.body.reviewId)
      .update({
          tool_name: req.body.toolName,
          text: req.body.text,
      })
      .returning('*')
      .then((result) => {
        if(req.body.blob) {
          next()
        } else {
          res.end()
        }
      })
  }


  const updateReviewBlobs = (req, res, next) => { 
    return knex('blobs')
      .where('review_id', req.body.review_id)
      .update({
          blob: req.body.blob
      })
      .returning('*')
      .then((result) => {
        res.send(result)
      })
  } 


router.patch('/', updateReviewNameText, updateReviewBlobs)
module.exports = router
const express = require('express')
const router = express.Router()
const knex = require('../knex')

const getAllPublicReviews = (req, res, next) => {
    return knex('reviews')
    .where('sharable', true)
      .select('*')
      .orderBy('id', 'asc')
      .then((result) => {        
        res.json(result)

      })
  }

router.get('/', getAllPublicReviews)
module.exports = router
const express = require('express')
const router = express.Router()
const knex = require('../knex')

const getAllReviews = (req, res, next) => {
    const username = req.params.username
    return knex('reviews')
    .where('username', username)
      .select('*')
      .orderBy('id', 'asc')
      .then((result) => {        
        res.json(result)

      })
  }

router.get('/:username', getAllReviews)
module.exports = router
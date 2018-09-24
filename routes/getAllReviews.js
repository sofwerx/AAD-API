const express = require('express')

const router = express.Router()
const knex = require('../knex')

const getAllReviews = (req, res, next) => {
    const payload = jwt.verify(req.cookies.aad_token, KEY)
    return knex('reviews')
    .where('user_id', payload.id)
      .select('*')
      .then((result) => {
        res.json(result)
      })
  }

router.get('/', getAllReviews)
module.exports = router
const express = require('express')

const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const KEY = process.env.JWT_KEY


const editSaveToggle = (req, res, next) => {  
  const payload = jwt.verify(req.cookies.aad_token, KEY)
    return knex('reviews')
      .where('id', req.body.reviewId)
      .update({
          editable: !req.body.editable
      })
      .returning('*')
      .then((result) => {
        res.json(result)
      })
  }

router.patch('/', editSaveToggle)
module.exports = router
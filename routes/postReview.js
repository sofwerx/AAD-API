const express = require('express')
const env = require('dotenv').config()
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const KEY = process.env.JWT_KEY

const postReview = (req, res, next) => {
    const payload = jwt.verify(req.cookies.aad_token, KEY)
    knex('reviews')
      .insert({
        tool_name: req.body.toolName,
        user_id: payload.id,
        text: req.body.text
      })
      .returning('*')
      .then((result) => {
        res.json(result)
      })
      .catch(() => {
          res.status(500)
      })
  }

  router.post('/', postReview)
  module.exports = router
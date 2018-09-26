const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const KEY = process.env.JWT_KEY


const checkCookie = (req, res, next) => {
    if (req.cookies.aad_token) {
      const payload = jwt.verify(req.cookies.aad_token, KEY)
      knex('users')
        .where('username', payload.username)
        .then((result) => {
          res.json({ message: 'Success', payload })
        })
    } else {
      res.json({ message: 'NO AAD COOKIES' })
    }
  }

  router.get('/', checkCookie)
  module.exports = router
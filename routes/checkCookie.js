const express = require('express')
const env = require('dotenv').config()
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const KEY = process.env.JWT_KEY


const checkCookie = (req, res, next) => {
    if (req.cookies.aad_token) {
      const payload = jwt.verify(req.cookies.aad_token, KEY)
      knex('users')
        .select('id')
        .where('username', payload.username)
        .then((result) => {
          res.json({ message: 'Success', payload, id: result[0].id })
        })
    } else {
      res.json({ message: 'NO AAD COOKIES' })
    }
  }

  router.get('/', checkCookie)
  module.exports = router
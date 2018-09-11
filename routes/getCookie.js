const express = require('express')
const env = require('dotenv').config()
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const KEY = process.env.JWT_KEY

const getCookie = (req, res, next) => {
    console.log('COOKIES', req.cookies)
    if (req.cookies.aad_token) {
      const payload = jwt.verify(req.cookies.aad_token, KEY)
      console.log('PAYLOAD', payload)
      knex('users')
      .select('id')
      .where('username', payload.username)
        .then((result) => {
          res.json({ message: 'Success', payload, id: result[0].id })
        })
    } else {
      res.json({ message: 'Failed' })
    }
  }

  router.get('/', getCookie)  
  module.exports = router
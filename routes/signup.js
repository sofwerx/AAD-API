const express = require('express')
const env = require('dotenv').config()
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const KEY = process.env.JWT_KEY

const { validateBody, schemas } = require('../helpers/route-helpers')

const addUser = (req, res, next) => {
    const saltRounds = 10
    const plaintextPassword = req.body.signupPassword
    const hashedPass = bcrypt.hashSync(plaintextPassword, saltRounds)
    knex('users')
      .insert({
        username: req.body.signupUsername,
        email: req.body.signupEmail,
        hashed_password: hashedPass
      })
      .returning(['id'])
      .then((result) => {
        const aad_token = jwt.sign({
          username: req.body.signupUsername,
          id: result[0].id
        }, KEY)
        res.cookie('aad_token', aad_token, { maxAge: 90000000 })
        res.status(200).json({ message: 'success' })
      })
  }

  router.post('/', validateBody(schemas.signup), addUser)
  module.exports = router
const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const KEY = process.env.JWT_KEY


const { validateBody, schemas } = require('../helpers/route-helpers')
const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3001'

const signup = (req, res, next) => {
    let  aad_token;
    const saltRounds = 10
    const plaintextPassword = req.body.signupPassword
    const hashedPass = bcrypt.hashSync(plaintextPassword, saltRounds)
    knex('users')
      .insert({
        username: req.body.signupUsername,
        email: req.body.signupEmail,
        hashed_password: hashedPass
      })
      .returning(['username'])
      .then((result) => {
        // aad_token = jwt.sign({
        //   username: req.body.signupUsername,
        //   id: result[0].id
        // }, KEY)
        // res.cookie('aad_token', aad_token, {HttpOnly: false} )
        res.json(result)
      })
  }

  router.post('/', validateBody(schemas.signup), signup)
  module.exports = router
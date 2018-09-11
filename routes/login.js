const express = require('express')
const env = require('dotenv').config()

const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const KEY = process.env.JWT_KEY

const { validateBody, schemas } = require('../helpers/route-helpers')

const loginUser = (req, res, next) => {
    knex('users')
      .where('username', req.body.loginUsername)
      .select('hashed_password', 'id')
      .then((result) => {
        const storedHash = result[0].hashed_password
        bcrypt.compare(req.body.loginPassword, storedHash, (err, passwordsMatch) => {
          if (passwordsMatch && req.cookies.fstoken === undefined) {
            const fstoken = jwt.sign({
              username: req.body.loginUsername,
              id: result[0].id 
            }, KEY)
            res.cookie('fstoken', fstoken, { httpOnly: true })
            res.status(200).json({ message: 'success' })
          } else if (passwordsMatch && req.cookies.fstoken !== undefined) {
            res.status(200).json({ message: 'success' })
          } else {
            res.status(200).json({ message: 'fail' })
          }
        })
      })
  }

router.post('/', validateBody(schemas.login), loginUser)
module.exports = router
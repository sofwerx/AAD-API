const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const { validateBody, schemas } = require('../helpers/route-helpers')

const loginUser = (req, res, next) => {
    knex('users')
      .where('username', req.body.loginUsername)
      .select('hashed_password', 'id')
      .then((result) => {
        const storedHash = result[0].hashed_password
        bcrypt.compare(req.body.loginPassword, storedHash, (err, passwordsMatch) => {
          if (passwordsMatch && req.cookies.aad_token === undefined) {
            res.status(200).json({ message: 'Success' })
          } else {
            res.status(500).json({ message: 'fail' })
          }
        })
      })
  }

router.post('/', validateBody(schemas.login), loginUser)
module.exports = router
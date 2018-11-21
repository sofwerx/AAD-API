const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')

const validateCurrentPasswordInput = (req, res, next) => {
    knex('users')
      .where('username', req.params.username)
      .select('hashed_password', 'id')
      .then((result) => {
        const storedHash = result[0].hashed_password
        bcrypt.compare(req.params.currentPasswordInput, storedHash, (err, passwordsMatch) => {
          if (passwordsMatch && req.cookies.aad_token === undefined) {
            res.status(200).json({ message: 'Success' })
          } else {
            res.status(200).json({ message: 'fail' })
          }
        })
      })
  }
router.get('/:username/:currentPasswordInput', validateCurrentPasswordInput)
module.exports = router
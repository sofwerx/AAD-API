
const express = require('express')
const router = express.Router()
const knex = require('../knex')

const getUserInfo = (req, res, next) => {
    return knex('users')
      .where('username', req.params.username)
      .select(['username', 'email', 'firstName', 'lastName', 'jobTitle', 'company', 'role'])
      .then((result) => {
        res.json(result)
      })
  }

router.get('/:username', getUserInfo)
module.exports = router
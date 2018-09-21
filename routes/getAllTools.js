const express = require('express')

const router = express.Router()
const knex = require('../knex')

const getAllTools = (req, res, next) => {
    return knex('tools')
      .select('*')
      .then((result) => {
        res.json(result)
      })
  }

router.get('/', getAllTools)
module.exports = router
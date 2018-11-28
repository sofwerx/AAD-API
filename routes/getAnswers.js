
const express = require('express')
const router = express.Router()
const knex = require('../knex')

const getAnswers = (req, res, next) => {
    return knex('answers')
      .where('tool_name', req.params.tool_name)
      .select("*")
      .then((result) => {
        res.json(result)
      })
  }

router.get('/:tool_name', getAnswers)
module.exports = router
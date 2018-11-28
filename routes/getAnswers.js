const express = require('express')
const router = express.Router()
const knex = require('../knex')

const getAnswers = (req, res, next) => {
    const selected_tool_name = req.params.tool_name == "MEADE" ? "MEADE/SORT-OE" : req.params.tool_name
    return knex('answers')
    .where('tool_name', selected_tool_name)
      .select('*')
      .then((result) => {        
        res.json(result)
      })
  }

router.get('/:tool_name', getAnswers)
module.exports = router
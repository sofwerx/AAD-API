const express = require('express')
const router = express.Router()
const knex = require('../knex')

const addTool = (req, res, next) => {
    knex('users')
      .insert({
          name: this.params.name,
          url: this.params.url,
          description: this.params.description
      })
      .returning("*")
      .then((result) => { 
        res.json(result)
      })
  }

  router.post('/:name/:url/:description', addTool)
  module.exports = router
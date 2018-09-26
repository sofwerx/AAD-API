const express = require('express')

const router = express.Router()
const knex = require('../knex')

const editSaveToggle1 = (req, res, next) => { 
    return knex('reviews')
      .where('id', req.body.reviewId)
      .update({
          editable: !req.body.editable
      })
      .returning('*')
      .then((result) => {
        next()
      })
  }

  const editSaveToggle2 = (req, res, next) => {  
      return knex('reviews')
        .whereNot('id', req.body.reviewId)
        .update({
            editable: false
        })
        .returning('*')
        .then((result) => {
          res.json(result)
        })
    }

router.patch('/', editSaveToggle1, editSaveToggle2)
module.exports = router
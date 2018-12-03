const express = require('express')
const router = express.Router()
const knex = require('../knex')
let reviewIDs;
const getAnswers = (req, res, next) => {
      return knex('answers')
      .where('tool_name', req.body.tool_name)  
      .select("*")
        .then((result) => {
        reviewIDs = result.map(answer => answer.review_id)
          next()
        })
        .catch(err => err)
}

const postAnswers = (req, res, next) => {
    if(!reviewIDs.includes(req.body.review_id) && req.body.answer_1.length > 0){
        knex('answers')
        .insert(req.body)
        .then(r => res.json(r))
        .catch(err => err)
    } else {
        res.end()
    }
}




router.post('/', getAnswers, postAnswers)
module.exports = router
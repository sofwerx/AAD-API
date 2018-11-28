const express = require('express')
const router = express.Router()
const knex = require('../knex')
const multer  = require('multer')
const path = require('path');
const storage = multer.diskStorage({
    destination:  (req, file, cb) => cb(null, './public/uploads'),
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage})

const saveAnswers = (req, res, next) => {
    let answerObect = {}
    for (let key in req.body) {
        if (key.substring(0,6) === 'answer') {
            answerObect[key] = req.body[key]
        }
    }
    answerObect['tool_name'] = req.body.toolName
    knex('answers')
    .insert(answerObect)
    .then(() => next())
    .catch(err => err)
}



const postReview = (req, res, next) => { 
    const username = req.body.username
    if(req.file){
        
        knex('reviews')
        .insert({
            tool_name: req.body.toolName,
            username,
            text: req.body.text,
            editable: false,
            path: req.file.path,
            sharable: req.body.sharable,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            jobTitle: req.body.jobTitle,
            company: req.body.company,
            rating: req.body.rating,
            answer_1: req.body.answer_1,
            answer_2: req.body.answer_2,
            answer_3: req.body.answer_3,
            answer_4: req.body.answer_4,
            answer_5: req.body.answer_5
            })
            .returning('id')
            .then((result) => {
                res.json(result)
            })
            .catch(() => {
                res.status(500)
            })

    } else {
        knex('reviews')
            .insert({
                tool_name: req.body.toolName,
                username,
                text: req.body.text,
                editable: false,
                sharable: req.body.sharable,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                jobTitle: req.body.jobTitle,
                company: req.body.company,
                rating: req.body.rating,
                answer_1: req.body.answer_1,
                answer_2: req.body.answer_2,
                answer_3: req.body.answer_3,
                answer_4: req.body.answer_4,
                answer_5: req.body.answer_5
              })
              .returning('id')
              .then((result) => {
                  res.json(result)
              })
              .catch(() => {
                  res.status(500)
              })
    }
  }


  router.post('/',  upload.single('uploadedFile'), saveAnswers, postReview)
  module.exports = router
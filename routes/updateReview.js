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

const updateReview = (req, res, next) => { 

    if(req.file){
      knex('reviews')
      .where('id', req.body.reviewId)
        .update({
            tool_name: req.body.toolName,
            text: req.body.textInput,
            path: req.file.path,
            sharable: req.body.sharable,
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
      .where('id', req.body.reviewId)
      .update({
          tool_name: req.body.toolName,
          text: req.body.textInput,
          sharable: req.body.sharable,
          rating: req.body.rating,
          answer_1: req.body.answer_1,
          answer_2: req.body.answer_2,
          answer_3: req.body.answer_3,
          answer_4: req.body.answer_4,
          answer_5: req.body.answer_5
      })
      .returning('*')
      .then((result) => {
        res.json(result)
      })
      .catch(() => {
        res.status(500)
      })
  }
}


  


router.patch('/', upload.single('uploadedFile'), updateReview)
module.exports = router
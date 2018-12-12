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
const postReview = (req, res, next) => { 
    const username = req.body.username
    if(req.file){
        knex('reviews')
        .insert({
            tool_name: req.body.toolName,
            username,
            text: req.body.text,
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
            answer_5: req.body.answer_5,
            int_type: req.body.int_type
        })
        .returning('id')
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    } else {
        knex('reviews')
        .insert({
            tool_name: req.body.toolName,
            username,
            text: req.body.text,
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
            answer_5: req.body.answer_5,
            int_type: req.body.int_type
        })
        .returning('id')
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }
  }


  router.post('/',  upload.single('uploadedFile'), postReview)
  module.exports = router
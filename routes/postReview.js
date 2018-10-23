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
    console.log('REQ.BODY.SHARABLE', req.body.sharable)
    const username = req.body.username
    if(req.file){
        
        knex('reviews')
        .insert({
            tool_name: req.body.toolName,
            username,
            text: req.body.text,
            editable: false,
            path: req.file.path,
            sharable: req.body.sharable
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
                sharable: req.body.sharable
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


  router.post('/',  upload.single('uploadedFile'), postReview)
  module.exports = router
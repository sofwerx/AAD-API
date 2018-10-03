const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const KEY = process.env.JWT_KEY
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
    const payload = jwt.verify(req.cookies.aad_token, KEY)
    if(req.file){
        
    knex('reviews')
        .insert({
            tool_name: req.body.toolName,
            user_id: payload.id,
            text: req.body.text,
            editable: false,
            path: req.file.path
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
                user_id: payload.id,
                text: req.body.text,
                editable: false
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
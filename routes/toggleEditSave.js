const express = require('express')

const router = express.Router()
const knex = require('../knex')

const toggleEditSave = (req, res, next) => {
    const payload = jwt.verify(req.cookies.aad_token, KEY)
    return knex('reviews')
    .where('user_id', payload.id)
    .where('tool_name', req.body.toolName)
      .update({
          editable: !req.body.editable
      })
      returning('*')
      .then((result) => {
        res.json(result)
      })
  }

router.get('/', toggleEditSave)
module.exports = router
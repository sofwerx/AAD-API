const express = require('express')
const router = express.Router()
const knex = require('../knex')

const updateUsername = (req, res, next) => { 
  console.log('HERE IS THE CURRENT USERNAME', req.body.currentUsername)
  console.log('HERE IS THE NEW USERNAME', req.body.newUsername)
  return knex('users')
  .where("username", req.body.currentUsername)
  .update({ username: req.body.newUsername })
  .returning("username")
  .then(result => {
    console.log('HER6E IS THE RESULT FROM UPDATE USERNAME', result)
    res.json(result)
  })
  .catch(() => {
    res.status(500)
  })
}
router.patch('/',  updateUsername)
module.exports = router
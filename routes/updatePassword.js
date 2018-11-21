const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')

const verifyOldPassword = (req, res, next) => {
    console.log('HERE IS THE REQ.BODY', req.body)
    knex('users')
      .where('username', req.body.username)
      .select('hashed_password', 'id')
      .then((result) => {
        const storedHash = result[0].hashed_password
        bcrypt.compare(req.body.currentPassword, storedHash, (err, passwordsMatch) => {
          if (passwordsMatch && req.cookies.aad_token === undefined) {
            next()
          } else {
            res.status(500).json({ message: 'fail' })
          }
        })
      })
  }

const updatePassword = (req, res, next) => { 
  const saltRounds = 10
  const plaintextPassword = req.body.newPassword
  const hashedPass = bcrypt.hashSync(plaintextPassword, saltRounds)
  return knex('users')
  .where("username", req.body.username)
  .update({ hashed_password: hashedPass })
  .then(result => {
    console.log('HERE IS THE RESULT FROM UPDATE PASSWORD', result)
    res.json(result)
  })
  .catch(() => {
    res.status(500)
  })
}
router.patch('/', verifyOldPassword, updatePassword)
module.exports = router
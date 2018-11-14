const express = require('express')

const router = express.Router()
const knex = require('../knex')

let role
const getRole = (req, res, next) => {
    return knex('users')
    .select("role")
    .where('username', req.body.username)
        .then((result) => {
        role = result.role
        })
  }

const authorizeUser = (req, res, next) => {
    return knex('permissons')
    .select("read", "write", "publish")
    .where('role', role)
        .then((result) => {
            
            res.send(result)
        })
}

router.delete('/', getRole, authorizeUser)
module.exports = router
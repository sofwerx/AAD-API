const express = require('express')

const router = express.Router()
const knex = require('../knex')

let role
const getRole = (req, res, next) => {
    return knex('users')
    .select("role")
    .where('username', req.params.username)
        .then((result) => {
        role = result[0].role
        next()
        })
  }

const authorizeUser = (req, res, next) => {
    return knex('permissions')
    .select("read", "write", "publish")
    .where('role', role)
        .then((result) => {
            let resultObj = result[0]
            let permissions = []
            for(let key in resultObj) {
                resultObj[key] ? permissions.push(key) : null
            }
            res.send(permissions)
        })
}

router.get('/:username', getRole, authorizeUser)
module.exports = router
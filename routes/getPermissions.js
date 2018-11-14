const express = require('express')

const router = express.Router()
const knex = require('../knex')

const getPermissions = (req, res, next) => {
    return knex('permissions')
    .select("read", "write", "publish")
    .where('role', req.params.role)
        .then((result) => {
            let resultObj = result[0]
            let permissions = []
            for(let key in resultObj) {
                resultObj[key] ? permissions.push(key) : null
            }
            res.send(permissions)
        })
}

router.get('/:role', getPermissions)
module.exports = router
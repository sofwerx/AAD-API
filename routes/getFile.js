const express = require('express')
const router = express.Router()
const fs = require('fs');

const getFile = (req, res, next) => {
    fs.readFile(
        `./public/uploads/${req.params.path}`, 'base64',
        (err, base64) => {
            if(base64){
                return res.send({file: base64, review_id: req.params.reviewId, path: `./public/uploads/${req.params.path}`} );
            } else {
                return res.send({file: 'none'})
            }
        }
    )
}

router.get('/:path/:reviewId', getFile)
module.exports = router
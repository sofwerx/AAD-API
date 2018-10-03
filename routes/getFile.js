const express = require('express')
const router = express.Router()
const fs = require('fs');

const getFile = (req, res, next) => {
    fs.readFile(
        `./public/uploads/${req.params.path}`,
        (err, bufferArr) => {
            if(bufferArr){
                return res.send({file: bufferArr, review_id: req.params.reviewId, path: `./public/uploads/${req.params.path}`} );
            } else {
                return res.send({file: 'none'})
            }
        }
    )
}

router.get('/:path/:reviewId', getFile)
module.exports = router
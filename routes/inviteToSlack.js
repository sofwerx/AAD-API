const express = require('express')
const router = express.Router()
const fetch =   require('node-fetch');


const inviteToSlack = (req, res, next) => {
    const slackGroup = process.env.SLACK_GROUP
    const slackTeam = process.env.SLACK_TEAM
    const token = process.env.SLACK_TOKEN; 
    

    const url = 'https://'+ slackTeam + '.slack.com/api/users.admin.invite';
    fetch(url, { 
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: "token="+ token + "&email=" + req.body.email + "&channels=" + slackGroup
    })
    .then(slack_result => slack_result.json())
    .then(json => res.json(json))
    .catch(err => res.status(500).json(JSON.stringify(err)))
}

    
router.post('/', inviteToSlack)
module.exports = router

const express = require('express')
const router = express.Router()
const fetch =   require('node-fetch');


const inviteToSlack = (req, res, next) => {
    const slackTeam = "aadspace";
    const token = process.env.SLACK_TOKEN; 
    
    const url = 'https://'+ slackTeam + '.slack.com/api/users.admin.invite';
    return fetch(url, { 
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: "token="+ token + "&email=" + req.body.email,
        credentials: 'include',
        crossDomain: true
    })
    .then(res => {
        return res
    })
    .catch(err => console.log('Invite to Slack Failed', err));
}

    
router.post('/', inviteToSlack)
module.exports = router
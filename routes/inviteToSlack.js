const express = require('express')
const router = express.Router()
const fetch =   require('node-fetch');


const inviteToSlack = (req, res, next) => {
    const slackTeam = "aadspace";
    const token = process.env.SLACK_TOKEN; 
    
    const url = 'https://'+ slackTeam + '.slack.com/api/users.admin.invite';
    console.log("Inviting to " + slackTeam + " url=" + url);
    fetch(url, { 
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: "token="+ token + "&email=" + req.body.email
    })
    .then(slack_result => slack_result.json())
    .then(json => {
        console.log("Invited! json=" + JSON.stringify(json));
        res.json(json);
    })
    .catch(err => {
    		console.log('Invite to Slack Failed', err)
		res.status(500).json(JSON.stringify(err));
	}
    );
}

    
router.post('/', inviteToSlack)
module.exports = router

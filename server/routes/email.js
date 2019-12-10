const router = require('express').Router()
const request = require('superagent') 




router.post('/', (req,res) => {
  console.log(req.body)
  const email = req.body.email
  const group = req.body.group
  const total_cost = req.body.totalSpend.totalSpent
  const group_members = 0
 


  const subject = `Splinter - ${group} invoice`

  const message = `This is your invoice for ${group} 
  Total Cost: $${total_cost/100}
  
  Group Members:
  ${req.body.members.map(member => {
    return member
  })}
  

  Time to pay up!`
  

  request.post('https://api.sendgrid.com/v3/mail/send')
  .set("Authorization", "Bearer " + process.env.SENDGRID_API_KEY)
  .send(
    {
        "personalizations": [
          {
            "to": [
              {
                "email": email
              }
            ],
            "subject": subject
          }
        ],
        "from": {
          "email": "splinterapp@example.com"
        },
        "content": [
          {
            "type": "text/plain",
            "value": message
          }
        ]
      }
).then(apiResponse => {
    console.log('message sent', message)
    res.json(apiResponse)
})
.catch(err => {
  console.error(err)
})


})

module.exports = router
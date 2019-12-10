import request from 'superagent'

const url = "/api/email"


export function apiSendEmail(emailAddress, groupName, total, name){
  return request
  .post(url)
  .send({email: emailAddress,
  group: groupName, totalSpend: total, members: name})
  .then(res=> res.body)
}
import request from 'superagent'

const url = "/api/groups"


export function getGroupsByUser(id){
  return request
  .get(`api/groups/${id}`)
  .then(res=> res.body
  )
}

export function apiGetGroupMembers(groupId){
  return request
  .get(`api/groups/members/${groupId}`)
  .then(res => res.body)
}
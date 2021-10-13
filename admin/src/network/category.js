// const request = require('./request')
import {request} from './request'

// export function getCategory(model){
//   return request({
//     url:'categories',
//     methods:'post',
//     params:model
//   })
// }


export function getCategory(){
  return request({
    url:'rest/categories',
  })
}
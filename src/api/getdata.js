import request from '@/utils/request'
export function getdata(params) {
  return request({
    url:'/getdata',
    method:'get',
    params:params
  })
}

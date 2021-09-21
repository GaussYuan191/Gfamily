import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */

    const res = response.data
    if (response.status !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })

      return Promise.reject('error')
    } else {
      return Promise.resolve(res);
    }
  }
)

export default service

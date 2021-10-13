const axios = require('axios')

export function request(config){
  // 创建 axios 实例
  const instance = axios.create({
    baseURL:'http://localhost:3000/admin/api',
    timeout:5000
  })

  // axios 拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}
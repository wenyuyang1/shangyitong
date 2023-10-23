import axios from 'axios'
import { ElMessage } from 'element-plus'

import { useLogin } from '@/store/login'
// 挑选带有api的接口进行axios请求，请求地址则在vite的proxy跨域中写明服务器地址
const request = axios.create({
    // 代理时，地址依旧是原本的127.0.0.1
    baseURL: '/api',
    timeout: 5000,
})
// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 请求时带上token
        let store = useLogin()
        if (store.token) {
            config.headers.token = store.token
        }
        return config
    }
)
// 响应拦截器
request.interceptors.response.use((response) => {
    let res = response.data
    return res
}, err => {
    // 配置不同http状态码的不同返回信息
    let status = err.response.status
    switch (status) {
        case 401:
            ElMessage.error('登录失效，请重新登录')
            break
        case 403:
            ElMessage.error('无权限访问')
            break
        case 404:
            ElMessage.error('请求地址不存在')
            break
        case 500 | 501 | 502 | 503 | 504 | 505:
            ElMessage.error('服务器内部错误')
            break
        default:
            ElMessage.error('请求失败')
            break
    }
    return Promise.reject(new Error('请求失败'))
})



export default request
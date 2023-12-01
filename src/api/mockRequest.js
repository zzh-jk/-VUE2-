//二次封装axios
import axios from 'axios'
//设置响应进度条
import nprogress from 'nprogress'
//引入样式
import 'nprogress/nprogress.css'
const mockRequest = axios.create({
        baseURL: '/mock',
        timeout: 5000
    })
    //请求拦截器，在发请求之前可做一些操作
mockRequest.interceptors.request.use((config) => {
    //config:配置对象，对象里面有一个属性很重要,headers请求头
    nprogress.start()
    return config
})

// 响应拦截器
mockRequest.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
}, (err) => {
    return Promise.reject(new Error('请求失败'))
})

export default mockRequest
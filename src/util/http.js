import axios from 'axios';
import qs from 'qs'
import vue from 'vue'
import toast from '@/components/toast'
vue.use(toast)
let v = new vue();
// 创建axios实例
const instance = axios.create({ timeout: 1000 * 12 });
const base = "/api"
// const base = "http://127.0.0.1:8000/api"
/** 
 * 请求拦截器 
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            break;
        // 404请求不存在
        case 404:
            v.$toast.error("404 not found")
            break;
        case 500:
            v.$toast.error("服务器正在维修")
            break;
        default:
            v.$toast.error("未知错误")
            console.log(other);
    }
}

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token")
        token && (config.headers.token = token);
        config.headers.token = "token"
        return config;
    },
    error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res),
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if (!window.navigator.onLine) {
                console.log("network error")
            } else {
                return Promise.reject(error);
            }
        }
    });

function get(url, params) {
    url = base + url
    return instance.get(url, {
        params: params
    })
}
function post(url, params, headers) {
    url = base + url
    params = headers && headers["Content-Type"] ? params : qs.stringify(params)
    return instance.post(url, params, headers)
}

export default {
    get,
    post
}
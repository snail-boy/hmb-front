import axios from 'axios'
import {S_Message_Time, S_No_Auth, S_No_Login, S_OK, S_Toast_Time} from './constant'
import { Notify, Toast } from 'vant'
import {aesEncrypt} from "./crypto";
import {uuid} from './index'
import Cookies from 'js-cookie'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || '',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // request timeout
  // headers: { 'content-type': 'application/json; charset=utf-8','Cache-Control': 'no-cache', timeStamp, signature: aesEncrypt(timeStampFun()) }
  headers: { 'content-type': 'application/json; charset=utf-8' }
})

let time = ''
let toast = ''
const message = '加载中...'
let uuidStr = ''
let timeStamp =  ''
let aesEncryptData = ''
let signature = ''
import config from '../../package.json'
let appVersion = config.version

service.interceptors.request.use(
  config => {
    if(config.url.indexOf('open/v1/backTracking/checkRecording') > -1  || config.url.indexOf('open/v1/backTracking/save') > -1 || config.url.indexOf('open/v1/backTracking/fluentAdd') > -1) {
      // to do
      config.headers.internaltoken = '4023b357470e4604994fcb6683cc74f7'
      config.headers.appVersion = appVersion
    }else {
      uuidStr = uuid()
      timeStamp = new Date().getTime()
      if(config.method === 'post') {
        aesEncryptData = JSON.stringify(config.data) + timeStamp + uuidStr
      }else {
        if (config.url && config.url.split('?').length > 1) {
          aesEncryptData =  config.url.split('?')[1] + timeStamp + uuidStr
        }else {
          aesEncryptData = timeStamp + uuidStr
        }
      }
      signature = aesEncrypt(aesEncryptData)
      config.headers.timeStamp = timeStamp
      config.headers.signature = signature
      config.headers.nonce = uuidStr
      if (config.isLoading === 'Y') {
        time = new Date().getTime()
        toast = Toast.loading({
          message: message,
          loadingType: 'spinner',
          duration: 0
        })
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.config.isLoading === 'Y') {
      if ((new Date().getTime() - time) / 1000 <= 1 && res.code === S_OK || (new Date().getTime() - time) / 1000 <= 1 && res.code === S_OK) {
        toast.clear()
      } else if (!!res.code || !!res.code || !!response.status) {
        toast.clear()
      }
    }
    if (response.status === 200) {
      if (res.code === '11111') {
        Toast({ message: res.message, duration: S_Toast_Time })
        window.vue.$router.replace('/notAccess')
      } else if (res.code === S_OK && response.config.message === 'Y') {
        Toast({
          message: res.message,
          duration: S_Toast_Time
        })
      } else if (res.code !== S_OK && response.config.message === 'Y') {
        Toast({
          message: res.message,
          duration: S_Toast_Time
        })
      } else if (res.code === S_OK && response.config.message === 'EY') {
        // Notify({ type: 'danger', message: res.message, duration: 2000 })
      } else if (res.code !== S_OK && response.config.message === 'EY') {
        Toast({
          message: res.message,
          duration: S_Toast_Time
        })
        if (res.code === S_No_Login) {
          setTimeout(() => {
            window.vue.$router.push('/userCenter')
          }, S_Toast_Time)
        }else if(res.code === S_No_Auth) {
          setTimeout(() => {
            window.vue.$router.push('/real/noReal')
          }, S_Toast_Time)
        }
      }
      return res
    } else {
      Notify({type: 'warning', message: res.message, duration: S_Toast_Time })
    }
  },
  error => {
    if(error.config && error.config.url.indexOf('open/v1/backTracking/checkRecording') > -1 || error.config && error.config.url.indexOf('open/v1/backTracking/save') > -1 || error.config.url.indexOf('open/v1/backTracking/fluentAdd') > -1) {
      // to do
    }else {
      if (error.config.timeout && error.config.timeOut === 'timeOut' && JSON.stringify(error).indexOf('timeout of 20000ms exceeded') > -1) {
        Notify({ type: 'warning', message: "亲，当前在线参保人数较多，请稍后再试。", duration: S_Message_Time })
      } else {
        const code = error.response && error.response.status
        if (code === 500) {
          Notify({ type: 'danger', message: '服务内部错误，或是您的网络出现了问题', duration: S_Message_Time })
        } else if (code === 404) {
          Notify({ type: 'danger', message: '路径找不到、服务启动时报错', duration: S_Message_Time })
        } else if (code === 400) {
          Notify({ type: 'danger', message: '参数错误', duration: S_Message_Time })
        } else if (code === 502) {
          Notify({ type: 'danger', message: '服务器作为网关或代理，从上游服务器收到无效响应', duration: S_Message_Time })
        } else if (code === 504) {
          Notify({ type: 'danger', message: '服务器作为网关或代理，但是没有及时从上游服务器收到请求', duration: S_Message_Time })
        } else if (code === 503) {
          Notify({ type: 'danger', message: "亲，当前在线参保人数较多，请稍后再试。", duration: S_Message_Time })
        } else {
          Notify({ type: 'danger', message: '请求异常错误,请检查网络', duration: S_Message_Time })
        }
      }
      Toast.clear()
      return Promise.reject(error)
    }
  }
)
export default service

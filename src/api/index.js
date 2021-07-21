import { fetchApi } from '../utils/fetchApi'
export const getIphoneCode = params => fetchApi('/sms/getToken', params, 'GET', 'N', 'Y')
export const getQueryToken = params => fetchApi('/sms/getQueryToken', params, 'GET', 'N', 'Y')
export const getvalidata = params => fetchApi('/order/validate', params, 'POST', 'N', 'N')
export const initApi = params => fetchApi('/order/init', params, 'POST', 'EY', 'Y')
export const saveOrder = params => fetchApi('/order/save', params, 'POST', 'EY', 'Y')
export const payPolicy = params => fetchApi('/order/bcpPay', params, 'POST', 'EY', 'Y')
export const orderYbPay = params => fetchApi('/order/ybPay', params, 'POST', 'EY', 'Y')
export const searchOrder = params => fetchApi('/order/info', params, 'POST', 'N', 'Y')
export const cancelOrder = params => fetchApi('/order/cancel', params, 'POST', 'Y', 'Y')
export const orderDetail = params => fetchApi('/order/info/detail', params, 'POST', 'EY', 'Y')
export const refundOrder = params => fetchApi('/order/refund', params, 'POST', 'EY', 'Y')
export const companyAdd = params => fetchApi('/contact/company/add', params, 'POST', 'EY', 'Y')
export const bookingAdd = params => fetchApi('/api/booking/add', params, 'POST', 'N', 'Y')

// 微信自定义分享
export const wxticket = params => fetchApi('/order/wxticket', params, 'POST', 'N', 'N')
// 微信code 获取openid
export const authByCode = params => fetchApi('/wx/authByCode', params, 'GET', 'N', 'Y')
//
export const getAliPayOpenId = params => fetchApi('/alipay/authByCode', params, 'GET', 'N', 'Y')

// 获取支付宝参数
export const getAliPayParam = params => fetchApi('/alipay/medicarePay', params, 'GET', 'EY', 'Y')

// 电子凭证下载
export const getInsured = params => fetchApi('/order/info/insured', params, 'POST', 'N', 'Y')


// 校验订单信息
export const ordercheckBalance = params => fetchApi('/hzyb/checkBalance', params, 'POST', 'EY', 'Y')

// 订单支付获取验证码
export const getOrderPayToken = params => fetchApi('/sms/getPayToken', params, 'GET', 'N', 'Y')

// 退费短信验证
export const getRefundToken = params => fetchApi('/sms/getRefundToken', params, 'GET', 'N', 'Y')



let checkRecording, setValue, videoFinish, checkRecordingUrl, setValueUrl, videoUrl;
if (process.env.VUE_APP_MODE === 'development') {
  checkRecordingUrl = '/track/open/v1/backTracking/checkRecording'
  setValueUrl = '/track/open/v1/backTracking/save'
  videoUrl = '/track/open/v1/backTracking/fluentAdd'

}else if ( process.env.VUE_APP_MODE === 'test') {
  checkRecordingUrl = 'https://track-test.shie.com.cn/open/v1/backTracking/checkRecording'
  setValueUrl = 'https://track-test.shie.com.cn/open/v1/backTracking/save'
  videoUrl = 'https://track-test.shie.com.cn/open/v1/backTracking/fluentAdd'

}else if ( process.env.VUE_APP_MODE === 'production') {
  checkRecordingUrl = 'https://hmbtrack.shie.com.cn/open/v1/backTracking/checkRecording'
  setValueUrl = 'https://hmbtrack.shie.com.cn/open/v1/backTracking/save'
  videoUrl = 'https://hmbtrack.shie.com.cn/open/v1/backTracking/fluentAdd'
}

checkRecording = params => fetchApi(checkRecordingUrl, params, 'POST', 'N', 'N')
setValue = params => fetchApi(setValueUrl, params, 'POST', 'N', 'N')
videoFinish = params => fetchApi(videoUrl, params, 'POST', 'N', 'N')


export {
  checkRecording,
  setValue,
  videoFinish
}



let userInfo, loginByPhone, userIdentify, userSendSmsCode, userAccount, updateInfo, opinionAdd, confirmInfo, reConfirm, homeInfo, userLogout, userOrderList, userOrderDetail;


loginByPhone = params => fetchApi('/gateway/userCenter/open/v1/passport/loginByPhone', params, 'POST', 'EY', 'Y')

userIdentify = params => fetchApi('/gateway/userCenter/auth/v1/user/identify', params, 'POST', 'EY', 'Y')
// 获取用户信息
userInfo = params => fetchApi('/gateway/userCenter/aoe/v1/user/info', params, 'GET', 'EY', 'Y')

// 用户中心短信
userSendSmsCode = params => fetchApi('/gateway/facility/open/v1/sms/sendSmsCode', params, 'GET', 'EY', 'Y')

// 帐号信息
userAccount = params => fetchApi('/gateway/userCenter/auth/v1/user/info', params, 'GET', 'EY', 'Y')

// 更改账户信息
updateInfo = params => fetchApi('/gateway/userCenter/auth/v1/user/updateInfo', params, 'POST', 'Y', 'Y')

// 意见反馈
opinionAdd = params => fetchApi('/gateway/userCenter/auth/v1/opinion/add', params, 'POST', 'Y', 'Y')

// 获取重新认证信息
confirmInfo = params => fetchApi('/gateway/userCenter/auth/v1/user/confirmInfo', params, 'GET', 'EY', 'Y')

//确定
reConfirm = params => fetchApi('/gateway/userCenter/auth/v1/user/confirm', params, 'GET', 'Y', 'Y')

// 家庭信息
homeInfo = params => fetchApi('/gateway/userCenter/aoe/v1/user/homeInfo', params, 'GET', 'EY', 'Y')

// 解除微信绑定
userLogout = params => fetchApi('/gateway/userCenter/auth/v1/passport/logout', params, 'GET', 'Y', 'Y')

// 查看订单列表
userOrderList = params => fetchApi('/gateway/qdOrder/auth/v3/order/info', params, 'POST', 'EY', 'Y')

// 订单详情
userOrderDetail = params => fetchApi('/gateway/qdOrder/auth/v3/order/info/detail', params, 'POST', 'EY', 'Y')



export {
  userInfo,
  loginByPhone,
  userIdentify,
  userSendSmsCode,
  userAccount,
  updateInfo,
  opinionAdd,
  confirmInfo,
  reConfirm,
  homeInfo,
  userLogout,
  userOrderList,
  userOrderDetail
}

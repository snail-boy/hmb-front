/**
 * Created by jiachenpan on 16/11/18.
 */

import {aesDecrypt, aesEncrypt} from './crypto'
import md5 from 'js-md5'
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || time === null) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    // if ((typeof time === 'number') && (time.toString().length === 10)) {
    //   time = time / 1000
    // }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

export function getQueryObject2(url) {
  url = url == null ? window.location.href : url
  //const search = url.substring(url.lastIndexOf('/?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  url.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, '')
  }
}

export function toTop() {
  if (document.documentElement && document.documentElement.scrollTop) {
    document.documentElement.scrollTop = 0
  } else {
    document.body.scrollTop = 0
  }
}

// 倒计时
export function countTime(time) {
  const days = Math.floor(time / (60 * 60 * 24)) // 计算天数
  let hours = Math.floor(time / (60 * 60) % 24) // 计算小时数
  let mins = Math.floor(time / (60) % 60) // 计算分钟数
  let seconds = Math.floor(time / 1 % 60) // 计算秒数
  if (hours < 10) {
    hours = '0' + hours
  }
  if (mins < 10) {
    mins = '0' + mins
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return {
    days,
    hours,
    mins,
    seconds
  }
}

// 设置userInfo信息
export function setUserInfo(data) {
  sessionStorage.setItem('userInfo', aesEncrypt(data))
}

// 得到getUserInfo信息
export function getUserInfo() {
  if (sessionStorage.getItem('userInfo')) {
    return JSON.parse(aesDecrypt(sessionStorage.getItem('userInfo')))
  } else {
    return {}
  }
}

export function removeUserInfo() {
  sessionStorage.removeItem('userInfo')
}

export function goPage(shortURL) {
  window.location.href = shortURL
  // const open = window.open('about:blank')
  // const url = shortURL
  // if (open === null || typeof (open) === 'undefined') {
  //   window.location.href = url
  //   return
  // }
  // setTimeout(() => {
  //   open.location = url
  // }, 1000)
}

export function judegeAlipay() {
  let UA = navigator.userAgent;
  if (UA.indexOf("MicroMessenger") > -1) {
    return 'weChat'
  }
  // 支付宝
  // else if (userAgent.indexOf("AlipayClient") > -1 || userAgent.indexOf('DingTalk') > -1 || userAgent.indexOf('taobao') > -1 || userAgent.indexOf('T-UA') > -1) {
  else if (UA.indexOf("AlipayClient") > -1) {
    return 'AliPy'
  } else {
    return 'window'
  }
}

export function unStrictvalidatorID(val) {
  //return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(val)
  return validateIDCard(val)
}

export function validatorPureNumber(val) {
  return !/^\d+$/.test(val)
}


export function isDef(val) {
  return val !== undefined && val !== null;
}

//身份证校验
function validateIDCard(code) {
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
  var pass = true

  if (!code || !/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(code))  {
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    pass = false
  } else {
    // 18位身份证需要验证最后一位校验位
    if (code.length === 18) {
      code = code.split('')
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      // 校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      var parity1 = [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2]
      var sum = 0
      var ai = 0
      var wi = 0
      for (var i = 0; i < 17; i++) {
        ai = code[i]
        wi = factor[i]
        sum += ai * wi
      }
      if (parity[sum % 11] != code[17] && parity1[sum % 11] != code[17]) {
        pass = false
      }
    }
  }
  return pass
}

/**
 *01.校验身份证
 **/
export function validatorID(card) {
  var vcity = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
    21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
    33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
    42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
    51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
    63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
  }
  var checkIDCard = function (card) {
    //是否为空
    if (card === '') {
      return false;
    }
    //校验长度，类型
    if (isCardNo(card) === false) {
      return false;
    }
    //检查省份
    if (checkProvince(card) === false) {
      return false;
    }
    //校验生日
    if (checkBirthday(card) === false) {
      return false;
    }
    //检验位的检测
    if (checkParity(card) === false) {
      return false;
    }
    return true;
  }

  //检查号码是否符合规范，包括长度，类型
  var isCardNo = function (card) {
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (reg.test(card) === false) {
      return false;
    }
    return true;
  }
  //取身份证前两位,校验省份
  var checkProvince = function (card) {
    var province = card.substr(0, 2);
    if (vcity[province] == undefined) {
      return false;
    }
    return true;
  }
  //检查生日是否正确
  var checkBirthday = function (card) {
    var len = card.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len == '15') {
      var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
      var arr_data = card.match(re_fifteen);
      var year = arr_data[2];
      var month = arr_data[3];
      var day = arr_data[4];
      var birthday = new Date('19' + year + '/' + month + '/' + day);
      return verifyBirthday('19' + year, month, day, birthday);
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len == '18') {
      var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
      var arr_data = card.match(re_eighteen);
      var year = arr_data[2];
      var month = arr_data[3];
      var day = arr_data[4];
      var birthday = new Date(year + '/' + month + '/' + day);
      return verifyBirthday(year, month, day, birthday);
    }
    return false;
  }
  //校验日期
  var verifyBirthday = function (year, month, day, birthday) {
    var now = new Date();
    var now_year = now.getFullYear();
    //年月日是否合理
    if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
      //判断年份的范围（0岁到100岁之间)
      var time = now_year - year;
      if (time >= 0 && time <= 100) {
        return true;
      }
      return false;
    }
    return false;
  }
  //校验位的检测
  var checkParity = function (card) {
    //15位转18位
    card = changeFivteenToEighteen(card);
    var len = card.length;
    if (len == '18') {
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var cardTemp = 0, i, valnum;
      for (i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i];
      }
      valnum = arrCh[cardTemp % 11];
      if (valnum == card.substr(17, 1)) {
        return true;
      }
      return false;
    }
    return false;
  };
  //15位转18位身份证号
  var changeFivteenToEighteen = function (card) {
    if (card.length == '15') {
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
      var cardTemp = 0, i;
      card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
      for (i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i];
      }
      card += arrCh[cardTemp % 11];
      return card;
    }
    return card;
  }
  return checkIDCard(card);
}

// 其他证件号码
export function otherCertiCode(card) {
  if (!card) {
    return false
  }
  var creditNoRegexp = /^[^\u4e00-\u9fa5]{0,}$/;
  return creditNoRegexp.test(card);
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * @Description: 手机验证码提示
 * @author wangke
 * @date 2021-01-17
 */
// const smsCodeTimeRange = () => {
//   const nowTime = new Date().getTime()
//   // const frontTime = new Date('2020/12/31 18:00:00').getTime()
//   // const frontTime = new Date().getTime()
//   const endTime = new Date('2021/1/20 00:00:00').getTime()
//   // return frontTime < nowTime && nowTime < endTime;
//   return nowTime < endTime
// }

export const validatorIphone = (val) => {
  return /^1[2|3|4|5|6|7|8|9][0-9]{9}$/.test(val)
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

const isChina = (s) => {
  let patRn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
  return patRn.exec(s);
}


const uuid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}

const timeRangeTip = () => {
  const nowTime = new Date().getTime()
  const frontTime = new Date('2021/01/30 22:00:00').getTime()
  const endTime = new Date('2021/01/31 00:00:00').getTime()
  return frontTime < nowTime && nowTime < endTime;
}

const rrWebZip = function (str) {
  let binaryString = pako.gzip(encodeURIComponent(str), { to: 'string' })
  return btoa(binaryString);
}

export function isName() {
  // return /^([\u4e00-\u9fa5]{2,20}|[a-zA-Z.\s]{2,20})$/.test(s);
  return true
}

export function loadFile (name) { // name为文件所在位置
  let xhr = new XMLHttpRequest(),
    okStatus = document.location.protocol === "file:" ? 0 : 200;
  xhr.open('GET', name, false);
  xhr.overrideMimeType("text/word;charset=utf-8");//默认为utf-8
  xhr.send(null);
  return xhr.status === okStatus ? xhr.responseText : null;
}


function formatStr(str) {
  return str.substring(0,1) + new Array(str.length).join('*')
}


function Compress(strNormalString) {
  return md5(strNormalString)
}

/*
* 去除对象中不需要的属性*/
const omit = (obj, prop = '') => {
  if (!prop) {
    return false
  }
  const { [prop]: {}, ...newObj } = obj
  return newObj
}



export {
  timeRangeTip,
  isChina,
  uuid,
  rrWebZip,
  formatStr,
  Compress,
  omit
}

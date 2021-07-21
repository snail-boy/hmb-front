import Vue from 'vue'
import html2Canvas from 'html2canvas'
import {appId, S_OK, urlDomain} from "./constant";
import weChat from 'weixin-js-sdk'

import {wxticket} from "../api";
import {baseColor, bgColor, secondColor} from "../setting";
const globalColor = {
  baseColor: baseColor,
  bgColor: bgColor,
  secondColor: secondColor
}
let globalIsDownloadVoucher = false
const slidePage = function (val) {
  if (val === 'right') {
    window.vue.$router.go(-1)
  }
}

const formatterText = function (value) {
  return value.replace(/\d/g, '');
}

const getPdf = function (id, title, callback) {
  // let PDF = new JsPDF('', 'pt', 'a4')
  html2Canvas(document.querySelector(`#${id}`), {
    allowTaint: true,
    useCORS: true, // 允许图片跨域
    scale: 2,
    background: 'transparent',
  }).then(function (canvas) {
      const context = canvas.getContext('2d');
      // 关闭抗锯齿形
      context.mozImageSmoothingEnabled = true;
      context.webkitImageSmoothingEnabled = true;
      context.msImageSmoothingEnabled = true;
      context.imageSmoothingEnabled = true;
      callback({
        isDownload: false
      })
      // canvas转化为图片
      const img = canvas2Image(canvas, canvas.width, canvas.height);
      const imgUrl = img.getAttribute('src')
      downLoad(imgUrl, title)
      function canvas2Image(canvas, width, height) {
        const retCanvas = document.createElement('canvas');
        const retCtx = retCanvas.getContext('2d');
        retCanvas.width = width;
        retCanvas.height = height;
        retCtx.drawImage(canvas, 0, 0, width, height);
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png', 1);  // 可以根据需要更改格式
        return img;
      }

      //
      function downLoad(imgUrl, filename = '下载') {
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.setAttribute('style', 'display:none')
        a.setAttribute('href', imgUrl)
        a.setAttribute('download', filename)
        a.click()
        callback({
          isDownload: true
        })
        URL.revokeObjectURL(imgUrl)
      }
    }
  )
}

const validatorIphone = function (val) {
  return /^1[2|3|4|5|6|7|8|9][0-9]{9}$/.test(val)
}

const validatorSmsCode = function (val) {
  return /^[0-9]{6}$/.test(val)
}


const getWeChatParams = async function (agentID, path, isHidden = false) {
  if (agentID) {
    let result = await wxticket({agentID, path})
    if (result.code === S_OK) {
      if(isHidden) {
        getHiddenWeChatShare(result.data)
      }else {
        getWeChatShare(result.data)
      }
    }
  }
}


const getWeChatShare = function(params) {
  let title = '琴岛e保政府指导，139元保300万，青岛人专属福利!';
  let desc = '市办实事项目，个账缴费，带病可保可赔，不限医保目录，出院一站式结算！';
  weChat.config({
    // debug: true,
    appId: appId,
    timestamp: params.timestamp,
    nonceStr: params.nonceStr,
    signature: params.signature,
    jsApiList: ['hideMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline']
  });
  weChat.ready(function () {
    // 批量隐藏菜单项
    weChat.hideMenuItems({
      menuList: [
        'menuItem:readMode', // 阅读模式
        'menuItem:share:qq',
        'menuItem:share:weiboApp',
        'menuItem:share:facebook',
        'menuItem:share:QZone'
      ]
    });
    // 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    weChat.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: params.url, // 分享链接
      imgUrl: `${urlDomain}/logo.ico` // 分享图标
    });
    //监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    weChat.onMenuShareTimeline({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link:  params.url, // 分享链接
      imgUrl: `${urlDomain}/logo.ico` // 分享图标
    })
  });
}

// 隐藏按钮
const getHiddenWeChatShare = function(params) {
  let title = '琴岛e保政府指导，139元保300万，青岛人专属福利!';
  let desc = '市办实事项目，个账缴费，带病可保可赔，不限医保目录，出院一站式结算！';
  weChat.config({
    // debug: true,
    appId: appId,
    timestamp: params.timestamp,
    nonceStr: params.nonceStr,
    signature: params.signature,
    jsApiList: ['hideMenuItems', 'hideAllNonBaseMenuItem']
  });
  weChat.ready(function () {
    // 批量隐藏菜单项
    weChat.hideAllNonBaseMenuItem()
    weChat.hideMenuItems({
      menuList: ["menuItem:share:timeline", "menuItem:copyUrl", "menuItem:share:appMessage", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
    });
    // 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    weChat.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: params.url, // 分享链接
      imgUrl: `${urlDomain}/logo.ico` // 分享图标
    });
    //监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    weChat.onMenuShareTimeline({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link:  params.url, // 分享链接
      imgUrl: `${urlDomain}/logo.ico` // 分享图标
    })
  });
}


const birthDayFormatter = function (type, val) {
  if (type === 'year') {
    return val + '年'
  }
  if (type === 'month') {
    return val + '月'
  }
  if (type === 'day') {
    return val + '日'
  }
  return val
}

const taiwan = function (s) {
  return /^8[123]0000(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX]$/.test(s)
}

Vue.prototype.$globalColor = globalColor
Vue.prototype.$globalSlidePage = slidePage
Vue.prototype.$formatterText = formatterText
Vue.prototype.$getPdf = getPdf
Vue.prototype.$globalIsDownloadVoucher = globalIsDownloadVoucher
Vue.prototype.$validatorIphone = validatorIphone
Vue.prototype.$validatorSmsCode = validatorSmsCode
Vue.prototype.$getWeChatParams = getWeChatParams
Vue.prototype.$weChat = weChat
Vue.prototype.$birthDayFormatter = birthDayFormatter
Vue.prototype.$taiWan = taiwan


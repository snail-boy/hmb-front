import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
import fastclick from 'fastclick' // 解决 移动端 300ms 延时点击的问题
import '@/styles/common.scss'
import 'babel-polyfill'

import * as Setting from './setting'
Vue.prototype.$Setting = Setting

// 全局组件
import '@/components/global'

import VueBetterRouterTransition from '@/components/vue-better-router-transition'
VueBetterRouterTransition.noSetPage(['/', 'userCenter'])
Vue.use(VueBetterRouterTransition)


import * as custom from '@/filters/index'
// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

import '@/utils/global'

import '@/utils/index'

import Vant, {Toast} from 'vant'
import 'vant/lib/index.css'

// Toast.setDefaultOptions({ forbidClick: true });
Vue.use(Vant)
Vue.use(Toast)
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);


// import VConsole from 'vconsole'
if (process.env.VUE_APP_MODE === 'development') {
  // new VConsole()
}else if ( process.env.VUE_APP_MODE === 'test' ) {
  // new VConsole()
}
const str = navigator.userAgent.toLowerCase()
const ver = str.match(/cpu iphone os (.*?) like mac os/)

if (!ver) { // 非IOS系统
  // 引入fastclick 做相关处理
  fastclick.attach(document.body)
} else {
  if (parseInt(ver[1]) < 11) {
    // 引入fastclick 做相关处理
    fastclick.attach(document.body)
  }
}

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  var href = window.location.href;
  let origin = window.location.origin;
  let pathName = window.location.pathname;
  if (href.includes("state=123")) {  //url包括 com/?code 证明为从微信登录授权跳转回来的
    window.location.replace(origin + '/#'+pathName+'?' + href.split('?')[1]
        .replace('&state=123','')
        .replace('#/', ''));//拼接跳转
  } else {
    next()
  }
})
// import './permission'
// import VueLazyLoad from 'vue-lazyload'
// Vue.use(VueLazyLoad, {
//   loading: require('@/assets/images/title.png')
// })

import VueScreenRecord from "./components/vue-screen-record";

if(Setting.isRecord) {
  VueScreenRecord.vsrOpt()
  Vue.use(VueScreenRecord);
}


import '@/styles/index.scss'
Vue.config.productionTip = false

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

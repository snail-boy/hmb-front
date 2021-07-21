import Router from "../../router";
import vsr from "./vsr";

// const vsrKey = function (val) {
//   !sessionStorage.getItem('vsrKey') && sessionStorage.setItem('vsrKey', val)
// }

// 设置一个时间，长时间停留在页面上，请求发送取消
// const vsrKeyTime = function () {
//   let nowTime = new Date().getTime()
//   !sessionStorage.getItem('vsrKeyTime') && sessionStorage.setItem('vsrKeyTime', nowTime)
// }
// vsrKeyTime()

const vsrOpt = function (opt = {
  whiteList: [],
  version: '1.0.0'
}) {
  const VSR = new vsr(opt);
  VSR.vsrInit();
}

const install = function(Vue) {
  Vue.use(Router);
};



if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  vsrOpt,
  // vsrKey
};

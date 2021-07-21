module.exports = {
  projectName: '琴岛e保',
  baseColor: '#3181BC', // 主题色
  bgColor: '#f5f5f5', // 背景色
  secondColor: '#64C191', // 第二主题色
  isShowCountDown: true, // 是否显示参保倒计时
  expiryDate: '2021/11/21 24:00:00', // 参保截止日期
  isShowShare: false, // 是否显示分享按钮
  isRecord: true, //是否录屏
  indexPage: { // 首页图片，弹框提示文案
    homeTop: ['https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-top-v1.png'],
    supportPlan: ['https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab1-v1.png'],
    productFeature: ['https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab2-1-v2-1.png', 'https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab2-1-v2.png', 'https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab2-2-v2.png', 'https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab2-3-v2.png'],
    claimCase: ['https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab3.png'],
    commonPro: ['https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab4-v2.png', 'https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab4-1-v2.png', 'https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab4-2-v2.png'],
  },
  goInsureTip: '您将进入由中国人寿、泰康养老、平安养老、太平养老、人保健康5家保险公司联合承保的“琴岛e保”参保操作页面，请您仔细阅读并理解页面内容，并确保所填信息真实准确。根据相关要求，您在参保页面上的操作将被记录并保存，敬请知悉。',
  // 保险公司
  insureInfo: [{
    name: '中国人寿',
    phone: '95519',
  }, {
    name: '泰康养老',
    phone: '4006695522',
  }, {
    name: '平安养老',
    phone: '95511',
  }, {
    name: '太平养老',
    phone: '95589',
  }, {
    name: '人保健康',
    phone: '95518',
  }],

  // 生产环境配置
  proConfig: {
    appId: 'wx8a069cb269c55176',
    urlDomain: 'https://qdhmb.shie.com.cn',
    aliPyAppId: '2021002120621109',
    timeStampToken: 'prodShie###+++_',
    timeStampKey: '00f2789bd9f9378dbc528705c29574f7',
    claimUrl: ''
  },

  // 测试环境配置
  devConfig: {
    appId: 'wx978a53ba41729bfa', // 穗岁康
    // urlDomain = 'http://qingdao.free.idcfengye.com'
    urlDomain: 'http://qdhmb-test.shie.com.cn',
    aliPyAppId: '2021002115673037',
    timeStampToken: 'tstShie###+++_',
    timeStampKey: '4023b357470e4604994fcb6683cc74f7',
    claimUrl: 'https://qdhmb-test.shie.com.cn/claim/#/claim/home',
  }
}

import {proConfig, devConfig} from "../setting";

// 数据请求成功的状态
export const S_OK = '00000' || 0
export const S_No_Login = '20401'
export const S_No_Auth = '20405'
export const S_Message_Time = 3000
export const S_Toast_Time = 3000
export const posAgendID = 'postoken80000002'
export const aliToken = 'alitoken800006' // 支付宝token, 不允许撤单
export const busiDomainCode = 'QD-YL-10182'
export const agentID = 'qdylbtoken800001'
export const testToken = 'rogerchen1972'


let appId = ''
let urlDomain = ''
let aliPyAppId = ''
let timeStampToken = ''
let timeStampKey = ''
let claimUrl = ''

if(process.env.VUE_APP_MODE === 'production') {
  appId = proConfig.appId
  urlDomain = proConfig.urlDomain
  aliPyAppId = proConfig.aliPyAppId
  timeStampToken = proConfig.timeStampToken
  timeStampKey = proConfig.timeStampKey
  claimUrl = proConfig.claimUrl
}else {
  appId = devConfig.appId // 穗岁康
  // urlDomain = 'http://qingdao.free.idcfengye.com'
  urlDomain = devConfig.urlDomain
  aliPyAppId = devConfig.aliPyAppId
  timeStampToken = devConfig.timeStampToken
  timeStampKey = devConfig.timeStampKey
  claimUrl = devConfig.claimUrl
}

export {
  appId,
  urlDomain,
  aliPyAppId,
  timeStampToken,
  timeStampKey,
  claimUrl
}

export const idOpt = [{
  text: '居民身份证（户口簿）',
  value: '1'
}, {
  text: '中国人民解放军军官证',
  value: '2'
}, {
  text: '中国人民武装警察警官证',
  value: '3'
}, {
  text: '香港特区护照/身份证明',
  value: '4'
}, {
  text: '澳门特区护照/身份证明',
  value: '5'
}, {
  text: '台湾居民来往大陆通行证',
  value: '6'
}, {
  text: '外国人永久居留证',
  value: '7'
}, {
  text: '外国人护照',
  value: '8'
}, {
  text: '驾驶证',
  value: '9'
}, {
  text: '港澳居民来往内地通行证',
  value: '10'
}, {
  text: '港澳台居民居住证',
  value: '11'
}, {
  text: '出生医学证明',
  value: '12'
}, {
  text: '社会保障卡',
  value: '13'
}, {
  text: '其他',
  value: '14'
}]


export const relationWtHolderOpt = [{
  label: '本人',
  value: '1',
  active: null
}, {
  label: '配偶',
  value: '2',
  active: null
}, {
  label: '子女',
  value: '3',
  active: null
}, {
  label: '父母',
  value: '4',
  active: null
}, {
  label: '其他',
  value: '5',
  active: null
}]


export const statusClass = {
  '1': 'primary',
  '2': 'primary',
  '3': 'success',
  '4': 'success',
  '8': 'warning',
  '9': 'danger',
  '11': 'danger',
  '12': 'primary',
  '13': 'primary'
}

export const areaOpt = [{
  text: '越秀区',
  value: '440104'
}, {
  text: '海珠区',
  value: '440105'
}, {
  text: '荔湾区',
  value: '440103'
}, {
  text: '天河区',
  value: '440106'
}, {
  text: '白云区',
  value: '440111'
}, {
  text: '黄埔区',
  value: '440112'
}, {
  text: '花都区',
  value: '440182'
}, {
  text: '番禺区',
  value: '440113'
}, {
  text: '南沙区',
  value: '440115'
}, {
  text: '从化区',
  value: '440184'
}, {
  text: '增城区',
  value: '440183'
}]

export const identityOpt = [
  {
    value: '1',
    text: '中央驻穗单位、青岛市行政区域内的部属及省属机关事业单位自行管理医疗保障人员（中山大学、广东省人民医院等）'
  }, {
    value: '2',
    text: '广东省直医保参保人员'
  }, {
    value: '3',
    text: '广州各区属机关事业单位医疗保障人员'
  }
]

export const eduOpt = [
  {
    value: '1',
    text: '硕士及以上'
  }, {
    value: '2',
    text: '本科'
  }, {
    value: '3',
    text: '专科'
  }, {
    value: '4',
    text: '高中'
  }, {
    value: '5',
    text: '小学及以下'
  }
]

export const marriageOpt = [
  {
    value: '1',
    text: '未婚'
  }, {
    value: '2',
    text: '已婚'
  }, {
    value: '3',
    text: '离异'
  }, {
    value: '4',
    text: '丧偶'
  }
]

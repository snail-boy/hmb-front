export { parseTime } from '@/utils'

import { idOpt, relationWtHolderOpt } from '../utils/constant.js'

export function isRennewFilter(v) {
  let str = ''
  if (v === 'Y') {
    str = '自动'
  } else if (v === 'N') {
    str = '手动'
  }
  return str
}

export function relationWtHolderFilter(v) {
  if (v === '') return '--'
  let str = ''
  relationWtHolderOpt.filter(val => {
    if(val.value === v) {
      str = val.label
    }
  })
  return str
}

// 1 已参保 2 待支付 3 已支付  4 已生效  8 已取消 9 已退费
export function orderStatusFilter(v) {
  let str = ''
  if (v === '2' || v === '1') {
    str = '待支付'
  } else if (v === '3') {
    str = '已支付'
  } else if (v === '4') {
    str = '已承保'
  } else if (v === '8') {
    str = '已取消'
  } else if (v === '9') {
    str = '已退费'
  } else if (v === '11') {
    str = '退费中'
  } else if (v === '12') {
    str = '柜面支付'
  } else if (v === '13') {
    str = '退费申请中'
  }
  return str
}

export async function idOptFilter(v) {
  if (v === '') return '--'
  let str = ''
  await idOpt.map(val => {
    if (val.value === v) {
      str = val.text
    }
  })
  return str
}

export function genderFilter(v) {
  let str = ''
  if (v === '1') {
    str = '男'
  } else if (v === '2') {
    str = '女'
  }
  return str
}

// 电话号码
export function phoneNumberFilter(str) {
  if (!str) return '--'
  return str && str.replace(/(\d{3})\d*(\d{4})/, '$1******$2')
}

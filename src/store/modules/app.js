import {aesDecrypt, aesEncrypt} from "../../utils/crypto";

const state = {
  insureInfo: sessionStorage.getItem('insureInfo') ? JSON.parse(aesDecrypt(sessionStorage.getItem('insureInfo'))): '',
  orderInfo: sessionStorage.getItem('orderInfo') ? JSON.parse(aesDecrypt(sessionStorage.getItem('orderInfo'))) : '',
  searchOrder: sessionStorage.getItem('searchOrder') ? JSON.parse(aesDecrypt(sessionStorage.getItem('searchOrder'))) : '',
  userInfo: ''
}

const mutations = {
  SET_INSURE_INFO: (state, insureInfo) => {
    sessionStorage.setItem('insureInfo', aesEncrypt(JSON.stringify(insureInfo)))
    state.insureInfo = insureInfo
  },
  SET_ORDER_INFO: (state, orderInfo) => {
    sessionStorage.setItem('orderInfo', aesEncrypt(JSON.stringify(orderInfo)))
    state.orderInfo = orderInfo
  },
  SET_SEARCH_ORDER: (state, searchOrder) => {
    sessionStorage.setItem('searchOrder', aesEncrypt(JSON.stringify(searchOrder)))
    state.searchOrder = searchOrder
  }

}

const actions = {
  setInsureInfo({ commit }, insureInfo) {
    commit('SET_INSURE_INFO', insureInfo)
  },
  setOrderInfo({ commit }, orderInfo) {
    commit('SET_ORDER_INFO', orderInfo)
  },
  setSearchOrder({ commit }, searchOrder) {
    commit('SET_SEARCH_ORDER', searchOrder)
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions
}

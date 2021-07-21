import Vue from 'vue'

const contexts = require.context('.', true, /\.vue$/)

contexts.keys().forEach(component => {
  const componentEntity = contexts(component).default
  // 使用内置的组件名称 进行全局组件注册
  Vue.component(componentEntity.name, componentEntity)
})

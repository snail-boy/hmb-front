import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import index from '@/views/index'

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: index,
      redirect: '/Home',
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/views/home/index'),
          meta: {
            title: '琴岛e保'
          }
        }
      ]
    },
    {
      path: '/insure',
      name: 'Insure',
      component: () => import('@/views/insure/index'),
      meta: {
        title: '填写参保信息'
      }
    },
    {
      path: '/company',
      name: 'Company',
      component: () => import('@/views/insure/company'),
      meta: {
        title: '琴岛e保'
      }
    },
    // {
    //   path: '/register',
    //   name: 'Register',
    //   component: () => import('@/views/insure/infoRegis'),
    //   meta: {
    //     title: '琴岛e保信息登记'
    //   }
    // },
    // {
    //   path: '/voucher',
    //   name: 'Voucher',
    //   component: () => import('@/views/other/voucher'),
    //   meta: {
    //     title: '参缴凭证下载',
    //     isTransition: true
    //   }
    // }, {
    //   path: '/voucherDownload',
    //   name: 'VoucherDownload',
    //   component: () => import('@/components/pdf/download'),
    //   meta: {
    //     title: '参缴凭证下载',
    //     isTransition: true
    //   }
    // },
    // {
    //   path: '/confirm',
    //   name: 'Confirm',
    //   component: () => import('@/views/insure/confirm'),
    //   meta: {
    //     title: '确认参保信息'
    //   }
    // },
    {
      path: '/succeed',
      name: 'Succeed',
      component: () => import('@/components/succeed'),
      meta: {
        title: '支付成功'
      }
    },{
      path: '/payment',
      name: 'Payment',
      component: () => import('@/components/payment'),
      meta: {
        title: '支付中'
      }
    }, {
      path: '/payError',
      name: 'PayError',
      component: () => import('@/components/payError'),
      meta: {
        title: '支付失败'
      }
    }, {
      path: '/order',
      name: 'Order',
      component: () => import('@/views/order/index'),
      meta: {
        // keepAlive: false, // 不需要缓存
        title: '订单中心'
      }
    },
    // {
    //   path: '/claimTip',
    //   name: 'ClaimTip',
    //   component: () => import('@/views/other/claimTip'),
    //   meta: {
    //     keepAlive: false, // 不需要缓存
    //     title: '琴岛e保'
    //   }
    // },
    {
      path: '/detail',
      name: 'Detail',
      component: () => import('@/views/order/detail'),
      meta: {
        keepAlive: true, // 不需要缓存
        title: '订单详情'
      }
    }, {
      path: '/guarantee',
      name: 'Guarantee',
      component: () => import('@/views/home/guarantee'),
      meta: {
        title: '保障详情'
      }
    }, {
      path: '/searchOrder',
      name: 'SearchOrder',
      component: () => import('@/views/order/searchOrder'),
      meta: {
        keepAlive: false, // 不需要缓存
        title: '订单查询'
      }
    }, {
      path: '/payWay',
      name: 'PayWay',
      component: () => import('@/views/order/payWay'),
      meta: {
        keepAlive: false, // 不需要缓存
        title: '选择支付方式'
      }
    }
    // , {
    //   path: '/goPos',
    //   name: 'GoPos',
    //   component: () => import('@/views/order/goPos'),
    //   meta: {
    //     title: 'POS机支付'
    //   }
    // }
    , {
      path: '/notAccess',
      name: 'NotAccess',
      component: () => import('@/components/notAccess'),
      meta: {
        title: '无权访问'
      }
    }, {
      path: '/404',
      name: 'Err404',
      component: () => import('@/components/err404'),
      meta: {
        title: '不存在页面'
      }
    }, {
      path: '/payUnValid',
      name: 'PayUnValid',
      component: () => import('@/views/order/payUnValid.vue'),
      meta: {
        title: '支付无效'
      }
    },
    {
      path: '/userCenter',
      name: 'UserCenter',
      component: () => import('@/views/my/index.vue'),
      meta: {
        keepAlive: true,
        title: '个人中心'
      }
    },
    {
      path: '/userCenter/setting',
      name: 'Setting',
      component: () => import('@/views/my/setting.vue'),
      meta: {
        title: '设置'
      }
    }, {
      path: '/userCenter/setting/opinion',
      name: 'Opinion',
      component: () => import('@/views/my/components/opinion.vue'),
      meta: {
        title: '意见反馈'
      }
    }, {
      path: '/userCenter/setting/account',
      name: 'Account',
      component: () => import('@/views/my/account.vue'),
      meta: {
        keepAlive: false,
        title: '账户中心'
      }
    }, {
      path: '/userCenter/setting/about',
      name: 'About',
      component: () => import('@/views/my/components/about.vue'),
      meta: {
        title: '关于我们'
      }
    }, {
      path: '/userCenter/setting/privacy',
      name: 'Privacy',
      component: () => import('@/views/my/components/privacy.vue'),
      meta: {
        title: '隐私相关协议'
      }
    },
    {
      path: '/real',
      name: 'Real',
      component: () => import('@/views/my/real.vue'),
      meta: {
        title: '实名认证'
      }
    },
    {
      path: '/real/noReal',
      name: 'NoReal',
      component: () => import('@/views/my/components/noReal.vue'),
      meta: {
        keepAlive: false,
        title: '实名认证'
      }
    }, {
      path: '/real/yesReal',
      name: 'YesReal',
      component: () => import('@/views/my/components/yesReal.vue'),
      meta: {
        keepAlive: false,
        title: '实名认证信息'
      }
    }, {
      path: '/real/reReal',
      name: 'ReReal',
      component: () => import('@/views/my/components/reReal.vue'),
      meta: {
        keepAlive: false,
        title: '重新实名认证'
      }
    }
    , {
      path: '/checkCode',
      name: 'CheckCode',
      component: () => import('@/views/my/checkCode.vue'),
      meta: {
        title: '验证码登录'
      }
    }, {
      path: '/customer',
      name: 'Customer',
      component: () => import('@/views/customer/index.vue'),
      meta: {
        title: '在线客服'
      }
    },
    { path: '*', redirect: '/404', name: 'err404' }
  ]
})

export default router

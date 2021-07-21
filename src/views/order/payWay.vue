<template>
    <router-layout>
      <div class="pay-way-wrapper">
        <div class="pay-way-content">
          <div class="title">选择支付方式</div>
          <div class="pay-wrapper">
            <div class="Medicare-pay" @click="unifiedOrderFun">
              <div class="centent">
                <div class="Medicare-img">
                  <img class='rr-block' src="../../assets/images/Medicare.png" alt="">
                </div>
                <div class="font">
                  <p class="font-title">医保个账支付</p>
<!--                  <p>支持微信支付通道</p>-->
                </div>
              </div>
            </div>
            <div class="person-pay" @click="payPolicyFun">
              <div class="centent">
                <div class="person-img">
                  <img class='rr-block' src="../../assets/images/personage.png" alt="">
                </div>
                <div class="font">
                  <p class="font-title">其他支付</p>
                  <p>
                    <span v-if="juPayWay === 'weChat' || juPayWay === 'window'">微信</span>
                    <span v-if="juPayWay === 'AliPy'">支付宝</span>
                    、银联等支付通道</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div  v-show="false">
        <form :action="form.targetUrl" method="post" id="submit" name="submit" enctype="application/x-www-form-urlencoded">
          <div>
            <label>
              <input type="text" name="orderStr"  v-model="form.orderStr" value="">
            </label>
            <label>
              <input type="text" name="return_url" v-model="form.return_url" value="">
            </label>
            <label>
              <input type="text" name="sign" v-model="form.sign" value="">
            </label>
            <label>
              <input type="text" name="user_id" v-model="form.user_id" value="">
            </label>
            <label>
              <input type="text" name="return_url_select" v-model="form.return_url_select" value="">
            </label>
          </div>
        </form>
      </div>
      <div  v-show="false">
        <form :action="otherForm.shortURL" method="post" id="otherSubmit" name="submit" enctype="application/x-www-form-urlencoded"></form>
      </div>
      <sms-code
              :smsCodeVisible="smsCodeVisible"
              :smsCodePhone="smsCodePhone"
              :smsCodeId="smsCodeId"
              :smsCodeFrom="smsCodeFrom"
              @smsCodeCancel="smsCodeVisible=false"
      />
    </router-layout>
</template>

<script>
  import {getAliPayParam, orderYbPay, payPolicy} from '../../api'
  import smsCode from '../../components/smsCode'
  import {busiDomainCode, S_OK} from '../../utils/constant'
  import {
    getQueryObject,
    getUserInfo,
    goPage,
    judegeAlipay
  } from '../../utils'
import {Dialog} from 'vant'

export default {
  name: 'PayWay',
  components: { smsCode },
  data() {
    return {
      orderInfo: '',
      token: '',
      orderId: '',
      name: '',
      certiCode: '',
      routeWay: '',
      actionUrl: '',
      payChannel:  '',
      form: {
        targetUrl: '',
        orderStr: '',
        return_url: '',
        sign: '',
        user_id: '',
        return_url_select: ''
      },
      otherForm: {
        shortURL: ''
      },
      id: '', // 加密后的id
      smsCodeVisible: false,
      smsCodePhone: '',
      smsCodeId: '',
      smsCodeFrom: 'payWay', // 从那个组件调用短信验证的
      agentID: '',
      juPayWay: judegeAlipay()
    }
  },
  mounted() {
    if (getQueryObject().routeWay === '1') { // 第一种情况
      this.orderId = getQueryObject().orderNo
      this.token = getQueryObject().token
      this.payChannel =  getQueryObject().payChannel
      let commonParams = { agentID: this.token, busiDomainCode: busiDomainCode }
      sessionStorage.setItem('commonParams', JSON.stringify(commonParams))
      this.routeWay = '1'
    }else if(getQueryObject().routeWay === '2') {
      this.orderId = this.$store.state.app.orderInfo.orderNo
      this.token = this.$store.state.app.orderInfo.token
      this.name = this.$store.state.app.orderInfo.name
      this.certiCode = this.$store.state.app.orderInfo.certiCode
      this.smsCodePhone = this.$store.state.app.orderInfo.phoneNo
      this.routeWay = '2'
    }else if(getQueryObject().routeWay === '3') {
      this.orderId = this.$store.state.app.orderInfo.orderNo
      if (!this.orderId) {
        this.orderId = getQueryObject().orderNo;
      }
      this.token = getUserInfo() && getUserInfo().agent && getUserInfo().agent.token
      if (!this.token) {
        this.token = getQueryObject().agentID;
      }
      this.routeWay = '3'
    }else if(getQueryObject().routeWay === '4') {
      this.orderId = this.$store.state.app.orderInfo.orderNo
      this.token = getQueryObject().token
      let commonParams = { agentID: this.token, busiDomainCode: busiDomainCode }
      sessionStorage.setItem('commonParams', JSON.stringify(commonParams))
      this.routeWay = '4'
    }else {
      this.$router.replace('NotAccess')
    }
    if (window.history && window.history.pushState && judegeAlipay() !== "AliPy") {
      window.history.pushState('forward', null, document.URL)
      window.addEventListener('popstate', this.cancelFun, false)
    }
    this.agentID = getQueryObject().agentID
  },
  destroyed() {
    if (judegeAlipay() !== "AliPy") {
      window.removeEventListener('popstate', this.cancelFun, false)
    }
  },
  methods: {
    async getOrderYbPay(smsParams, callback) {
      let params = {
        orderNo: this.orderId,
        token: this.token,
        payChannel: this.payChannel
      }
      params = { ...params, ...smsParams }
      let result = await orderYbPay(params)
      if (result.code === S_OK || result.code === '10003') {
        callback && callback(true)
        window.location.href = result.data

        // 一下是西湖
        // this.id = result.data
        // this.$router.push({ name: 'Succeed',
        //   query: {
        //     agentID: JSON.parse(sessionStorage.getItem('commonParams')).agentID,
        //     busiDomainCode: JSON.parse(sessionStorage.getItem('commonParams')).busiDomainCode,
        //     id: this.id,
        //     routeWay: this.routeWay
        //   }
        // })
      }else if(result.code === '10004') { // 短信验证码验证失败
        callback && callback(false)
      }else if(result.code === '10005') { // 实名认证失败
        callback && callback(false)
        this.error1005()
      }else if(result.code === '200015') { // 青岛失败提示错误
        this.$toast.error(result.message)
      }else {
        callback && callback(false)
      }
    },
    // 校验订单信息
    async getBalance() {
      this.smsCodeVisible = true
    },
    // 实名认证失败提示
    error1005() {
      Dialog.alert({
        title: '尊敬的用户 您好！',
        message: '<div style="text-align: justify; line-height: 30px;">您的实名认证未成功(可能所填缴费人身份证件和手机号码不是同一人)，可选择下述两种方式继续参保：\n' +
          '1.请选择其他支付方式完成订单；\n' +
          '2.若需继续使用医保个账支付，请先前往“琴岛e保”微信公众号-服务中心-订单查询，取消订单后前往“浙里办”APP进行参保验证。</div>',
        theme: 'round-button',
        confirmButtonColor: this.$globalColor.baseColor
      }).then(() => {
        // on close
      })
    },
    cancelFun() {
      this.reConfirm('当前有未完成的订单，确认退出支付吗？')
    },
    reConfirm(message) {
      const wConfirm = window.confirm
      window.confirm = function(message) {
        try {
          const iframe = document.createElement('IFRAME')
          iframe.style.display = 'none'
          iframe.setAttribute('src', 'data:text/plain,')
          document.documentElement.appendChild(iframe)
          const alertFrame = window.frames[0]
          let iwindow = alertFrame.window
          if (iwindow === undefined) {
            iwindow = alertFrame.contentWindow
          }
          const result = iwindow.confirm(message)
          iframe.parentNode.removeChild(iframe)
          return result
        } catch (exc) {
          return wConfirm(message)
        }
      }
      const r = window.confirm(message)
      if (r === true) {
        this.$router.go(-1)
      } else {
        window.history.pushState('forward', null, document.URL)
      }
    },
    async unifiedOrderFun() {
      if(judegeAlipay() !== 'weChat') {
       if (judegeAlipay() === 'AliPy') {
         Dialog.alert({
           title: '温馨提示',
           message: '本途径不支持“医保个帐支付”，请选择“其它支付”进行参保。',
           theme: 'round-button',
           confirmButtonColor: this.$globalColor.baseColor
         }).then(() => {
           // to do
         });
       }else {
         Dialog.alert({
           title: '温馨提示',
           message: '请前往“琴岛e保”微信公众号-用户中心-个人中心，使用医保个账支付。',
           theme: 'round-button',
           confirmButtonColor: this.$globalColor.baseColor
         }).then(() => {
           // to do
         });
       }
        return
      }
      if(!sessionStorage.getItem('isClickUnifiedOrder')) {
        sessionStorage.setItem('isClickUnifiedOrder', 1)
      }
      this.getOrderYbPay()
        // if (this.routeWay === '3' || this.routeWay === '1') {
        //     this.getOrderYbPay()
        // }else if (this.routeWay === '2') {
        //     // 先调余额 是否充足，调短信验证码，在调支付
        //     this.getBalance()
        // }
    },
    async payPolicyFun() {
      const params = {
        orderNo: this.orderId,
        token: this.token,
        payChannel: this.payChannel
      }
      const result = await payPolicy(params)
      if (result.code === S_OK) {
        if (judegeAlipay() === 'AliPy') {
          this.aliPayOtherFun(result.data)
        }else {
          goPage(result.data.shortURL)
        }
      }

    },
    async aliPayFun() {
      let params = {
        orderNo: this.orderId,
        token: this.token
      }
      const result = await getAliPayParam(params)
      if(result.code === S_OK) {
        this.form = result.data
        setTimeout(() => {
          document.getElementById('submit').submit()
        }, 100)
      }
    },
    async aliPayOtherFun(obj) {
      this.otherForm = obj
      setTimeout(() => {
        document.getElementById('otherSubmit').submit()
      }, 100)
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variables";
  .pay-way-wrapper {
    background: #EEEEEE;
    height: calc(100%);
    .pay-way-content {
      background: white;
    }
    .title {
      font-size: 30px;
      padding: 40px 0 40px 40px;
      background: white;
    }
  }
  .sms-code-box {
    margin: 50px auto;
    .code-btn {
      background: $base-color;
      border: none;
      width: 180px;
    }
  }
</style>

<style scoped lang="scss">
  .pay-way-content{
    .pay-wrapper{
      display: flex;
      justify-content: space-between;
      padding: 10px 40px 60px;
      .Medicare-pay{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 310px;
        height: 310px;
        border: 1px solid #ccc;
        .centent{
          .Medicare-img{
            width: 120px;
            height: 80px;
            margin: 0 auto 40px;
          }
          .font{
            color: #ccc;
            font-size: 24px;
            margin-top: 60px;
            .font-title{
              color: #000;
              font-size: 24px;
              text-align: center;
            }
          }
        }
      }
      .person-pay{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 310px;
        height: 310px;
        border: 1px solid #ccc;
        .centent{
          .person-img{
            width: 120px;
            height: 80px;
            margin: 0 0 20px 60px;
            margin-bottom: 40px;
          }
          .font{
            color: #ccc;
            font-size: 24px;
            margin-top: 60px;
            .font-title{
              color: #000;
              font-size: 24px;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>


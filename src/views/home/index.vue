<template>
  <router-layout>
    <div class="home-wrapper" id="homeWrapper">
      <div class="home-bottom flex-sb">
        <div class="customer-icon" @click="handleCustomer">
          <span class="icon-customer"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
        </div>
        <van-button class="now-btn sure-btn" @click="nowBtn">立即参保</van-button>
      </div>
      <div class='rr-block'>
        <div class="home-company">
          <img v-for='(item, index) in $Setting.indexPage.homeTop' :key='index' :src="item" alt=""/>
          <video class="video-box" controls poster="../../assets/images/front.png">
            <source :src="videoUrl" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div v-if='$Setting.isShowCountDown && time>0' class='count-down-box'>
            <span>参保倒计时</span><van-count-down class="countDown" :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
          </div>
        </div>
        <van-tabs ref="homeTabRef" :title-active-color="$globalColor.baseColor" :color="$globalColor.baseColor" scrollspy sticky v-model="active">
          <div class="contents">
            <van-tab title="保障计划" name="key1">
              <div class="detail-btn-box">
                <div class="detail-btn" @click="goGuarantee"></div>
                <img v-for='(item, index) in $Setting.indexPage.supportPlan' :key='index' :src="item" alt=""/>
              </div>
            </van-tab>
            <van-tab title="产品特色" name="key2">
              <img v-for='(item, index) in $Setting.indexPage.productFeature' :key='index' :src="item" alt=""/>
            </van-tab>
            <van-tab title="理赔案例" name="key3">
              <img v-for='(item, index) in $Setting.indexPage.claimCase' :key='index' :src="item" alt=""/>
            </van-tab>
            <van-tab title="常见问题" name="key4">
              <img v-for='(item, index) in $Setting.indexPage.commonPro' :key='index' :src="item" alt=""/>
              <footer-phone/>
              <p class="bottom-p">本网站支持IPv6</p>
            </van-tab>
          </div>
        </van-tabs>
        <van-popup class="popup-box" v-model="dialogShow" position="bottom" style="height: 300px">
          <div class="global-van-dialog" v-if="!timeRangeTip">
            <h2 class="global-tips">温馨提示，你即将进入参保流程</h2>
            {{$Setting.indexPage.goInsureTip}}
          </div>
          <div class="dialog-btn">
            <van-button @click="goInsure">我已了解</van-button>
          </div>
        </van-popup>
        <phone v-if='$Setting.isShowShare' />
      </div>
    </div>
  </router-layout>
</template>

<script>
import {getQueryObject2,judegeAlipay, setUserInfo} from '../../utils'
import {authByCode, initApi} from '../../api'
import {appId, S_OK, urlDomain} from '../../utils/constant'
import Cookies from 'js-cookie'
export default {
  name: 'Home',
  data() {
    return {
      active: 'key1',
      agentID: '',
      busiDomainCode: '',
      code: '',
      dialogShow: false,
      timeRangeTip: false,
      videoUrl: require('../../assets/video/video.mp4'),
      time: new Date('2021/06/30 24:00:00').getTime() - new Date().getTime()
    }
  },
  mounted() {
    let urlQuery = getQueryObject2()

    this.agentID = urlQuery.agentID
    this.busiDomainCode = urlQuery.busiDomainCode
    this.code = urlQuery.code

    this.$getWeChatParams(this.agentID, window.location.href); // 微信自定义分享
    // 支付宝，微信环境
    if(process.env.VUE_APP_MODE === 'development') {
      this.getInit()
    }else {
      this.init()
    }
  },
  activated() {
    this.dialogShow = false
  },
  methods: {
    async init() {
    if (judegeAlipay() === 'weChat') {
        if(this.agentID && this.busiDomainCode) {
          if (!!Cookies.get('HZSSKLoginSeesion') && Cookies.get('HZSSKLoginSeesion') !== undefined && Cookies.get('HZSSKLoginSeesion') !== 'undefined') {
            this.getInit()
          } else {
            if (!this.code) {
              this.getCode()
            } else {
              let result = await authByCode({ code: this.code })
              if(result.code === S_OK) {
                this.getInit()
              }
            }
          }
        }else {
          this.$router.replace('/notAccess')
        }
      }else {
        this.getInit()
      }
    },
    async getCode() {
      const urlEn = `${urlDomain}/?busiDomainCode=${this.busiDomainCode}&agentID=${this.agentID}`
      const urlDe = encodeURIComponent(urlEn)
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${urlDe}&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect`
      window.location.replace(url)
    },
    async getInit() {
      let params = {
        busiDomainCode: this.busiDomainCode,
        agentID: this.agentID
      }
      sessionStorage.setItem('commonParams', JSON.stringify(params))
      const result = await initApi(params)
      if (result.code === S_OK) {
        const data = JSON.stringify(result.data)
        setUserInfo(data)
      } else {
        if (result.code === '77777') {
          this.getCode()
        } else {
          this.$router.replace('/notAccess')
          sessionStorage.clear()
        }
      }
    },
    nowBtn() {
      this.dialogShow = true
    },
    goGuarantee() {
      this.$router.push('/guarantee')
    },
    goInsure() {
      this.$router.push({path: '/insure', query: { busiDomainCode: this.busiDomainCode, agentID: this.agentID }})
    },
    handleCustomer() {
      this.$router.push('/customer')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  @import "../../static/iconfront/style.css";
  .home-wrapper {
    padding-bottom: 120px;
    width: 100%;
    background: $bg-color;
    .customer-icon {
      width: 100px;
      height: 100px;
      font-size: 100px;
    }
    .video-box {
      width: 100%;
      margin: 10px 0;
    }
    .home-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      font-size: 32px;
      line-height: 100px;
      background-color: white;
      text-align: center;
      z-index: 100;
    }
    .sure-btn {
      position: relative;
    }
    .home-company {
      color: #AEAEAD;
    }
    .detail-btn-box {
      position: relative;
      .detail-btn {
        width: 200px;
        height: 100px;
        position: absolute;
        right: 0;
        top:10px;
      }
    }
    .bottom-p {
      font-size:28px;
      line-height:40px;
      color:$base-color;
      text-align: center
    }
    .count-down-box {
      position: absolute;
      top: 340px;
      left: 40px;
      color: #DC851F;
      font-size: 26px;
      .countDown {
        color: #DC851F;
      }
    }
  }
</style>
<style lang="scss">
  @import "../../styles/variables";
  .home-wrapper {
    .dialog-btn {
      margin-top: 30px;
      text-align: center;
      .van-button {
        width: 80%;
        color: white;
        font-size: 40px;
        font-weight: bolder;
        background: $base-color;
        border-radius: 20px;
      }
    }
    .popup-box {
      .global-tips {
        color: #4D4D4D;
        margin: 0px auto 30px;
        border-bottom: 1px solid #eee;
        padding-bottom: 20px;
      }
    }
    .van-tab__pane {
      margin: 12px auto;
    }
  }
</style>

<template>
  <router-layout>
    <div class="succeed-wrapper">
      <div class="centent">
        <img class="succeed-logo" src="../assets/images/pay-success.png" alt="">
        <div class="centent-font">
          <p>保单生效期: 2021年07月01日 00时起</p>
          <p class="centent-font-two">保单终止期: 2022年06月30日 24时止</p>
          <p>订单支付成功，状态更新会有延迟，请耐心等候~</p>
        </div>
      </div>
      <div class="succeed-bg rr-block">
        <img  src="../assets/images/succeed-info.png"  @click="handleClick" alt="" />
      </div>
      <div class="pay-btn-box flex-sa rr-block">
        <van-button color="#89BF50" @click="showDetail">查看订单</van-button>
        <van-button color="#3181BC" @click="goIndex">参保家人</van-button>
      </div>
      <footer-phone class='rr-block'/>
      <van-overlay :show="showOverlay" @click="showOverlay = false" class='rr-block'>
        <div class="overlay-wrapper" @click.stop>
          <div class="overlay-content">
            <img src="../assets/images/code.jpeg"  alt=""/>
            <div class="overlay-tip">长按图片，关注公众号后可订阅保单通知</div>
          </div>
        </div>
      </van-overlay>
    </div>
  </router-layout>
</template>
<script>
  import {getQueryObject} from '../utils'
  import {videoFinish} from "../api";

  export default {
    data() {
      return {
        agentID: '',
        busiDomainCode: '',
        id: '',
        username: '',
        certiType: '',
        certiCode: '',
        phoneNo: '',
        birthday: '',
        gender: '',
        isShow: true,
        showOverlay: true
      }
    },
    mounted() {
      this.agentID = getQueryObject().agentID
      this.busiDomainCode = getQueryObject().busiDomainCode
      this.username = getQueryObject().username
      this.certiType = getQueryObject().certiType
      this.certiCode = getQueryObject().certiCode
      this.phoneNo = getQueryObject().phoneNo

      this.id = getQueryObject().id


      if (this.certiType !== '1') {
        this.birthday = getQueryObject().birthday
        this.gender = getQueryObject().gender
      }

      if (getQueryObject().routeWay && getQueryObject().routeWay == '1') {
        this.isShow = false
      }

      this.$getWeChatParams(this.agentID, window.location.href)// 微信自定义分享

      // 先注释掉，录屏接口
      setTimeout(() => {
        this.getVideoFinish()
      }, 2300)
    },
    methods: {
      async getVideoFinish() {
        await videoFinish({ id: this.id })
      },

      goIndex() {
        let params = {};
        if (this.certiType === '1') {
          params = { name: 'Insure', query: { from: 'succeed', username: this.username, certiType: this.certiType, certiCode: this.certiCode, phoneNo: this.phoneNo,  birthday: '', gender: '', busiDomainCode: this.busiDomainCode, agentID: this.agentID }}
        }else {
          params = { name: 'Insure', query: { from: 'succeed', username: this.username, certiType: this.certiType, certiCode: this.certiCode, phoneNo: this.phoneNo, birthday: this.birthday, gender: this.gender, busiDomainCode: this.busiDomainCode, agentID: this.agentID }}
        }
        this.$router.push(params)
      },
      showDetail() {
        sessionStorage.setItem('/succeed', '-2')
        this.$router.push({ name: 'Detail', query: { id: this.id }})
      },
      handleClick() {
        this.showOverlay = true
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../styles/variables";
  @import "./common";
  .succeed-wrapper {
    width: 100%;
    height: auto;
    position: relative;
    background-color: #E9F6FF;
    // background: #E9F6FF url("../assets/images/succeed.png") no-repeat;
    // background-size: contain;
    // padding-top: 470px;
    // padding-bottom: 40px;
    min-height: 100vh;
    .centent{
      position: relative;
      width: 100%;
      height: 600px;
      background-color: #3181BC;
      .succeed-logo{
        position: absolute;
        width: 450px;
        height: 200px;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
      }
      .centent-font{
        position: absolute;
        top: 300px;
        width: 100%;
        color: #fff;
        text-align: center;
        font-size: 30px;
        .centent-font-two{
          margin: 10px 0 30px 0;
        }
      }
    }
    .succeed-bg{
      position: absolute;
      top: 500px;
    }
    .pay-btn-box{
      margin-top: 60px;
    }
  }
</style>

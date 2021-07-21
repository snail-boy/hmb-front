<template>
  <router-layout>
    <div class="error-wrapper">
      <div class="centent">
        <img class="succeed-logo" src="../assets/images/pay-error.png" alt="">
        <div class="centent-font">
          <p class="centent-font-two">可前往琴岛e保微信公众号</p>
          <p>服务中心-个人中心继续支付</p>
        </div>
      </div>
      <div class="succeed-bg rr-block">
        <img  src="../assets/images/succeed-info.png"  @click="handleClick" alt="" />
      </div>
      <div class="pay-btn-box flex-sa rr-block">
        <van-button v-if="id" type="primary" color="#9CC76E" @click="showDetail">查看订单</van-button>
<!--        <van-button v-if="orderNo" type="primary" @click="goIndex">再付一次</van-button>-->
      </div>
      <footer-phone class='rr-block' />
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
        orderNo: '',
        token: '',
        showOverlay: true
      }
    },
    mounted() {
      this.agentID = getQueryObject().token
      this.busiDomainCode = getQueryObject().busiDomainCode
      this.orderNo = getQueryObject().orderNo
      this.token = getQueryObject().token
      this.payChannel = getQueryObject().payChannel
      this.id = getQueryObject().id

      setTimeout(() => {
        this.getVideoFinish()
      }, 2300)
    },
    methods: {
      async getVideoFinish() {
        await videoFinish({ id: this.id })
      },
      goIndex() {
        this.$router.push({ name: 'PayWay', query: { from: 'payError', orderNo: this.orderNo, token: this.token, agentID: this.agentID, payChannel: this.payChannel, routeWay: 1 }})
      },
      showDetail() {
        sessionStorage.setItem('/payError', '-2')
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
  .error-wrapper {
    width: 100%;
    height: auto;
    position: absolute;
    background-color: #E9F6FF;
    min-height: 100vh;
    .centent{
      position: relative;
      width: 100%;
      height: 600px;
      background-color: #9CC76E;
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
          margin: 45px 0 10px 0;
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

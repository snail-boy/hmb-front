<template>
  <router-layout>
    <div class="succeed-wrapper">
      <div class="centent">
        <img class="succeed-logo" src="../assets/images/paying.png" alt="">
        <div class="centent-font">
          <p>可前往琴岛e保微信公众号</p>
          <p class="centent-font-two">个人中心-订单查询 (处理中) 下查看</p>
        </div>
      </div>
      <div class="succeed-bg">
        <img  src="../assets/images/succeed-info.png"  @click="handleClick" alt="" />
      </div>
      <div class="pay-btn-box flex-sa" v-if="id">
        <van-button type="primary" @click="showDetail">查看订单</van-button>
      </div>
      <footer-phone class="footer-phone" />
      <van-overlay :show="showOverlay" @click="showOverlay = false">
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

  export default {
    data() {
      return {
        id: '',
        showOverlay: true
      }
    },
    mounted() {
      this.id = getQueryObject().id
    },
    methods: {
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
        top: 320px;
        width: 100%;
        color: #fff;
        text-align: center;
        font-size: 30px;
        .centent-font-two{
          margin-top: 20px;
        }
      }
    }
    .succeed-bg{
      position: absolute;
      top: 500px;
      height: 200px;
    }
    .pay-btn-box{
      margin-top: 60px;
    }
    .footer-phone {
      margin-top: 200px;
    }
  }
</style>

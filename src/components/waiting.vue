<template>
  <div class="waiting-wrapper">
    <img src="../assets/images/waiting-1.png" alt="waiting" />
    <div class="waiting-box">
      <div class="global-tips waiting-tip">参保倒计时</div>
      <van-count-down class="countDown" :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
      <img class="qr-code-box" src="../assets/images/code.jpeg" alt="waiting" />
      <div class="global-tips">扫码关注琴岛e保微信公众号<br/>参与青岛医保专属福利</div>
    </div>
    <img class="waiting-2" src="../assets/images/waiting-2.png" alt="waiting" />
  </div>
</template>

<script>
  export default {
    name: "Waiting",
    data() {
      return {
        time: new Date('2021/01/20 00:00:00').getTime() - new Date().getTime()
      }
    }
  }
</script>

<style scoped lang="scss">
  .waiting-wrapper {
    background: white;
    height: 100vh;
    .countDown {
      display: block;
      width: 100%;
      color: #f496b7;
      font-size: 40px;
      text-align: center;
      margin: 0 auto 30px;
    }
    .waiting-tip {

    }
    .waiting-box {
      min-height: 600px;
      overflow: auto;
      margin-top: 20px;
    }
    .waiting-2 {
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
  @media (max-height: 480px) {
    .waiting-tip {
      margin-bottom: 8px !important;
    }
    .waiting-box {
      min-height: 600px;
      overflow: auto;
      margin-top: 0 !important;
    }
    .countDown {
      margin: -3px auto 0 !important;
    }
  }
</style>

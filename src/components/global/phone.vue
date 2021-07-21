<template>
  <div class="share-img-wrapper">
    <img class='share-img' src='../../assets/images/share.png' @click="isShowPhone=true" alt='' />
    <van-overlay :show="isShowPhone" @click="isShowPhone=false">
      <img src="../../assets/images/share.gif"/>
    </van-overlay>
  </div>
</template>

<script>
  export default {
    name: "phone",
    data() {
      return {
        isShowPhone: false
      }
    }
  }
</script>

<style lang='scss' scoped>
  .share-img-wrapper {
    .share-img {
      position: fixed;
      right: 20px;
      bottom: 160px;
      width: 140px;
      animation: phone 3s infinite;
    }
    @keyframes phone {
      0%,90%,100% {
        transform: rotate(0) scale(1);
      }
      20%,40% {
        transform: rotate(-5deg) scale(1.01);
      }
      30%,50% {
        transform: rotate(5deg) scale(1.01);
      }
    }
  }
</style>

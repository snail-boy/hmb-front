<template>
  <div class="phone-wrapper">
    <div class="phone-btn" @click="handleClick">
      <svg version="1.1" class="icon" p-id="1739" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 128 128" style="enable-background:new 0 0 128 128;" width="128" height="128" >
      <g p-id="1740">
        <path d="M65.9,0c-0.6,0-1.1,0-1.7,0l-0.9,0v9.2l0.6,0c0.6,0,1.3,0,1.9,0c29.1,0,52.8,23.7,52.8,52.7v0.5h9.2V62
          C128,27.8,100.2,0,65.9,0z"/>
        <path d="M95.9,62l0.1,0.5h9.3l-0.1-0.6c-2.1-21.3-19.9-37.3-41.3-37.3h-0.5v9.2h0.5C80.1,33.8,93.9,45.9,95.9,62z"/>
        <path d="M86.2,86.4c-0.8,0.5-1.5,1.1-2.4,1.7l0,0c-0.2,0.1-0.4,0.3-0.7,0.5c-0.5,0.4-1.3,1-1.6,1.2c-0.4,0.3-0.8,0.6-1.2,0.9
          c-1.3,1.1-2.8,1.9-4.3,2.6c-2.4,0.9-7-2.5-21.7-15.7c-19-17.2-19.7-18.8-15.7-23.9c0.7-0.9,1.6-1.9,3.8-4.2
          c10.2-11.1,9.9-20.4-0.9-31.9C33.6,9,26.3,6,19.2,8.3c-5.3,1.7-8.8,5.2-14.4,12.5c-11.7,15.1-1.2,47.2,24,73l0,0l0.2,0.2
          c12.3,12.6,26.8,22.8,40.8,28.6c8.6,3.6,16.7,5.4,23.6,5.4c3.8,0,7.3-0.6,10.4-1.7c9-3.3,13.5-6.3,16-10.6
          c3.7-6.2,1.6-13.7-6.3-22.1C103.1,82.5,95.2,80.4,86.2,86.4z M31.9,48.3C24,58.4,26.6,64.1,48.6,83.9
          c18.3,16.5,23.3,20.1,30.5,17.4c2.2-0.9,4.3-2.2,6.2-3.6c0.4-0.3,0.9-0.6,1.3-1l2.3-1.7c0.8-0.6,1.4-1.1,2-1.4
          c4.9-3.3,8.1-2.8,16.3,6c5,5.3,6.7,9.2,5.1,11.8c-1.3,2.3-4.9,4.4-11.6,6.9c-13,4.8-41.2-5.2-65.7-30.3
          C11.3,63.5,3.7,36.3,11.6,26.1c4.8-6.2,7.3-8.6,10.1-9.5l0.2-0.1c3.7-1.2,7.9,1,13.5,6.9c8.3,8.8,7.4,13,0.8,20.1
          C34,45.8,32.9,47,31.9,48.3z"/>
      </g>
      </svg>

    </div>
    <div class="phone-content">
        <van-dialog v-model="isShowPhone" title="咨询热线" :show-cancel-button="false" cancelButtonText="取消" :confirm-button-color="$globalColor.baseColor">
          <div class="dialog-text">
            <footer-phone />
          </div>
        </van-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "phone",
    data() {
      return {
        isShowPhone: false
      }
    },
    methods: {
      handleClick() {
        this.isShowPhone = true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/variables";
  .phone-wrapper {
    .phone-btn {
      position: fixed;
      bottom:200px;
      right: 10px;
      width: 100px;
      height: 100px;
      background: rgba(49, 129, 188, .8);
      border-radius: 100%;
      text-align: center;
      fill: white;
      .icon {
        display: block;
        width: 40px;
        height: 40px;
        animation: phone 1s infinite;
        margin: 30px auto;
      }
    }
    .global-tips {
      color: $base-color;
    }
    @keyframes phone {
      0%,90%,100% {
        transform: rotate(0) scale(1);
      }
      20%,40% {
        transform: rotate(-15deg) scale(1.1);
      }
      30%,50% {
        transform: rotate(15deg) scale(1.1);
      }
    }
  }
</style>

<style lang="scss">
  @import "../styles/variables";
  .phone-wrapper {
    .van-dialog {
      background: $bg-color;
    }
    .van-button--default {
      background: $bg-color;
    }
  }
</style>

<template>
  <div class="claim-tip-wrapper">
    <van-dialog v-model="isShow" title="提示" confirm-button-text="已阅读，确认进入理赔页面" :confirm-button-color="$globalColor.baseColor" @confirm="onConfirm">
      <div class="dialog-text">
        您将进入琴岛e保首席保险人中国人寿保险股份有限公司广东省分公司的理赔申请页面，请按照流程提交资料，若有任何疑问，请拨打客服电话95519咨询
      </div>
    </van-dialog>
  </div>
</template>

<script>
  export default {
    name: "claimTip",
    data() {
      return {
        isShow: true,
        timer: null
      }
    },

    methods: {
      onConfirm() {
        clearTimeout(this.timer)
        window.location.href = 'https://gdwx2.e-chinalife.com/ssk/wx/chinalife/home'
        this.timer = setTimeout(() => {
          this.isShow = true
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="scss">
  .claim-tip-wrapper {
    .dialog-text {
      padding: 20px 30px;
      text-align: justify;
      line-height: 50px;
      font-size: 28px;
      color: #666;
    }
  }
</style>

<template>
  <div class="tip-dialog-wrapper">
    <van-dialog v-model="vanDialogShow" :title="tipDialogTitle" :confirm-button-text="tipDialogConfirmText" :confirm-button-color="$globalColor.baseColor" @confirm='onTipDialogClosed'>
      <div class="dialog-text">
        <slot></slot>
      </div>
    </van-dialog>
  </div>
</template>

<script>
  export default {
    name: "tipDialog",
    props: {
      tipDialogVisible: {
        type:  Boolean,
        default: false
      },
      value: {
        type: Boolean,
        default: false
      },
      tipDialogTitle: {
        type: String,
        default: '建议'
      },
      tipDialogConfirmText: {
        type: String,
        default: '已阅读，确认进入页面'
      }
    },
    data() {
      return {
        vanDialogShow: false
      }
    },
    watch: {
      tipDialogVisible(v) {
        if(v) {
          this.vanDialogShow = v
        }
      }
    },
    methods: {
      onTipDialogClosed() {
        this.$emit('tipDialogClose')
      }
    }
  }
</script>

<style scoped lang="scss">
  .tip-dialog-wrapper {
    .dialog-text {
      padding: 20px 30px;
      text-align: justify;
      line-height: 50px;
      font-size: 28px;
      color: #666;
    }
  }
</style>

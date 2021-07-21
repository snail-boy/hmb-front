<template>
  <router-layout>
    <div class="opinion-wrapper">
      <van-field
              v-model="opinion"
              rows="3"
              autosize
              label="意见反馈"
              type="textarea"
              maxlength="150"
              placeholder="请填写您要的反馈信息，我们将尽快解决！"
              show-word-limit
      />
      <van-button class="voucher-now-btn" @click="handleSave">保存</van-button>
    </div>
  </router-layout>
</template>

<script>
  import {opinionAdd} from "../../../api";
  import {S_OK} from "../../../utils/constant";

  export default {
    name: "Opinion",
    data() {
      return {
        opinion: ''
      }
    },
    methods: {
      async handleSave() {
        let result = await opinionAdd({ opinion: this.opinion })
        if (result.code === S_OK) {
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../styles/variables";
  .opinion-wrapper {
    min-height: 100%;
    background: $bg-color;
  }
</style>

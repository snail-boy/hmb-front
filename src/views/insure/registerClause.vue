<template>
  <div class="clause-wrapper">
    <user-clauses />
    <van-button class="button" plain hairline type="primary" @click="readFinish">已阅读，并同意上述内容</van-button>
  </div>
</template>

<script>
import UserClauses from '../agreement/userClauses'
export default {
  components: { UserClauses },
  methods: {
    readFinish() {
      this.$emit('readFinish')
    }
  }
}

</script>

<style scoped>
  .button {
    height: 80px;
    width: 400px;
    background-color: rgb(46, 132, 202);
    transform: translateX(-50%);
    left: 50%;
    margin-bottom: 20px;
    border-radius: 4px;
    text-align: center;
    line-height: 42px;
    color: #fff;
    border: none;
  }
</style>

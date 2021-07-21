<template>
  <div class="customer-wrapper">
    <a class="href" @click="handleClick">订单查询入口</a>
  </div>
</template>

<script>
  export default {
    name: "SearchOrder",
    methods: {
      handleClick() {
        this.$router.push('/searchOrder')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/variables";
  .customer-wrapper {
    width: 100%;
    text-align: center;
    margin: 50px auto;
    height: 100px;
    line-height: 100px;
    .href {
      text-align: center;
      color: $base-color;
      text-decoration: underline;
    }
  }
</style>

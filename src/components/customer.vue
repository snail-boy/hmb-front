<template>
  <div class="customer-wrapper">
    <a class="href" @click="handleClick">联系客服</a>
  </div>
</template>

<script>
  export default {
    name: "CustomerCom",
    methods: {
      handleClick() {
        this.$router.push('/customer')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/variables";
  .customer-wrapper {
    margin-top: 100px;
    .href {
      text-align: center;
      color: $base-color;
      text-decoration: underline;
    }
  }
</style>

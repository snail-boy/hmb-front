<template>
  <router-layout>
    <div class="customer-wrapper">
      客服中心
    </div>
  </router-layout>
</template>

<script>
  export default {
    name: "Customer",
    data() {
      return {
        src: '',
        form: {}
      }
    },
    created() {
      window.location.replace('https://zbkl.qiyukf.com/client?k=cb29d4bbaec5b457d52e0abc557367f7&wp=1&gid=480775802&robotShuntSwitch=1&robotId=5234611')
    }
  }
</script>

<style lang="scss">
  .customer-wrapper {
    .iframe-box {
      width: 100%;
      height: 100vh;
    }
  }
</style>

<template>
</template>
<script>
  export default {
    name: 'Real',
    data() {
      return {
        isReal: 1
      }
    },
    created() {
      if(this.isReal === 1) {
        this.goNoReal()
      }else if(this.isReal === 2) {
        this.goYesReal()
      }else if(this.isReal === 3) {
        this.goReReal()
      }
    },
    methods: {
      goNoReal() {
        this.$router.push('/real/noReal')
      },
      goYesReal() {
        this.$router.push('/real/yesReal')
      },
      goReReal() {
        this.$router.push('/real/reReal')
      }
    }
  }
</script>

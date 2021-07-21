<template>
  <div class="footer-phone">
    <p class="font-liner">咨询热线</p>
    <p v-for='(item, index) in $Setting.insureInfo' :key='index'>{{item.name}} {{item.phone}}</p>
  </div>
</template>

<script>
export default {
  name: 'FooterPhone'
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";
  .footer-phone{
      text-align: center;
      color: $base-color;
      margin-top: 30px;
      padding-bottom: 10px;
      p{
        font-size: 24px;
      }
      .font-liner{
        position: relative;
        &::after, &::before{
          content: "";
          position: absolute;
          height: 1px;
          width: 80px;
          background-color: #ccc;
        }
        &::after{
          top: 50%;
          left: 180px;
          transform: translateY(-50%);
        }
        &::before{
          top: 50%;
          right: 180px;
          transform: translateY(-50%);
        }
      }
    }
</style>

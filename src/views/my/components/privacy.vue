<template>
  <router-layout>
    <div class="privacy-wrapper">
      <div class="clause-wrapper">
        <van-tabs ref="clauseRef" :title-active-color="$globalColor.baseColor" :color="$globalColor.baseColor" scrollspy sticky offset-top="10vw" v-model="activeName">
          <div class="contents">
            <van-tab title="参保须知" name="key1">
              <div class="line"></div>
              <insured-clauses />
            </van-tab>
            <van-tab title="保障计划及产品条款" name="key2">
              <div class="line"></div>
              <product-clauses />
            </van-tab>
            <van-tab title="理赔须知" name="key3">
              <div class="line"></div>
              <claims-clauses />
            </van-tab>
            <van-tab title="医保个人结余账户支付授权书" name="key4">
              <div class="line"></div>
              <insurance-clauses />
            </van-tab>
            <van-tab title="用户协议" name="key5">
              <div class="line"></div>
              <user-clauses />
            </van-tab>
            <van-tab title="授权声明及重要提示内容及信息安全承诺书" name="key6">
              <div class="line"></div>
              <authorize-clauses />
              <footer-phone />
            </van-tab>
          </div>
        </van-tabs>
      </div>
    </div>
  </router-layout>
</template>

<script>
  import InsuredClauses from '../../agreement/insuredClauses'
  import InsuranceClauses from '../../agreement/insuranceClauses'
  import AuthorizeClauses from '../../agreement/authorizeClauses'
  import ClaimsClauses from '../../agreement/claimsClauses'
  import UserClauses from '../../agreement/userClauses'
  import ProductClauses from "../../agreement/productClause";
  import FooterPhone from "../../../components/global/footerPhone";
  export default {
    components: {
      FooterPhone,
      ProductClauses, InsuredClauses, UserClauses, ClaimsClauses, AuthorizeClauses, InsuranceClauses },
    name: "Privacy",
    data() {
      return {
        activeName: 'key5'
      }
    },
    mounted() {
      setTimeout(() => {
        this.$refs.clauseRef && this.$refs.clauseRef.scrollTo(this.activeName)
      }, 300)
    }
  }
</script>

<style lang="scss">
  .privacy-wrapper {
    .van-sticky {
      top: 0 !important;
    }
  }

</style>

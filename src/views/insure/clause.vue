<template>
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
          <in-clauses />
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
        <van-tab title="授权申明及重要提示内容及信息安全承诺书" name="key6">
          <div class="line"></div>
          <authorize-clauses />
<!--          <van-button class="button" plain hairline type="primary" @click="readFinish" :disabled="!finishTime">-->
<!--            已阅读，并同意上述内容-->
<!--            <div class="count-down-time" v-if="!finishTime">-->
<!--              (<van-count-down :time="time" format="ss" @change="onChange" />s)-->
<!--            </div>-->
<!--          </van-button>-->
          <van-button class="button" plain hairline type="primary" @click="readFinish">
            已阅读，并同意上述内容
          </van-button>
        </van-tab>
        <van-tab title="人身保险投保提示书" name="key7">
          <div class="line"></div>
          <self-clauses />
          <footer-phone/>
        </van-tab>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import InsuredClauses from '../agreement/insuredClauses'
import InsuranceClauses from '../agreement/insuranceClauses'
import AuthorizeClauses from '../agreement/authorizeClauses'
import ClaimsClauses from '../agreement/claimsClauses'
import UserClauses from '../agreement/userClauses'
import ProductClauses from "../agreement/productClause";
import InClauses from "../agreement/inclause";
import SelfClauses from "../agreement/selfClause";
export default {
  components: {InClauses, ProductClauses, InsuredClauses, UserClauses, ClaimsClauses, AuthorizeClauses, InsuranceClauses, SelfClauses },
  props: {
    keyValue: {
      type: String,
      default: 'key6'
    },
    fromPage: {
      type: String,
      default: ''
    }
  },
  watch: {
    keyValue(v) {
      this.activeName = v
      setTimeout(() => {
        this.$refs.clauseRef && this.$refs.clauseRef.scrollTo(v)
      }, 600)
    }
  },
  mounted() {
    this.activeName = this.keyValue
    setTimeout(() => {
      this.$refs.clauseRef && this.$refs.clauseRef.scrollTo(this.keyValue)
    }, 600)
  },
  data() {
    return {
      activeName: 'key6',
      time:  6 * 1000,
      finishTime: false
    }
  },
  methods: {
    readFinish() {
      this.$emit('readFinish')
    },
    onChange(v) {
      if(v.seconds === 0) {
        this.finishTime = true
      }
    }
  }
}

</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  .clause-wrapper {
    overflow: hidden;
    .line {
      margin: 0 auto;
      border-top: 1px solid #ddd;
    }
    .contents {
      padding-bottom: 100px;
    }
    .button {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      font-size: 32px;
      line-height: 100px;
      background-color: $base-color;
      text-align: center;
      border-radius: 2px;
      border: none;
      color: white;
      z-index: 100;
    }
    .count-down-time {
      display: inline-block;
      font-weight: bolder;
    }
    .van-count-down {
      display: inline-block;
      font-size: 30px;
      color: white;
      font-weight: bolder;
    }
  }
</style>

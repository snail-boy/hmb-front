<template>
    <router-layout>
      <div class="guarantee-wrapper">
        <product-clause />
        <in-clauses />
        <footer-phone/>
        <van-button class="now-btn" plain hairline @click="readFinish">返回</van-button>
      </div>
    </router-layout>
</template>

<script>
import InClauses from "../agreement/inclause";
import productClause from "../agreement/productClause";
export default {
  name: 'Guarantee',
  components: {InClauses, productClause },
  methods: {
    readFinish() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  .guarantee-wrapper {
    padding: 20px 20px 130px;
    font-family: "Songti TC";
    text-align: justify;
    h1 {
      text-align: center;
      margin: 40px auto;
      line-height: 50px;
      font-size: 40px;
      font-weight: bolder;
    }
  }
</style>

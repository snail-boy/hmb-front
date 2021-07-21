<template>
    <router-layout>
      <vue-slider @change="$globalSlidePage">
        <div class="confirm-wrapper">
        <div class="insure-top">
          <p>参保信息</p>
        </div>
        <div class="info-content" v-if="insured.hasOwnProperty('holder')">
          <div class="info-item">
            <div class="flex-start">
              <span class="dot"></span>
              <div class="header-title">本人信息（缴费人）</div>
            </div>
            <van-cell title="姓名" :value="insured.holder.name" />
            <van-cell title="证件类型" :value="insured.holder.certiType | idOptFilter" />
            <van-cell title="证件号码" :value="insured.holder.certiCode" />
            <van-cell v-if="insured.holder.birthday" title="出生日期" :value="insured.holder.birthday | parseTime('{y}-{m}-{d}')" />
            <van-cell v-if="insured.holder.gender" title="性别" :value="insured.holder.gender | genderFilter " />
            <van-cell title="手机号" :value="insured.holder.contactMobile" />
            <div class="info-item info-item-two">
              <div class="flex-start">
                <span class="dot"></span>
                <div class="header-title">为谁参保（被保人）</div>
              </div>
              <div class="insured-box" v-for="(item1, i) in insured.issureds" :key="i">
                <div class="insured-name">
                  <p>被保人{{i+1}}</p>
                </div>
                <div class="insured-input">
                  <van-cell title="与参保人关系" :value="item1.relationWtHolder | relationWtHolderFilter" />
                  <van-cell title="姓名" :value="item1.name" />
                  <van-cell title="证件类型" :value="item1.certiType | idOptFilter " />
                  <van-cell title="证件号码" :value="item1.certiCode" />
                  <van-cell v-if="item1.certiType !== '1'" title="出生日期" :value="item1.birthday | parseTime('{y}-{m}-{d}')" />
                  <van-cell v-if="item1.certiType !== '1'" title="性别" :value="item1.gender | genderFilter " />
                </div>
              </div>
            </div>
          </div>
          <van-cell title="续费方式" :value="insured.isRennew | isRennewFilter" />
          <footer-phone />
          <div class="read-confirm">
            <div class="checkbox-box">
              <van-checkbox class="checkbox" disabled v-model="checked" shape="square">
                <div class="text">
                  <span>我已知悉：本产品的被保险人仅限青岛市本级及青岛市职工、城乡居民基本医疗保险人员参保，已经阅读并同意</span>
                  <span class="clause">《参保须知》</span>
                  <span class="clause">《保障计划及产品条款》</span>
                  <span class="clause">《理赔细则》</span>
                  <span class="clause">《医保个人结余账户支付授权书》</span>
                  <span class="clause">《用户协议》</span>
                  <span class="clause">《授权声明及重要提示内容及信息安全承诺书》</span>
                </div>
              </van-checkbox>
            </div>
            <div class="submit-box flex-sb">
              <div>
                <span class="total">保险费合计</span>
                <span class="cost">{{insured.prem.premAmount}}.00元</span>
              </div>
              <van-button type="info" @click="onSubmit">
                确认
              </van-button>
            </div>
          </div>
        </div>
      </div>
      </vue-slider>
    </router-layout>
</template>

<script>
import { saveOrder } from '../../api'
import {posAgendID, S_OK} from '../../utils/constant'
import FooterPhone from "../../components/global/footerPhone";

export default {
  name: 'Confirm',
  components: {FooterPhone},
  data() {
    return {
      insured: {},
      checked: true
    }
  },
  mounted() {
    this.insured = this.$store.state.app.insureInfo
  },
  activated() {
    this.insured = this.$store.state.app.insureInfo
  },
  methods: {
    async onSubmit() {
      const result = await saveOrder(this.insured)
      if (result.code === S_OK) {
        this.$store.dispatch('setOrderInfo', {...result.data,  from: 'confirm'})
        let agentID = JSON.parse(sessionStorage.getItem('commonParams')).agentID
        if(agentID.indexOf('#/') > -1) {
          agentID = agentID.split('#')[0]
        }
        if(sessionStorage.getItem('commonParams') && agentID === posAgendID) {
          this.$router.replace('/goPos')
        }else {
          this.$router.replace({name: 'PayWay', query: { from: 'confirm', routeWay: '3' }})
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  .confirm-wrapper {
    position: relative;
    color: #666;
    padding-bottom: 260px;
    .insure-top {
      font-size: 32px;
      padding: 30px 0 20px 20px;
      border-bottom: 1px solid #ddd;
    }
    .info-content {
      margin: 40px auto 70px;
      padding: 0 20px;
      .dot {
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background-color: $base-color;
        margin-right: 10px;
      }
      .form-box {
        font-size: 12px;
      }
      .info-item {
        margin-bottom: 10px;
      }
      .info-item-two {
        margin-top: 80px;
        .insured-box {
          margin-top: 20px;
          font-size: 24px;
          .insured-name {
            margin: 20px;
          }
          .insured-item-box {
            padding-bottom: 20px;
            margin: 0 20px;
            .insured-active {
              background: url('../../assets/images/inserd-bg.png') no-repeat;
              background-size: 140px 60px;
              border: none;
              box-sizing: border-box;
            }
          }
          .insured-item {
            width: 140px;
            height: 60px;
            border: 1px solid #999;
            text-align: center;
            line-height: 60px;
            border-radius: 2px;
          }
        }
      }
    }
    .renewal-way {
      margin-top: 30px;
      .renewal-way-item {
        width: 338px;
        border: 1px solid #ddd;
        padding: 20px;
        height: 200px;
        box-sizing: border-box;
        .top {
          text-align: center;
          color: $base-color;
          .line {
            display: inline-block;
            width: 100px;
            height: 1px;
            background: $base-color;
            vertical-align: middle;
          }
          .text {
            margin: 0 10px;
            font-weight: bolder;
            font-size: 26px;
          }
        }
        .auto-cash {
          font-weight: bolder;
          color: #000;
          font-size: 26px;
          margin: 10px auto;
        }
        &:nth-child(2) {
          .auto-cash {
            margin-top: 40px;
          }
        }
      }
    }
    .read-confirm {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 280px;
      background: white;
      border-top: 1px solid #eee;

      .checkbox-box {
        height: 180px;
        line-height: 180px;
        overflow: auto;
        color: #c8c9cc;
        .checkbox {
          margin-left: 40px;
          padding-top: 20px;
          .text {
            color: #666;
            flex: 1;
            text-align: justify;
            margin-right: 16px;
          }
        }
      }

      .submit-box {
        width: 100%;
        height: 100px;
        border-top: 1px solid #ddd;
        margin: 0 auto;
        background: #fafafa;

        .total {
          margin: 0 10px 0 200px;
        }

        .cost {
          color: $base-color;
          font-size: 28px;
        }

        .van-button--info {
          border-radius: 0;
          width: 240px;
          background: $base-color;
          border: none;
          height: 100px;
        }
      }
    }
    .driver {
      width: 100%;
      height: 1px;
      background: #ddd;
      margin: 80px auto 20px;
    }
    .insured-input {
      margin: 0 20px;
    }
    .van-cell {
      font-size: 24px;
      color: #666
    }
    .form-box {
      margin: 20px auto;
      .code-btn {
        background: $base-color;
        border: none;
        width: 160px;
      }
    }
    .add-insured {
      width: 100%;
      background: white !important;
      margin-top: 60px;
      margin-bottom: 30px;
      line-height: 60px;
      color: $base-color;
      border: 1px solid #ddd;
    }
    .header-title {
      font-size: 28px;
    }
  }
</style>
<style lang="scss">
  .confirm-wrapper {
    .van-field--disabled .van-field__label {
      color: #5f626d !important;
    }
    .van-field__control:disabled{
      color: #5f626d !important;
      -webkit-text-fill-color: #5f626d
    }
  }
</style>

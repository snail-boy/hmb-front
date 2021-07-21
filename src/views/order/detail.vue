<template>
  <router-layout>
    <vue-slider @change="$globalSlidePage">
      <div class="detail-wrapper">
        <div content="detail-content" style="background: white">
          <div class="title">
            <div class="flex-start">
              <span class="dot"></span>
              <div>订单详情</div>
            </div>
          </div>
          <div class="order-content">
            <van-cell title="产品名称" :border="false" :value="resultList.productName"/>
            <van-cell title="产品金额" :border="false" :value="resultList.sumPremium"/>
            <van-cell title="订单号" :border="false" :value="resultList.orderNo"/>
            <van-cell title="缴费人姓名" :border="false" :value="resultList.holderName"/>
            <van-cell title="缴费日期" :border="false" :value="resultList.applyDate"/>
            <van-cell title="保障期限" :border="false" :value="resultList.effectDate"/>
            <van-cell title="订单状态" class="flex-sb">
              <template #right-icon>
                <van-tag :type="statusClass[resultList.orderStatus]">{{resultList.orderStatus | orderStatusFilter}}
                </van-tag>
              </template>
            </van-cell>
          </div>
          <div class="content content-two">
            <div class="content-title-box flex-sb">
              <div class="content-title">被保人信息</div>
            </div>
            <div v-for="(item, index) in resultList.insureds" :key="index">
              <div class="detail-insured-people">被保人{{index+1}}</div>
              <van-cell title="姓名" :border="false" :value="item.name"/>
              <van-cell title="证件号码" :border="false" :value="item.certNo" />
              <van-cell title="承保时间" :border="false" :value="item.approveDate"/>
            </div>
          </div>
          <div class="company">
            <div class="flex-sb">
              <div class="content-title bao-con">
                <span class="dot"></span>
                <div>保障内容</div>
              </div>
              <van-tag :color="$globalColor.baseColor" @click="goDetail">查看详情</van-tag>
            </div>
            <table-to-json :table-data-head="dutyArr" :tableData="dutyContentArr"></table-to-json>
          </div>
          <img class="qr-code-box" src="../../assets/images/code.jpeg" alt="" />
          <div class="global-tips">关注“琴岛e保”公众号查询订单并了解产品信息</div>
          <footer-phone />
        </div>
      </div>
    </vue-slider>
  </router-layout>
</template>

<script>
  import {orderDetail, userOrderDetail} from '../../api'
  import {getQueryObject, omit} from '../../utils'
import { S_OK, statusClass } from '../../utils/constant'
import TableToJson from "../../components/global/tableToJson";
import { dutyArr, dutyContentArr } from "../../utils/json";
  import FooterPhone from "../../components/global/footerPhone";

export default {
  name: 'Detail',
  components: {FooterPhone, TableToJson },
  data() {
    return {
      resultList: {},
      statusClass: statusClass,
      dutyArr: dutyArr,
      dutyContentArr: dutyContentArr
    }
  },
  // 解决从列表页到详情页，调接口，查询，完了，在回退到列表页，位置不变的问题
  activated() {
    if(this.$route.query.from && this.$route.query.from === 'userCenter') {
      this.getUserDetail(getQueryObject().id)
    }else {
      this.getDetail()
    }
  },
  methods: {
    async getDetail() {
      const params = omit(this.$route.query, 'from')
      const result = await orderDetail(params)
      if (result.code === S_OK) {
        this.resultList = result.data
      }
    },
    async getUserDetail(id) {
      let result = await userOrderDetail({id: id})
      if(result.code === S_OK) {
        this.resultList = result.data
      }
    },
    goDetail() {
      this.$router.push('/guarantee')
    },
    voucherDownload(params) {
      this.$router.push({ name: 'VoucherDownload',  query: params })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/variables";

  .detail-wrapper {
    background: #EEEEEE;
    margin-bottom: 100px;

    .detail-content {
      background: white;
    }

    .van-cell {
      font-size: 24px;
      color: #666;
      padding: 0 20px;
    }

    .title {
      padding-left: 20px;
      height: 80px;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      line-height: 80px;
      font-size: 28px;
      color: #3E3E3E;
      margin-top: 20px;

      .dot {
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background-color: $base-color;
        margin-right: 10px;
      }
    }

    .order-content, .company {
      margin: 20px;
      border-bottom: 1px dotted #eee;
      padding-bottom: 20px;
    }

    .company {
      padding: 10px 0 0;
      .flex-sb {
        margin-bottom: 20px;
      }
    }

    .content-title-box {
      margin-bottom: 20px;
    }

    .content-title {
      margin-left: 40px;
      color: #525252;
      font-size: 28px;
    }

    .bao-con {
      margin-left: 20px;
    }

    .pay-status {
      width: 140px;
      height: 50px;
      line-height: 50px;
      background: #ffecd1;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
      color: #94704a;
      text-indent: 30px;

    }

    .content {
      border-bottom: 1px dotted #eee;
      padding-bottom: 10px;
      margin-top: 30px;

      .van-cell {
        padding: 4px 40px;
      }
    }

    .detail-insured-people {
      margin: 30px 0 20px 40px;
      color: #666;
    }

    .content-two {
      border-bottom: none;
    }
    .now-btn {
      display: block;
      width: 600px;
      height: 80px;
      font-size: 28px;
      line-height: 70px;
      background-color: $base-color;
      border: none;
      text-align: center;
      margin: 50px auto 20px;
      color: white;
    }
    .voucher-btn {
      margin-bottom: 40px;
    }
    .van-cell__title {
      flex: .3;
    }
  }

</style>

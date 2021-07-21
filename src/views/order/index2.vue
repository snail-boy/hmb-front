<template>
  <router-layout>
    <vue-slider @change="$globalSlidePage">
      <div class="order-wrapper">
        <div class="order-item" v-for="(item, index) in orderList" :key="index" @click="showPopup(item)" >
          <div class="order-title-content">
              <van-cell v-if="item.orderStatus === '11'" title="订单状态" label="退款受理中，预计1~5个工作日到账" title-class="titleClass" class="order-status-11">
                <template>
                  <van-tag :type="statusClass[item.orderStatus]">{{item.orderStatus | orderStatusFilter}}</van-tag>
                </template>
                <template #right-icon>
                  <img class="left-img" src="../../assets/images/left-icon.png" />
                </template>
              </van-cell>
              <van-cell  v-else title="订单状态" label="" title-class="titleClass" class="order-status-11">
                <template>
                  <van-tag :type="statusClass[item.orderStatus]">{{item.orderStatus | orderStatusFilter}}</van-tag>
                </template>
                <template #right-icon>
                  <img class="left-img" src="../../assets/images/left-icon.png" />
                </template>
              </van-cell>
          </div>
          <div class="order-content">
            <van-cell title="保险名称" :value="item.productName" />
            <van-cell title="缴费人姓名" :value="item.holderName" />
            <van-cell title="订单日期" :value="item.applyDate | parseTime('{y}-{m}-{d}')" />
            <van-cell title="订单号" :value="item.orderNo" />
          </div>
        </div>
        <van-action-sheet
                v-model="showPicker"
                :actions="actions"
                cancel-text="取消"
                close-on-click-action
                @cancel="showPicker = false"
                @select="handleSelect"
        />
        <sms-code
                :smsCodeVisible.sync="smsCodeVisible"
                :smsCodePhone="smsCodePhone"
                :smsCodeId="smsCodeId"
                :smsCodeFrom="smsCodeFrom"
                @smsCodeCancel="smsCodeCancel"
        />
      </div>
      <search-order />
    </vue-slider>
  </router-layout>
</template>

<script>
import {cancelOrder, refundOrder} from '../../api'
import {Dialog, Toast} from 'vant'
import {aliToken, busiDomainCode, S_OK, statusClass} from '../../utils/constant'
import SmsCode from "../../components/smsCode";
import SearchOrder from "../../components/search";

export default {
  name: 'Order',
  components: { SearchOrder, SmsCode },
  data() {
    return {
      value: '',
      showPicker: false,
      actions: [],
      orderList: [],
      item: {},
      statusClass: statusClass,
      currentChangeId: '',
      smsCodeVisible: false,
      smsCodePhone: '',
      smsCodeId: '',
      smsCodeFrom: 'returnPay' // 从那个组件调用短信验证的
    }
  },
  created() {
    this.orderList = this.$store.state.app.searchOrder
  },
  methods: {
    showPopup(item) {
      if(item.ownerB) { // 若是是true, 都显示, 如果为false 只显示查看详情
        if (item.orderStatus === '1' || item.orderStatus === '2') {
          if(item.allowPayment) {
            this.actions = [{ name: '立即支付', color: this.$globalColor.baseColor, status: 2 }, { name: '取消订单', status: 3 }, { name: '查看详情', status: 1 }]
          }else {
            this.actions = [{ name: '取消订单', status: 3 }, { name: '查看详情', status: 1 }]
          }
        }
        if (item.orderStatus === '3') {
          if(item.allowPayment) {
            this.actions = [{ name: '撤单', status: 4 }, { name: '查看详情', status: 1 }]
          }else {
            this.actions = [{ name: '查看详情', status: 1 }]
          }
        }
        if (item.orderStatus === '4' || item.orderStatus === '8' || item.orderStatus === '9' || item.orderStatus === '11' || item.orderStatus === '12' || item.orderStatus === '13') {
          this.actions = [{ name: '查看详情', status: 1 }]
        }
      }else {
        if (item.orderStatus === '1' || item.orderStatus === '2') {
          if(item.allowPayment) {
            this.actions = [{ name: '查看详情', status: 1 }]
          }else {
            this.actions = [{ name: '查看详情', status: 1 }]
          }
        }
        if (item.orderStatus === '3') {
          if(item.allowPayment) {
            this.actions = [{ name: '查看详情', status: 1 }]
          }else {
            this.actions = [{ name: '查看详情', status: 1 }]
          }
        }
        if (item.orderStatus === '4' || item.orderStatus === '8' || item.orderStatus === '9' || item.orderStatus === '11' || item.orderStatus === '12' || item.orderStatus === '13') {
          this.actions = [{ name: '查看详情', status: 1 }]
        }
      }
      this.item = item
      this.showPicker = true
    },
    async handleSelect(value) {
      if (value.status === 2) {
        this.$store.dispatch('setOrderInfo', { orderNo: this.item.orderNo, token: this.item.token,name: this.item.holderName, certiCode: this.item.holderNumber, phoneNo: this.item.phone })
        let commonParams = { agentID: this.item.token, busiDomainCode: busiDomainCode }
        sessionStorage.setItem('commonParams', JSON.stringify(commonParams))
        this.$router.push({ name: 'PayWay', query: { from: 'order',  routeWay: '2' }})
      } else if (value.status === 3) {
        Dialog.confirm({
          title: '取消订单',
          message: '确定取消订单吗？',
          confirmButtonColor: this.$globalColor.baseColor
        })
          .then(() => {
            this.cancelOrderFun()
          })
      } else if (value.status === 1) {
        this.orderDetailFun()
      } else if (value.status === 4) {
        if (this.item.token === aliToken) {
          Toast({message: '该订单为支付宝入口参保订单，请在【支付宝APP】-【我的】-【蚂蚁保】-【家庭蓝保单 】中找到对应保单进行相应操作', duration: 5000})
        }else {
          Dialog.confirm({
            title: '撤单',
            message: '确定撤单吗？',
            confirmButtonColor: this.$globalColor.baseColor
          }).then(() => {
            this.smsCodeFun()
          })
        }
      }
    },
    smsCodeFun() {
      this.smsCodeVisible = true
      this.smsCodePhone = this.item.phone
      this.smsCodeId = this.item.id
    },
    async refundOrderFun(params, callback) {
      const result = await refundOrder(params)
      if (result.code === S_OK) {
        this.currentChangeId = result.data.id
        this.orderList.filter(value => {
          if (value.id === this.currentChangeId) {
            value.orderStatus = result.data.transStatus
          }
        })
        callback && callback(true)
        this.$store.dispatch('setSearchOrder', this.orderList)
        this.refresh()
        console.log(1)
      }else {
        callback && callback(false)
        //this.refresh()
        console.log(2)
      }
    },
    refresh() {
      this.smsCodeVisible = false
      //this.smsCodePhone = ''
      this.smsCodeId = ''
    },
    async cancelOrderFun() {
      const params = {
        id: this.item.id
      }
      const result = await cancelOrder(params)
      if (result.code === S_OK) {
        this.currentChangeId = result.data.id
        this.orderList.filter(value => {
          if (value.id === this.currentChangeId) {
            value.orderStatus = result.data.transStatus
          }
        })
        this.$store.dispatch('setSearchOrder', this.orderList)
        this.refresh()
        console.log(3)
      }
    },
    async orderDetailFun() {
      this.$router.push({ name: 'Detail', query: { id: this.item.id }})
    },
    smsCodeCancel() {
      this.smsCodeVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  .order-wrapper {
    background: $bg-color;
    .order-item {
      background: white;
      margin: 0 auto 20px;
    }
    .order-title-content {
      .van-cell__value {
        text-align: left;
        margin-left: -182px;
      }
      .order-status-11 {
        .van-cell__label {
          width: 420px;
        }
      }
    }
    .titleClass {
      flex: none;
    }
    .valueClass {
      text-align: left;
    }
    .order-content {
      padding:20px;
      .van-cell {
        font-size: 24px;
        color: #666;
        padding: 1px 20px;
        border: none;
      }
      .van-cell::after {
        border: none;
      }
    }
    .left-img {
      width: 40px;
      height: 40px;
      animation: scaleLarge 2s 2s;
    }
    @keyframes scaleLarge {
      0% {
        transform: scale(1);
      }
      25% {
        transform: scale(1.6);
      }
      50%  {
        transform: scale(1);
      }
      75% {
        transform: scale(1.6);
      }
      100% {
        transform: scale(1);
      }
    }
  }
</style>

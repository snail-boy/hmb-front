<template>
  <router-layout>
    <div class="order-wrapper">
      <van-tabs class="order-list-wrapper" :title-active-color="$globalColor.baseColor" :color="$globalColor.baseColor" sticky v-model="active" @change="handleTab">
        <van-tab title="全部">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="order-list-box">
              <van-notice-bar color="#1989fa" background="#ecf9ff" :scrollable="false">
                若你没有找到订单，请点击订单查询！
                <van-button class="round-btn" type="primary"  :color="$globalColor.baseColor" @click="searchOrder">订单查询</van-button>
              </van-notice-bar>
              <div class="order-item" v-for="(item, index) in orderList" :key="index">
                <div class="order-title-content">
                  <van-cell :label="item.orderStatus === '11' ? '退款受理中，预计1~5个工作日到账' : ''" title-class="titleClass">
                    <template #title>
                      <span class="custom-title">{{item.productName}}</span>
                      <img v-if="item.groupOrderB" class="tuan-img-box" src="../../assets/images/tuan.png" alt="" />
                    </template>
                    <template>
                      <van-tag :type="statusClass[item.orderStatus]">{{item.orderStatus | orderStatusFilter}}</van-tag>
                    </template>
                  </van-cell>
                </div>
                <div class="order-content">
                  <div class="order-list">
                    <van-cell title="订单号" :value="item.orderNo" />
                    <van-cell title="参保人" :value="item.insuredsName" />
                    <van-cell title="订单时间" :value="item.createTime" />
                    <van-cell title="订单金额" :value="item.sumPremium" />
                  </div>
                  <div class="order-operation flex-sb">
                    <div class="operation-name">操作</div>
                    <div>
                      <van-button v-if="(item.orderStatus === '1' || item.orderStatus === '2') && item.ownerB" size="small" :color="$globalColor.baseColor" @click="handlePay(item)">立即支付</van-button>
                      <van-button class='cancel-box' v-if="(item.orderStatus === '1' || item.orderStatus === '2') && item.ownerB" size="small" :color="$globalColor.baseColor" @click="handleCancel(item)">取消订单</van-button>
                      <van-button class='cancel-box' v-if="item.orderStatus === '3' && !item.groupOrderB && item.ownerB" size="small" :color="$globalColor.baseColor" @click="handleBack(item)">撤单</van-button>
                      <van-button size="small" :color="$globalColor.baseColor" @click="handleDetail(item)">查看详情</van-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已支付">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="order-list-box">
              <van-notice-bar color="#1989fa" background="#ecf9ff" :scrollable="false">
                若你没有找到订单，请点击订单查询！
                <van-button class="round-btn" type="primary"  :color="$globalColor.baseColor" @click="searchOrder">订单查询</van-button>
              </van-notice-bar>
              <div v-if="payList.length>0">
                <div class="order-item" v-for="(item, index) in payList" :key="index">
                  <div class="order-title-content">
                    <van-cell :label="item.orderStatus === '11' ? '退款受理中，预计1~5个工作日到账' : ''" title-class="titleClass">
                      <template #title>
                        <span class="custom-title">{{item.productName}}</span>
                        <img v-if="item.groupOrderB" class="tuan-img-box" src="../../assets/images/tuan.png" alt="" />
                      </template>
                      <template>
                        <van-tag :type="statusClass[item.orderStatus]">{{item.orderStatus | orderStatusFilter}}</van-tag>
                      </template>
                    </van-cell>
                  </div>
                  <div class="order-content">
                    <div class="order-list">
                      <van-cell title="订单号" :value="item.orderNo" />
                      <van-cell title="参保人" :value="item.insuredsName" />
                      <van-cell title="订单时间" :value="item.createTime" />
                      <van-cell title="订单金额" :value="item.sumPremium" />
                    </div>
                    <div class="order-operation flex-sb">
                      <div class="operation-name">操作</div>
                      <div>
<!--                        <van-button size="small" v-if="item.orderStatus === '3'" :color="$globalColor.baseColor" @click="handleVoucher(item)">凭证下载</van-button>-->
                        <van-button class='cancel-box' v-if="item.orderStatus === '3' && !item.groupOrderB && item.ownerB" size="small" :color="$globalColor.baseColor" @click="handleBack(item)">撤单</van-button>
                        <van-button size="small" :color="$globalColor.baseColor" @click="handleDetail(item)">查看详情</van-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <van-empty v-else  class="custom-image" :image="imageNoOrder" description="暂无订单" />
            </div>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已终止">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="order-list-box">
              <van-notice-bar color="#1989fa" background="#ecf9ff" :scrollable="false">
                若你没有找到订单，请点击订单查询！
                <van-button class="round-btn" type="primary"  :color="$globalColor.baseColor" @click="searchOrder">订单查询</van-button>
              </van-notice-bar>
              <div v-if="finishList.length>0">
                <div class="order-item" v-for="(item, index) in finishList" :key="index">
                  <div class="order-title-content">
                    <van-cell :label="item.orderStatus === '11' ? '退款受理中，预计1~5个工作日到账' : ''" title-class="titleClass">
                      <template #title>
                        <span class="custom-title">{{item.productName}}</span>
                        <img v-if="item.groupOrderB" class="tuan-img-box" src="../../assets/images/tuan.png" alt="" />
                      </template>
                      <template>
                        <van-tag :type="statusClass[item.orderStatus]">{{item.orderStatus | orderStatusFilter}}</van-tag>
                      </template>
                    </van-cell>
                  </div>
                  <div class="order-content">
                    <div class="order-list">
                      <van-cell title="订单号" :value="item.orderNo" />
                      <van-cell title="参保人" :value="item.insuredsName" />
                      <van-cell title="订单时间" :value="item.createTime" />
                      <van-cell title="订单金额" :value="item.sumPremium" />
                    </div>
                    <div class="order-operation flex-sb">
                      <div class="operation-name">操作</div>
                      <div>
                        <van-button size="small" :color="$globalColor.baseColor" @click="handleDetail(item)">查看详情</van-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <van-empty v-else  class="custom-image" :image="imageNoOrder" description="暂无订单" />
            </div>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="待处理" :dot="waitList.length>0">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="order-list-box">
              <van-notice-bar color="#1989fa" background="#ecf9ff" :scrollable="false">
                若你没有找到订单，请点击订单查询！
                <van-button class="round-btn" type="primary"  :color="$globalColor.baseColor" @click="searchOrder">订单查询</van-button>
              </van-notice-bar>
              <div v-if="waitList.length>0">
                <div class="order-item" v-for="(item, index) in waitList" :key="index">
                  <div class="order-title-content">
                    <van-cell :label="item.orderStatus === '11' ? '退款受理中，预计1~5个工作日到账' : ''" title-class="titleClass">
                      <template #title>
                        <span class="custom-title">{{item.productName}}</span>
                        <img v-if="item.groupOrderB" class="tuan-img-box" src="../../assets/images/tuan.png" alt="" />
                      </template>
                      <template>
                        <van-tag :type="statusClass[item.orderStatus]">{{item.orderStatus | orderStatusFilter}}</van-tag>
                      </template>
                    </van-cell>
                  </div>
                  <div class="order-content">
                    <div class="order-list">
                      <van-cell title="订单号" :value="item.orderNo" />
                      <van-cell title="参保人" :value="item.insuredsName" />
                      <van-cell title="订单时间" :value="item.createTime" />
                      <van-cell title="订单金额" :value="item.sumPremium" />
                    </div>
                    <div class="order-operation flex-sb">
                      <div class="operation-name">操作</div>
                      <div>
                        <van-button v-if="(item.orderStatus === '1' || item.orderStatus === '2') && item.ownerB" size="small" :color="$globalColor.baseColor" @click="handlePay(item)">立即支付</van-button>
                        <van-button class='cancel-box' v-if="(item.orderStatus === '1' || item.orderStatus === '2') && item.ownerB" size="small" :color="$globalColor.baseColor" @click="handleCancel(item)">取消订单</van-button>
                        <van-button size="small" :color="$globalColor.baseColor" @click="handleDetail(item)">查看详情</van-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <van-empty v-else  class="custom-image" :image="imageNoOrder" description="暂无订单" />
            </div>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
      <sms-code
              :smsCodeVisible.sync="smsCodeVisible"
              :smsCodePhone="smsCodePhone"
              :smsCodeId="smsCodeId"
              :smsCodeFrom="smsCodeFrom"
              @smsCodeCancel="smsCodeCancel"
      />
      <van-action-sheet
              v-model="showPicker"
              :actions="actions"
              cancel-text="取消"
              close-on-click-action
              @cancel="showPicker = false"
              @select="handleSelect"
      />
      <span class="footer-box">已经到底了～</span>
    </div>
  </router-layout>
</template>

<script>
  import {cancelOrder, getInsured, refundOrder, searchOrder, userOrderList} from '../../api'
import {Dialog, Toast} from 'vant'
import {aliToken, busiDomainCode, S_OK, statusClass} from '../../utils/constant'
import SmsCode from "../../components/smsCode";

export default {
  name: 'Order',
  components: { SmsCode },
  data() {
    return {
      value: '',
      showPicker: false,
      actions: [],
      orderList: [],
      payList: [],
      finishList: [],
      waitList: [],
      item: {},
      statusClass: statusClass,
      currentChangeId: '',
      smsCodeVisible: false,
      smsCodePhone: '',
      smsCodeId: '',
      smsCodeFrom: 'returnPay', // 从那个组件调用短信验证的
      orderActive: 10,
      active: 0,
      imageNoOrder: require('../../assets/images/no-order.png'),
      isLoading: false,
      fromPage: {
        from: ''
      }, // 从那个页面过来的
    }
  },
  created() {
    this.fromPage =  this.$route.query && this.$route.query.data && JSON.parse(decodeURI(this.$route.query.data))
    this.$nextTick(() => {
      this.active = sessionStorage.getItem('searchOrderActiveTab') ? Number(sessionStorage.getItem('searchOrderActiveTab')) : 0
      this.orderList = this.$store.state.app.searchOrder
      this.payList = this.orderList.filter(val => {
        return val.orderStatus === '3'
      })
      this.finishList = this.orderList.filter(val => {
        return val.orderStatus === '8' || val.orderStatus === '9'
      })
      this.waitList = this.orderList.filter(val => {
        return val.orderStatus === '1' || val.orderStatus === '2'
      })
    })
  },
  activated() {
    this.fromPage =  this.$route.query && this.$route.query.data && JSON.parse(decodeURI(this.$route.query.data))
    this.$nextTick(() => {
      this.active = sessionStorage.getItem('searchOrderActiveTab') ? Number(sessionStorage.getItem('searchOrderActiveTab')) : 0
      this.orderList = this.$store.state.app.searchOrder
      this.payList = this.orderList.filter(val => {
        return val.orderStatus === '3'
      })
      this.finishList = this.orderList.filter(val => {
        return val.orderStatus === '8' || val.orderStatus === '9'
      })
      this.waitList = this.orderList.filter(val => {
        return val.orderStatus === '1' || val.orderStatus === '2'
      })
    })
  },
  methods: {
    async onRefresh() {
      if (!this.$route.query.data) return
      const params = this.$route.query.data && JSON.parse(decodeURI(this.$route.query.data))
      let result = ''
      if (params.from === 'userCenter') {
        result = await userOrderList()
      }else {
        result = await searchOrder(params)
      }
      if (result.code === S_OK) {
        setTimeout(() => {
          this.isLoading = false
          this.orderList = result.data.list
          this.$store.dispatch('setSearchOrder', this.orderList)
          this.payList = this.orderList.filter(val => {
            return val.orderStatus === '3'
          })
          this.finishList = this.orderList.filter(val => {
            return val.orderStatus === '8' || val.orderStatus === '9'
          })
          this.waitList = this.orderList.filter(val => {
            return val.orderStatus === '1' || val.orderStatus === '2'
          })
        }, 1000)
      } else {
        Toast(result.message)
      }
    },

    handleDetail(item) {
      this.orderDetailFun(item.id)
    },

    handlePay(item) {
      if(item.ownerB && item.allowPayment) {
        this.$store.dispatch('setOrderInfo', { orderNo: item.orderNo, token: item.token,name: item.holderName, certiCode: item.holderNumber, phoneNo: item.phone })
        let commonParams = { agentID: item.token, busiDomainCode: busiDomainCode }
        sessionStorage.setItem('commonParams', JSON.stringify(commonParams))
        this.$router.push({ name: 'PayWay', query: { from: 'order',  routeWay: '2' }})
      }
    },

    handleBack(item) {
      if(item.ownerB && item.allowPayment) {
        this.item = item
        if (item.token === aliToken) {
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

    handleCancel(item) {
      if(item.ownerB && item.allowPayment) {
        Dialog.confirm({
          title: '取消订单',
          message: '确定取消订单吗？',
          confirmButtonColor: this.$globalColor.baseColor
        })
          .then(() => {
            this.cancelOrderFun(item.id)
          })
      }
    },

    handleTab() {
      sessionStorage.setItem('searchOrderActiveTab', this.active)
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
        this.refresh()
      }else {
        callback && callback(false)
      }
    },
    refresh() {
      this.smsCodeVisible = false
      this.smsCodePhone = ''
      this.smsCodeId = ''
    },
    async cancelOrderFun(id) {
      const result = await cancelOrder({id})
      if (result.code === S_OK) {
        this.currentChangeId = result.data.id
        this.orderList.filter(value => {
          if (value.id === this.currentChangeId) {
            value.orderStatus = result.data.transStatus
          }
        })
        this.refresh()
      }
    },
    async orderDetailFun(id) {
      this.$router.push({ name: 'Detail', query: { from: this.fromPage.from, name: this.fromPage.name, certNo: this.fromPage.certNo, id: id }})
    },
    smsCodeCancel() {
      this.smsCodeVisible = false
    },
    searchOrder() {
      this.$router.push('/searchOrder')
    },
    async handleVoucher(item) {
      this.actions = item.insureds
      this.showPicker = true
    },
    async handleSelect(item) {
      const result = await getInsured(item)
      if (result.code === S_OK) {
        this.$router.push({ name: 'VoucherDownload', query: result.data })
      } else {
        Toast(result.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  .order-wrapper {
    background: $bg-color;
    .footer-box {
      width: 100%;
      display: inline-block;
      text-align: center;
    }
    .order-item {
      background: white;
      margin: 0 auto 20px;
    }
    .order-list-wrapper {
      width: 100%;
      min-height: 100vh;
    }
    .order-title-content {
      .van-cell__value {
        text-align: left;
        flex: 1;
      }
    }
    .titleClass {
      flex: 1;
    }
    .valueClass {
      text-align: left;
    }
    .order-content {
      padding:0 20px 20px;
      .order-list {
        padding-bottom: 20px;
      }
      .operation-name {
        font-size: 26px;
      }
      .order-operation {
        border-top: 1px solid #eee;
        padding: 20px 20px 0;
        .van-button {
          margin-left: 20px;
        }
      }
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
    .order-list-box {
      min-height: calc(100vh - 100px);
    }
    .custom-title {
      display: inline-block;
      vertical-align: middle;
    }
    .tuan-img-box {
      width: 40px;
      vertical-align: middle;
      margin-left: 50px;
    }
    .cancel-box {
      background: #B1B1B1 !important;
      border: none !important;
    }
  }
</style>

<style lang="scss">
  .order-wrapper {
    .van-sticky {
      margin-bottom: 10px;
    }
    .order-title-content {
      .titleClass {
        flex: 1;
      }
      .van-cell__value {
        flex: none !important;
      }
    }
    .van-button--small {
      height: 50px;
      border-radius: 10px;
    }
    .round-btn {
      border-radius: 18px;
      height: 60px;
      vertical-align: middle;
      line-height: 1.1;
    }
    .custom-image {
      width: 100%;
      margin: 200px auto;
      .van-empty__image {
        width: 141px;
        height: 178px;
      }
    }
  }
</style>

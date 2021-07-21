<template>
  <div class="user-center-wrapper" @click="handleClick">
    <div class="user-top">
      <div class="flex-sa user-top-centent" @click.stop="handleLogin">
        <div class="user-icon">
          <img :src="headImgUrl" alt="" />
        </div>
        <div class="user-tip" v-if="!isLogin">登录或注册</div>
        <div class="user-tip" v-if="isLogin">
          <span class="user-phone">{{ phoneNo }}</span>
          <span class="user-id">{{ isIdentified ? '已实名认证' : '未实名认证'}}</span>
        </div>
        <div>
          <van-icon color='#eee' name="arrow" />
        </div>
      </div>
      <!-- 保障人数标题栏 -->
      <div class="user-title flex-sb" @click.stop>
        <div class='icon-user-box'>
          <span class="icon-user-1"></span>
          <span class="user-title-font">已保障家庭成员{{dataList.memberCount || "0"}}人</span>
        </div>
<!--        <div class="user-title-icon">-->
<!--          <van-icon name="arrow" size="10" />-->
<!--        </div>-->
      </div>
    </div>

    <div class="user-home">
      <div class="user-home-top flex-sb">
        <div class="user-home-top-font">
          家庭成员
        </div>
        <div class="user-home-top-inform">
          <van-icon class-prefix="user-icon icon-horn"/>
          <span class='desc-tip'>{{isLogin ? dataList.remind || '暂无数据' : '赶快登录注册吧～'}}</span>
          <span class="go-btn" v-if="dataList.remind" @click="goDetail(dataList.remindParam.id)">前往</span>
        </div>
      </div>

      <!-- 人员列表区域 -->
      <div class="personnel-list">
        <ul class="personnel-list-ul flex-start" v-if="isLogin && dataList && dataList.members.length > 0">
          <li v-for="(item, index) in dataList.members" :key="index">
            <div class="login-relation-box">
              <img v-if="item.relationToApplicant === '本人'" src="../../../assets/images/self.png" alt="">
              <img v-if="item.relationToApplicant === '父母'" src="../../../assets/images/parents.png" alt="">
              <img v-if="item.relationToApplicant === '子女'" src="../../../assets/images/children.png" alt="">
              <img v-if="item.relationToApplicant === '配偶'" src="../../../assets/images/wife.png" alt="">
              <img v-if="item.relationToApplicant === '其他'" src="../../../assets/images/other.png" alt="">
            </div>
            <div class="avatar-box-font">
              <span>{{item.name}}</span>
            </div>
            <div class="relation">
              <span>{{item.relationToApplicant}}</span>
            </div>
          </li>
        </ul>
        <ul class="personnel-list-ul flex-start" v-if="!isLogin || dataList && dataList.members.length===0">
          <li v-for="(item, index) in relation" :key="index">
            <div class="relation-box">
              <div class="avatar-box-default flex-sb">
                <img src="../../../assets/images/default_avatar.png" alt="">
              </div>
              <div class="personnel-list-ul-span" @click.stop="handleAdd">
                <span>去参保</span>
              </div>
              <div class="relation">
                <span>{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 客服banner区域 -->
    <div class="service-wrapper" @click.stop="handleCustomer">
      <img src="../../../assets/images/service.png" alt="">
    </div>

    <div class="user-service">
      <div class="service-content flex-sa">
        <div class="flex-sb-column" @click="handleOrder">
          <span>订单列表</span>
          <van-badge :content="dataList.orderCount + '单'" color="#1989fa" >
            <span class="user_icon_item icon-user_icon1"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span></span>
          </van-badge>
        </div>
        <div class="flex-sb-column" @click.stop="handelSearchOrder()">
          <span>订单查询</span>
          <van-badge color="#1989fa" >
            <span class="user_icon_item icon-user_icon2"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span></span>
          </van-badge>
        </div>
        <div class="flex-sb-column" @click.stop="handleClaim()">
          <span>理赔服务</span>
          <van-badge color="#1989fa" >
            <span class="user_icon_item icon-user_icon3"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span></span>
          </van-badge>
        </div>
<!--        <div class="flex-sb-column" @click="handleThing(1)">-->
<!--          <span>特药服务</span>-->
<!--          <van-badge color="#1989fa" >-->
<!--            <span class="user_icon_item icon-user_icon4"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>-->
<!--          </van-badge>-->
<!--        </div>-->
      </div>
    </div>
    <div class="user-banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="../../../assets/images/user_banner.png" alt="" @click.stop="userBannerClick">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import {agentID, busiDomainCode, claimUrl, S_OK, urlDomain} from "../../../utils/constant";
  import {homeInfo, userOrderList} from "../../../api";
  export default {
    name: "noLogin",
    props: {
      userInfo: {
        type: Object,
        default() {
          return {
            isLogin: false,
            isIdentified: false,
            phone: '',
            headImgUrl: '',
          }
        }
      }
    },
    data() {
      return {
        dataList: {
          memberCount: 0,
          orderCount: 0,
          remind: '',
          members: []
        },
        relation: ['本人', '父母', '子女', '配偶', '其他']
      }
    },
    computed: {
      isLogin() {
        return this.userInfo.isLogin
      },
      isIdentified() {
        return this.userInfo.isIdentified
      },
      phoneNo() {
        return this.userInfo.phoneNo
      },
      headImgUrl() {
        return this.userInfo.headImgUrl
      },
    },
    watch: {
      userInfo(v) {
        if (v.isLogin) {
          this.getHomeInfo()
        }
      }
    },
    methods: {
      async getHomeInfo() {
        let result = await homeInfo()
        if (result.code === S_OK) {
          this.dataList = result.result
          this.dataList.members = result.result.members || []
        }
      },
      handleAdd() {
        this.$router.push({ name: 'Insure', query: { from: 'userCenter', agentID: agentID }})
      },
      handleClick() {
        if (!this.isLogin) {
          Toast({
            message: '请先登录',
            duration: 1000
          })
          this.$router.push('/checkCode')
        }
      },
      handleLogin() {
        if(this.isLogin) {
          this.$router.push({name: 'Setting'})
        } else {
          this.$router.push({name: 'CheckCode'})
        }
      },
      async handleOrder() {
        if (this.isLogin) {
          const result = await userOrderList()
          if (result.code === S_OK) {
            const searchOrder = result.data.list
            this.$store.dispatch('setSearchOrder', searchOrder)
            this.$router.push({name: 'Order',  query: { data: encodeURI(JSON.stringify({from: 'userCenter'}))}})
          } else {
            Toast(result.message)
          }
        }
      },
      handelSearchOrder() {
        this.$router.push('/searchOrder')
      },
      handleThing() {
        Toast({
          message: '暂未开放，敬请期待'
        })
      },
      handleClaim() {
        if(this.isLogin && this.isIdentified) {
          window.location.href = claimUrl
        }else if (!this.isLogin) {
          Toast({
            message: '请先登录并实名认证后进行理赔查询',
            duration: 1500
          })
          this.$router.push('/checkCode')
        } else if (!this.isIdentified) {
          Toast({
            message: '请先实名认证后进行理赔查询',
            duration: 1500
          })
          this.$router.push({name: 'NoReal', query: { returnUrl:  urlDomain + '/userCenter'}})
        }
      },
      handleCustomer() {
        this.$router.push('/customer')
      },
      goDetail(id) {
        this.$router.push({name: 'Detail', query: {from: 'userCenter', id: id}})
      },
      userBannerClick() {
        this.$router.push({ name: 'Home', query: {from: 'userCenter', busiDomainCode: busiDomainCode, agentID: agentID }})
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../styles/variables";
  .user-center-wrapper {
    color: #808080;
    .user-top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 340px;
      font-size: 40px;
      color: #808080;
      background: url("../../../assets/images/userCenter-bg.png") no-repeat center/cover;
      .user-top-centent{
        width: 100%;
        .user-icon {
          width: 100px;
          height: 100px;
          border-radius: 100%;
          background: #eee;
          display: inline-block;
          vertical-align: middle;
          img {
            border-radius: 100%;
          }
        }
        .user-tip {
          width: 400px;
          color: white;
        }
        .user-phone {
          color: white;
          display: block;
        }
        .user-id {
          display: inline-block;
          font-size: 20px;
          height: 40px;
          background: #eee;
          border-radius: 50px;
          padding: 0 20px;
          line-height: 42px;
          margin-top: 10px;
          color: #666;
        }
      }
      .user-title{
        position: relative;
        top: 60px;
        width: 90%;
        height: 80px;
        padding: 0 20px;
        line-height: 80px;
        background: linear-gradient(to right, #0E68B8 0%,#099BD3 100%);
        border-radius: 20px 20px 0 0;
        .user-title-font{
          margin-left: 20px;
          color: #fff;
          font-size: 32px;
        }
        .user-title-icon{
          width: 30px;
          height: 30px;
          color: #fff;
          padding: 0 2px;
          border-radius: 50%;
          line-height: 30px;
          background-color: #6BC2E4;
        }
      }
    }
    .user-home {
      position: relative;
      top: -20px;
      height: 380px;
      margin: 0 auto;
      background: white;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      color: white;
      .user-home-top {
        width: 90%;
        font-size: 26px;
        height: 70px;
        margin: 0 auto;
        .user-home-top-font{
          font-size: 34px;
          color: #666;
        }
        .user-home-top-inform{
          color: #3181BC;
          .horn{
            position: relative;
            top: -4px;
            color: #3181BC;
            font-size: 28px;
          }
          .go-btn{
            color: white;
            padding: 4px 15px;
            margin-left: 10px;
            background-color: #3181BC;
            border-radius: 15px;
          }
          span{
            margin-left: 10px;
          }
        }
      }
      .user-home-content {
        margin: 40px auto;
        text-align: center;
        .people-content {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          .people-item {
            margin-right: 50px;
            width: 140px;
            img {
              width: 100px;
              height: 100px;
            }
            span {
              font-size: 26px;
            }
          }
        }

        .add-square {
          font-size: 100px;
        }
        .add-people {
          span {
            font-size: 28px;
          }
        }
      }
      .personnel-list{
        width: 100%;
        height: 300px;
        .personnel-list-ul {
          overflow-x: auto;
          overflow-y: hidden;
          padding: 10px 0;
          li{
            &:first-child {
              margin-left: 20px;
            }
            &:last-child {
              margin-right: 20px !important;
            }
            position: relative;
            display: inline-block;
            width: 200px;
            height: 300px;
            margin-right: 20px;

            box-shadow:1px 1px 5px 1px rgba(0,0,0,0.2);
            .relation-box {
              width: 200px;
            }
            .login-relation-box {
              width: 200px;
              img {
                display: block;
                width: 160px;
                margin: 60px auto;
              }
            }
            .avatar-box-default{
              width: 120px;
              height: 110px;
              border-radius: 50%;
              background-color: #E6E6E6;
              margin: 60px auto;
            }
            .avatar-box{
              height: 100%;
              padding: 20px 0 5px 0;
              img{
                display: block;
                margin: 0 auto;
              }
            }
            .avatar-box-font{
              position: absolute;
              bottom: 0;
              width: 100%;
              height: 40px;
              line-height: 40px;
              text-align: center;
              color: black;
              background-color: rgba(255,255,255,0.8);
              z-index: 99;
            }
            .personnel-list-ul-span{
              width: 160px;
              margin: 0 auto;
              height: 40px;
              line-height: 40px;
              padding: 0 10px;
              background-color: #89BF50;
              border-radius: 20px;
              text-align: center;
            }
            .relation{
              position: absolute;
              top: 0;
              width: 80px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              color: #FFFFFF;
              background-color: #3181BC;
              border-radius: 0 0 30px 0;
              z-index: 99;
            }
          }
        }
      }
    }
    .service-wrapper{
      width: 100%;
      padding: 0 20px;
    }

    .user-icon {
      display: inline-block;
      font-size: 40px;
      vertical-align: middle;
    }
    .user-people-icon {
      font-size: 100px;
    }
    .user-desc {
      display: inline-block;
      vertical-align: middle;
      font-size: 28px;
      margin-left: 10px;
      .people-num {
        margin-left: 6px;
      }
    }
    .user-num {
      display: inline-block;
      margin-left: 10px;
      vertical-align: middle;
    }

    .user-service {
      .service-content {
        margin-top: 40px;
        .user_icon_item {
          span {
            font-size: 80px;
          }
        }
        .service-num {
          height: 50px;
          text-align: center;
        }
        span {
          font-size: 28px;
          color: #666;
          margin-bottom: 30px;
        }
      }
    }

    .user-banner {
      margin-top: 40px;
      height: 150px;
      // background: #00CCC4;
    }

    .user-header {
      font-size: 40px;
    }

    .content-item {
      height: 120px;
    }

    .service-top-right {
      flex: 1;
      text-align: right;
    }

    .user-arrow {
      color: whitesmoke;
      display: inline-block;
      vertical-align: middle;
    }
    .user-more {
      display: inline-block;
      vertical-align: middle;
      margin-right: 4px;
      font-size: 26px;
    }
    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
    }
    .desc-tip {
      display: inline-block;
      vertical-align: middle;
    }
    .icon-user-box {
      span {
        vertical-align: middle;
      }
    }
  }
</style>

<style lang="scss">
  @import "../../../static/iconfront/style.css";
  .user-center-wrapper {
    .van-badge--fixed {
      top: 20px;
      right: -6px;
    }
  }
</style>

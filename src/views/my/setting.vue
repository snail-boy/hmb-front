<template>
  <router-layout>
    <div class="setting-wrapper">
      <van-cell title="账户信息" is-link to="/userCenter/setting/account" />
      <van-cell-group>
        <van-cell title="微信绑定" label="解除微信关联帐号绑定" is-link value="去解绑" @click="handleLogOut" />
        <van-cell title="用户认证" label="若需实名认证或变更实名信息，请点击" value="实名认证" is-link @click="handleAuth" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="意见反馈" is-link @click="handleOpinion" />
        <van-cell title="隐私相关协议" is-link @click="handlePrivacy" />
        <van-cell title="关于我们" is-link @click="handleAbout" />
      </van-cell-group>
    </div>
  </router-layout>
</template>

<script>
  import {S_OK, urlDomain} from "../../utils/constant";
  import { Dialog } from 'vant'
  import {userLogout} from "../../api";
  export default {
    name: "Setting",
    created() {

    },
    methods: {
      handleOpinion() {
        this.$router.push({name: 'Opinion'})
      },
      handleAuth() {
        this.$router.push({name: 'NoReal', query: { returnUrl:  urlDomain + '/userCenter'}})
      },
      handleAbout() {
        this.$router.push({name: 'About'})
      },
      handlePrivacy() {
        this.$router.push({name: 'Privacy'})
      },
      handleLogOut() {
        Dialog.confirm({
          title: '尊敬的用户 您好！',
          message: '<div style="text-align: justify; line-height: 30px;">如果你想解除帐号绑定，请点击确认</div>',
          theme: 'round-button',
          cancelButtonColor: this.$globalColor.secondColor,
          confirmButtonColor: this.$globalColor.baseColor
        }).then(async () => {
          let result = await userLogout()
          if (result.code === S_OK) {
            this.$router.push({name: 'UserCenter', query: {from: 'loginOut'}})
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .setting-wrapper {
    min-height: 100vh;
    background: #f7f7f7;
    .van-cell-group {
      margin: 10px auto;
    }
  }
</style>

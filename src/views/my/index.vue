<template>
  <router-layout>
    <login :userInfo="userInfo"></login>
  </router-layout>
</template>

<script>
  import Login from "./components/login";
  import {userInfo} from "../../api";
  import {appId, S_OK, urlDomain} from "../../utils/constant";
  import {getQueryObject2} from "../../utils";

  export default {
    name: "index",
    components: {Login},
    data() {
      return {
        code: '',
        from: '',
        userInfo: {}
      }
    },
    created() {
      // 清空轨迹记录
      sessionStorage.clear()
    },
    mounted() {
      this.code = getQueryObject2().code
      this.from = getQueryObject2().from
      this.init()
    },

    activated() {
      this.code = getQueryObject2().code
      this.from = getQueryObject2().from
      if (this.from === 'checkCode' || this.from === 'loginOut') {
       this.init()
      }
    },

    methods: {
      init() {
        if(!this.code && this.from !== 'checkCode') { // code 没有和from不从认证页面来，都是首次进入userCenter调微信
          this.getCode()
        }else {
          this.getUserInfo()
        }
      },
      async getCode() {
          const urlEn = `${urlDomain}/userCenter`
          const urlDe = encodeURIComponent(urlEn)
          const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${urlDe}&response_type=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect`
          window.location.replace(url)
      },
      async getUserInfo() {
        let params = {}
        if(!this.code) {
          params = {
            source: 'qdeb'
          }
        }else {
          params = {
            code: this.code,
            source: 'qdeb'
          }
        }
        let result = await userInfo(params)
        if (result.code === S_OK) {
          this.userInfo = result.result
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>

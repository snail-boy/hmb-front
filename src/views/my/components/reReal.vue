<template>
  <router-layout>
    <div class="real-wrapper">
      <div class="content">
        <div class="top">
          <span class="title">实名用户</span>
          <span class="userInfo"><span class="name">{{form.name}}</span><span class="id">{{form.certNo}}</span></span>
          <div class="desc">已存在绑定用户</div>
        </div>
        <div class="middle">
          若您是<span class="name">{{form.name}}</span>本人，可通过以下方式继续实名
        </div>
        <div class="real-btn" @click="handleClick">
          <div class="btn-top">将身份证重新绑定</div>
          <div class="btn-middle">绑定至当前帐号下</div>
        </div>
      </div>
      <customer />
    </div>
  </router-layout>
</template>

<script>
  import Customer from "../../../components/customer";
  import {confirmInfo, reConfirm} from "../../../api";
  import {S_OK} from "../../../utils/constant";
  export default {
    name: 'ReReal',
    components: { Customer },
    data() {
      return {
        form: {
          name: '',
          certNo: ''
        },
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      async getInfo() {
        let result = await confirmInfo()
        if(result.code === S_OK) {
          this.form = result.result
        }
      },
      async handleClick() {
        let result = await reConfirm()
        if(result.code === S_OK) {
          this.$router.push({name: 'YesReal'})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../styles/variables";
  .real-wrapper {
    position: absolute;
    background: #E9F6FF url("../../../assets/images/real-bg.png") no-repeat;
    background-size: contain;
    width: 100%;
    min-height: 100vh;
    padding: 340px 20px 40px;
    .content {
      text-align: center;
      color: white;
      font-size: 30px;
      .top {
        line-height: 40px;
        .title {
          margin-right: 10px;
          font-weight: bolder;
          font-size: 34px;
        }
        .userInfo {
          display: inline-block;
          margin-right: 10px;
          .name {
            margin-right: 14px;
          }
        }
      }
      .middle {
        margin: 100px auto 90px;
        color: #808080;
      }
      .real-btn {
        width: 100%;
        height: 200px;
        border: 1px solid #3DB275;
        color: #3DB275;
        border-radius: 10px;
        .btn-top {
          font-size: 40px;
          margin-top: 60px;
        }
        .btn-middle {
          font-size: 30px;
          margin-top: 10px;
          color: #9ed8ba;
        }
      }
    }
  }
</style>

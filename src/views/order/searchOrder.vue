<template>
  <router-layout>
    <div class="search-order-wrapper">
      <van-form ref="ruleForm" class="form-box" :submit-on-enter="false" @submit.native.prevent="onSubmit">
        <div class="info-content">
          <div class="info-item">
            <div class="flex-start">
              <span class="dot"></span>
              <div>本人信息<span style="color: red"></span></div>
            </div>
            <van-field
                    :rules="[{ required: true, validator: validatorIsName, message: '请输入正确的姓名' }]"
                    label="姓名"
                    name="name"
                    clearable
                    autocomplete="off"
                    v-model.trim="form.name"
                    placeholder="请填写缴费人或参保人姓名"
            />
<!--            <van-field label="查询方式" name="radio">-->
<!--              <template #input>-->
<!--                <van-radio-group v-model="searchType" direction="horizontal" :checked-color="$globalColor.baseColor" @change="searchTypeChange">-->
<!--                  <van-radio name="2">手机号</van-radio>-->
<!--                  <van-radio name="1">证件号码</van-radio>-->
<!--                </van-radio-group>-->
<!--              </template>-->
<!--            </van-field>-->
<!--            <div v-if="searchType === '1'">-->
            <div>
              <van-field
                      :rules="[{ required: true }]"
                      readonly
                      clickable
                      label="证件类型"
                      name="certType"
                      :value="certiType"
                      is-link
                      placeholder="选择缴费人或参保人证件类型"
                      @click="idTypeShow = true"
              />
              <van-field
                      v-if="form.certType === '11'"
                      :rules="[{ required: true,  validator: $taiWan, message: '请输入正确的港澳台居民居住证证件号码' }]"
                      label="证件号码"
                      name="certNo"
                      clearable
                      autocomplete="off"
                      v-model.trim="form.certNo"
              />
              <van-field
                      v-if="form.certType!=='1' && form.certType!=='11'"
                      :rules="[{ required: true, validator: otherCertiCodeFun, message: '请输入正确的证件号码' }]"
                      label="证件号码"
                      name="certNo"
                      clearable
                      autocomplete="off"
                      v-model.trim="form.certNo"
              />
              <van-field
                      v-if="form.certType==='1'"
                      :rules="[{ required: true, validator: validatorIDFun, message: '请输入正确的身份证号码' }]"
                      label="证件号码"
                      name="certNo"
                      clearable
                      autocomplete="off"
                      v-model.trim="form.certNo"
                      placeholder="输入18或15位证件号码"
              />
            </div>
<!--            <van-field-->
<!--                    v-if="searchType === '2'"-->
<!--                    :rules="[{ required: searchType === '2' ? true : false, validator: validatorIphone, message: '请填写正确的缴费人手机号码' }]"-->
<!--                    label="手机号码"-->
<!--                    name="phoneNo"-->
<!--                    clearable-->
<!--                    type="tel"-->
<!--                    autocomplete="off"-->
<!--                    v-model.trim="form.phoneNo"-->
<!--            />-->
            <Verify ref="verifyBox" class="verify-box" :type="3" @success="verifyFun('success')" @error="verifyFun('error')" :showButton="false" :barSize="{width:'100%',height:'50px'}"></Verify>
          </div>
        </div>
        <van-button class="search-now-btn" native-type="submit" type="info">立即查询</van-button>
      </van-form>
      <van-popup v-model="idTypeShow" round position="bottom">
        <van-picker title="证件类型" :columns="idOpt" @cancel="idTypeShow = false" @confirm="onConfirm"
                    show-toolbar/>
      </van-popup>
    </div>
  </router-layout>
</template>

<script>
  import { searchOrder } from '../../api'
  import { otherCertiCode, unStrictvalidatorID, deepClone, isName} from '../../utils'
  import {Toast} from 'vant'
  import { idOpt, S_OK } from '../../utils/constant'
  import Verify from 'vue2-verify'
  export default {
    name: 'SearchOrder',
    components: { Verify },
    data() {
      return {
        form: {
          // name: '王可',
          // certNo: '41142519910416063X',
          phoneNo: '',
          name: '',
          certNo: '',
          certType: '1'
        },
        isSmsCode: false,
        idOpt: idOpt,
        idTypeShow: false,
        certiType: '', // 汉字证件类型
        searchTypeShow: false, // 查询类型
        searchTypeHan: '居民身份证（户口簿）',
        searchType: '2',
        searchTypeOpt: [{
          text: '居民身份证（户口簿）',
          value: '1'
        }, {
          text: '缴费人手机号',
          value: '2'
        }]
      }
    },
    created() {
      this.columns = idOpt.map(value => value.name)
      idOpt.filter(value => value.value === '1' ? this.certiType = value.text : '')
      sessionStorage.setItem('/searchOrder', -2)
    },
    destroyed() {
      clearInterval(this.timer)
    },
    methods: {
      validatorIphone(val) {
        if(val) {
          return /^1[2|3|4|5|6|7|8|9][0-9]{9}$/.test(val)
        } else {
          return true
        }
      },
      validatorIDFun(val) {
        if (val) {
          return unStrictvalidatorID(val)
        }else {
          return true
        }
      },
      otherCertiCodeFun(val) {
        if (val) {
          return otherCertiCode(val)
        }else {
          return true
        }
      },
      validatorIsName(val) {
        return isName(val)
      },
      onConfirm(value) {
        this.form.certType = value.value
        this.certiType = value.text
        this.form.certNo = ''
        this.$refs.ruleForm.resetValidation('certNo')
        this.idTypeShow = false
      },
      async onSubmit() {
        // if(!this.form.phoneNo && !this.form.certNo) {
        //   Toast({message: '请填写身份证或者手机号其中一个查询', duration: 5000})
        // }
        this.$refs.ruleForm.validate().then(async res => {
          if (res && res.length > 0) {
            this.reset()
            return
          } else {
            if(!this.isSmsCode) {
              this.reset()
              Toast('请滑动验证')
            }else {
              let params = deepClone(this.form)
              params = { ...params, from: 'searchOrder' }
              const result = await searchOrder(params)
              if (result.code === S_OK) {
                const searchOrder = result.data.list
                this.$store.dispatch('setSearchOrder', searchOrder)
                this.$router.push({name: 'Order', query: { data: encodeURI(JSON.stringify(params)) }})
              } else {
                Toast(result.message)
                this.reset()
              }
            }
          }
        }, error => {
          if (error && error.length > 0) {
            this.reset()
            return
          }
        })
      },
      verifyFun(text) {
        this.isSmsCode = text === 'success';
      },
      reset() {
        this.$refs.verifyBox.refresh()
        this.isSmsCode = false
      },
      searchTypeChange() {
        if (this.searchType === '1') {
          this.form.certType = '1'
          this.form.certNo = ''
          this.form.phoneNo = ''
        } else {
          this.form.certType = ''
          this.form.certNo = ''
          this.form.phoneNo = ''
        }
        this.reset()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  .search-order-wrapper {
    color: #666;
    position: absolute;
    background: $search-bg_color url("../../assets/images/searchOrder.png") no-repeat;
    background-size: contain;
    width: 100%;
    padding: 320px 2px 220px;
    min-height: 100vh;
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
    }
  }
</style>
<style lang="scss">
  @import "../../styles/variables";
  .search-order-wrapper {
    .form-box {
      width: 100%;
      border-radius: 20px;
      margin:0 auto;
      background: white;
      overflow: auto;
      box-shadow: 20px 20px 10px rgba(18, 169, 232, 0.02);
    }
    .verify-box {
      width: 100%;
      margin-top: 20px;
      pointer-events: auto;
    }
    .search-now-btn {
      display: block;
      width: 80%;
      height: 100px;
      font-size: 32px;
      line-height: 100px;
      background-color: $base-color;
      text-align: center;
      border-radius: 10px;
      border: none;
      color: white;
      margin: 0 auto 40px;
    }
  }
</style>
<style>
  .search-order-wrapper .van-cell {
    font-size: 24px;
  }
  .search-order-wrapper .icon-right:before {
    z-index: 1 !important;
  }
</style>

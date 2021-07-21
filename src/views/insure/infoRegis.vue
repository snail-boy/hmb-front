<template>
  <router-layout>
    <div class="info-register-wrapper">
      <div class="content">
        <div class="title-text">
          <p class="title-bold">
            本人承诺：
          </p>
          申请参保的被保险人为广东省青岛市行政区域内省、区分级管理或单位单独管理的医疗保障人员。如参保人不符合上述参保条件，保险公司对参保人不承担任何保险责任。参保人应承担由此造成的后果。<br/>
          <p class="title-bold">
            理赔须知：
          </p>
          通过此界面登记参保的人员，需通过零星报销的方式理赔，理赔时需提供所在单位开具证明和单位报销相应医疗费用的资料，如不能提供，则不予理赔。
        </div>
        <van-form ref="companyForm" class="form-box" :submit-on-enter="false" @submit.native.prevent="onSubmit">
          <div class="form-content">
            <van-field
                    id="nameId"
                    :rules="[{ required: true }]"
                    label="姓名"
                    name="name"
                    :readonly="nameReadonly"
                    clearable
                    auto
                    v-model.trim="form.name"
                    @focus="nameFocus"
                    autocomplete="off"
                    placeholder="请填写参保人名称"
            />
            <van-field
                    :rules="[{ required: true }]"
                    readonly
                    clickable
                    label="证件类型"
                    name="certiType"
                    :value="certiTypeHan"
                    is-link
                    autocomplete="off"
                    placeholder="选择本人证件类型"
                    @click="idTypeShow = true"
            />
            <van-field
                    v-if="form.certiType==='1'"
                    :rules="[{ required: true, validator: validatorIDFun, message: '请输入正确的身份证号码' }]"
                    label="证件号码"
                    name="certiCode"
                    clearable
                    autocomplete="off"
                    v-model.trim="form.certiCode"
                    placeholder="请填写证件号码"
            />
            <van-field
                    v-if="form.certiType!=='1'"
                    :rules="[{ required: true, validator: otherCertiCodeFun, message: '请输入正确的证件号码' }]"
                    label="证件号码"
                    name="certiCode"
                    clearable
                    autocomplete="off"
                    v-model.trim="form.certiCode"
                    placeholder="请填写证件号码"
            />
            <van-field
                    :rules="[{ required: true, validator: $validatorIphone, message: '请填写正确的手机号' }]"
                    label="手机号码"
                    name="phoneNo"
                    type="tel"
                    clearable
                    v-model.trim="form.phoneNo"
                    autocomplete="off"
                    placeholder="请填写手机号码"
            />
            <van-field
                    :rules="[{ required: true }]"
                    v-model.trim="form.smsCode"
                    type="digit"
                    center
                    clearable
                    label="验证码"
                    name="smsCode"
                    autocomplete="off"
                    maxlength="6"
                    placeholder="请输入短信验证码"
            >
              <template #button>
                <van-button class="code-btn" native-type="button" size="small" type="primary" :disabled="disabled"
                            @click.stop.prevent="getCode">{{checkCodeText}}
                </van-button>
              </template>
            </van-field>
            <van-field
                    :rules="[{ required: true }]"
                    label="医疗保障所在单位"
                    name="medicareCompany"
                    clearable
                    v-model.trim="form.medicareCompany"
                    autocomplete="off"
                    placeholder="请填写医疗保障所在单位"
            />
            <van-field
                    :rules="[{ required: true }]"
                    label="参保身份"
                    readonly
                    name="identity"
                    clearable
                    v-model.trim="identityHan"
                    autocomplete="off"
                    placeholder="请在下方勾选"
            />
            <van-radio-group v-model="form.identity" :checked-color="$globalColor.baseColor">
              <van-cell v-for="(item, index) in identityOpt" :key="index">
                <van-radio :name="item.value" @click="identityClick(item)">{{item.text}} </van-radio>
              </van-cell>
            </van-radio-group>
            <van-field
                    v-if="areaBoxShow"
                    :rules="[{ required: true }]"
                    label="医保所属区域"
                    is-link
                    readonly
                    name="identity"
                    clearable
                    :value="medicareAreaHan"
                    autocomplete="off"
                    placeholder="请填写医保所属区域"
                    @click="areaShow = true"
            />
            <van-field
                    label="备注"
                    :rows="2"
                    name="remark"
                    clearable
                    autosize
                    maxlength="200"
                    show-word-limit
                    v-model.trim="form.remark"
                    autocomplete="off"
                    placeholder="选填"
            />
          </div>
          <div class="read-confirm" id="readConfirm">
            <div class="checkbox-box">
              <van-checkbox class="checkbox" v-model="checked" shape="square">
                <div class="text">
                  <span>我已知悉：本产品的被保险人仅限青岛市社会医疗保险参保人员及本市其他医疗保障的人员参保，已经阅读并同意</span>
                  <span class="clause" @click.stop="readFun">《用户协议》</span>
                </div>
              </van-checkbox>
            </div>
          </div>
          <van-button class="now-btn" native-type="submit" type="info">提交</van-button>
        </van-form>
      </div>
      <van-action-sheet title="您需要阅读以下内容" v-model="clauseDialog" :close-on-popstate="true">
        <register-clause :key="new Date().getTime()" @readFinish="readFinish"/>
      </van-action-sheet>
      <van-dialog v-model="dialogShow" title="建议" confirm-button-text="已阅读，确认进入登记页面" :confirm-button-color="$globalColor.baseColor" @closed="onClosed" @confirm="onDialogConfirm">
        <div class="dialog-text">
          请首先进入琴岛e保参保界面进行身份校验及参保，若身份无法通过校验的请在此界面登记
        </div>
      </van-dialog>
    </div>
    <van-popup v-model="idTypeShow" round position="bottom">
      <van-picker title="证件类型" :columns="idOpt" @cancel="idTypeShow = false" @confirm="onConfirm"
                  show-toolbar/>
    </van-popup>
    <van-popup v-model="areaShow" round position="bottom">
      <van-picker title="选择地区" :columns="areaOpt" @cancel="areaShow = false" @confirm="onidentityConfirm"
                  show-toolbar/>
    </van-popup>
  </router-layout>
</template>

<script>
import {authByCode, bookingAdd, getQueryToken} from '../../api'
import {appId, areaOpt, identityOpt, idOpt, S_OK, urlDomain} from '../../utils/constant'
import {countTime, getQueryObject, otherCertiCode, unStrictvalidatorID} from '../../utils'
import RegisterClause from "./registerClause";
import {Toast, Dialog} from "vant";
import Cookies from 'js-cookie'

export default {
  name: 'Company',
  components: {RegisterClause},
  data() {
    return {
      form: {
        name: '',
        certiType: '1',
        certiCode: '',
        phoneNo: '',
        medicareCompany: '',
        identity: '',
        remark: '',
        code: '',
        smsCode: '',
        token: '',
        medicareArea: ''
      },
      idTypeShow: false,
      certiTypeHan: '居民身份证（户口簿）',
      idOpt: idOpt,
      areaOpt: areaOpt,
      dialogShow: false,
      checked: false,
      clauseDialog: false,
      checkCodeText: '获取验证码',
      disabled: false,
      countDownTime: 60,
      timer: null,
      nameReadonly: true,
      identityOpt: identityOpt,
      identityHan: '',
      medicareAreaHan: '',
      areaShow: false,
      areaBoxShow: false
    }
  },
  async mounted() {
    if (getQueryObject().code) {
      this.form.code = getQueryObject().code
      await authByCode({code: this.form.code})
    } else {
      this.getCodeOpenId()
    }
    idOpt.filter(value => value.value === '1' ? this.certiType = value.text : '')
    areaOpt.filter(value => value.value === '1' ? this.certiTypeHan = value.text : '')
  },
  methods: {
    validatorIDFun(val) {
      return unStrictvalidatorID(val)
    },
    otherCertiCodeFun(val) {
      return otherCertiCode(val)
    },
    identityClick(item) {
      this.areaBoxShow = item.value === '3';
      this.identityHan = item.text
      this.form.identity = item.value
    },
    async getCodeOpenId() {
      if (!!Cookies.get('HZSSKLoginSeesion') && Cookies.get('HZSSKLoginSeesion') !== undefined && Cookies.get('HZSSKLoginSeesion') !== 'undefined') {
        // this.openId = Cookies.get('openId')
      }else {
        const urlEn = `${urlDomain}/#/register`
        const urlDe = encodeURIComponent(urlEn)
        const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${urlDe}&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect`
        window.location.replace(url)
      }
    },
    async getCode() {
      const params = {
        phoneNo: this.form.phoneNo,
        bizType: 'valid'
      }
      this.$refs.companyForm.validate('phoneNo').then(async res => {
        this.disabled = true
        const result = await getQueryToken(params)
        if (result.code === S_OK) {
          Toast({
            message: '发送成功',
            duration: 1000
          })
          clearInterval(this.timer)
          this.countDownTime = 60
          this.timer = setInterval(() => {
            this.countDownTime = this.countDownTime - 1
            this.checkCodeText = countTime(this.countDownTime).seconds + 's'
            if (this.countDownTime <= 0) {
              clearInterval(this.timer)
              this.checkCodeText = '获取验证码'
              this.disabled = false
            }
          }, 1000)
          this.form.token = result.data
        } else {
          this.disabled = false
          Toast({
            message: result.message,
            duration: 1000
          })
        }
      })
    },
    onConfirm(value) {
      this.form.certiType = value.value
      this.certiTypeHan = value.text
      this.form.certiCode = ''
      this.$refs.companyForm.resetValidation('certiCode')
      this.idTypeShow = false
    },
    onidentityConfirm(value) {
      this.form.medicareArea = value.value
      this.medicareAreaHan = value.text
      this.areaShow = false
    },
    async onSubmit() {
      this.$refs.companyForm.validate().then(async res => {
        if (res && res.length > 0) {
          return
        } else {
          if (!this.checked) {
            document.getElementById('readConfirm').scrollIntoView()
            this.$toast('请先阅读用户协议并确定')
            return
          } else {
            const result = await bookingAdd(this.form)
            if (result.code === S_OK) {
              this.submitDialog()
              this.refresh()
            }else if(result.code === '00010') {
              Dialog.alert({
                title: '尊敬的用户 您好！',
                message: '<div style="text-align: justify; line-height: 30px;">请勿重复提交！</div>',
                theme: 'round-button',
                confirmButtonColor: this.$globalColor.baseColor
              }).then(() => {
                // on close
              })
            }else {
              Toast(result.message)
            }
          }
        }
      })
    },
    submitDialog() {
      Dialog.alert({
        title: '尊敬的用户 您好！',
        message: '<div style="text-align: justify; line-height: 30px;">您已成功申请为拟参保人员！\n' +
          '承保机构将在24小时内对您的参保申请进行评定，通过评定的，您可从参保入口办理正式参保缴费手续。</div>',
        theme: 'round-button',
        confirmButtonColor: this.$globalColor.baseColor
      }).then(() => {
        // on close
      })
    },
    refresh() {
      this.checked = false
      this.clauseDialog = false
      this.form = {
        name: '',
        certiType: '1',
        certiCode: '',
        phoneNo: '',
        medicareCompany: '',
        identity: '',
        remark: '',
        code: '',
        smsCode: '',
        token: '',
        medicareArea: ''
      }
      this.certiTypeHan = '居民身份证（户口簿）'
      this.medicareAreaHan = ''
      this.identityHan = ''
      this.areaBoxShow = false
    },
    onDialogConfirm() {
      this.dialogShow = false
    },
    onClosed() {
      this.dialogShow = false
    },
    readFun() {
      this.clauseDialog = true
    },
    readFinish() {
      this.checked = true
      this.clauseDialog = false
    },
    nameFocus() {
      if(!sessionStorage.getItem('setRegisterIsShow')) {
        this.nameReadonly = false
        this.dialogShow = true
        sessionStorage.setItem('setRegisterIsShow', 1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  .info-register-wrapper {
    position: absolute;
    background: $bg-color url("../../assets/images/infoRegister.png") no-repeat;
    background-size: contain;
    width: 100%;
    padding-top: 240px;
    padding-bottom: 40px;
    .content {
      width: 94%;
      border-radius: 20px;
      margin:0 auto;
      background: white;
      overflow: auto;
      box-shadow: 20px 20px 10px rgba(18, 155, 217, 0.1);
      .form-content {
        padding: 0 30px 0;
      }
      .title-text {
        color: #666;
        font-size: 30px;
        border-bottom: 1px dotted #eee;
        text-align: justify;
        line-height: 50px;
        padding: 20px 30px 0;
        .title-bold {
          font-weight: bolder;
          color: #222;
        }
        .text-result {
          margin-top: 16px;
        }
        .title-name {
          font-size: 40px;
        }
      }
      .form-box {
        .van-field {
          font-size: 26px;
          margin: 10px auto;
          padding: 20px 0;
        }
      }
      .now-btn {
        display: block;
        width: 600px;
        height: 80px;
        border-width: 6px;
        font-size: 28px;
        line-height: 70px;
        background-color: $base-color;
        border: none;
        text-align: center;
        margin: 50px auto 20px;
        color: white;
      }
    }
    .code-btn {
      background: $base-color;
      border: none;
      width: 180px;
    }
    .dialog-text {
      padding: 20px 30px;
      text-align: justify;
      line-height: 50px;
      font-size: 28px;
      color: #666;
    }
    .read-confirm {
      width: 100%;
      background: white;
      border-top: 1px solid #eee;
      margin: 40px auto 20px;
      .checkbox-box {
        line-height: 160px;
        background: #FFECD2;
        .checkbox {
          margin-left: 40px;
          padding-top: 4px;
          padding-bottom: 4px;
          .text {
            color: #666;
            flex: 1;
            text-align: justify;
            margin-right: 16px;
          }

          .clause {
            color: rgb(46, 132, 202);
          }
        }
      }
    }
    /*.identity-box {*/
    /*  text-overflow: ellipsis;*/
    /*  overflow: hidden;*/
    /*  white-space: nowrap;*/
    /*  width: 90%;*/
    /*}*/
  }
</style>
<style lang="scss">
  .info-register-wrapper {
    .van-field__label {
      width: 120px;
    }
    .van-radio__label {
      color: #646566
    }
    .van-action-sheet {
      max-height: 100%;
    }
    .van-popup--bottom.van-popup--round {
      border-radius: 0;
    }
    .van-cell {
      font-size: 24px;
    }
  }
</style>

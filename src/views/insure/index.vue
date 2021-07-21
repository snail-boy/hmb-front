<template>
  <router-layout>
    <div class="insure-wrapper">
      <div class="insure-top">
        <p>填写参保信息</p>
      </div>
      <van-form ref="ruleForm" class="form-box" :submit-on-enter="false" @submit.native.prevent="onSubmit">
        <div class="info-content">
          <div class="info-item">
            <div class="flex-start">
              <van-tag class="item-no" :color="$globalColor.baseColor">1</van-tag>
              <div>本人信息（缴费人）</div>
            </div>
            <van-field
                    :rules="[{ required: true, validator: validatorIsName, message: '请输入正确的姓名' }]"
                    label="姓名"
                    name="username"
                    clearable
                    autocomplete="off"
                    v-model="form.username"
                    @input="handleInput"
            />
            <van-field
                    :rules="[{ required: true }]"
                    readonly
                    clickable
                    label="证件类型"
                    name="certiType"
                    :value="certiType"
                    is-link
                    placeholder="选择本人证件类型"
                    @click="idTypeShow = true"
            />
            <van-popup v-model="idTypeShow" round position="bottom">
              <van-picker title="证件类型" :columns="idOpt" @cancel="idTypeShow = false" @confirm="onConfirm"
                          show-toolbar/>
            </van-popup>
            <van-field
                    v-if="form.certiType==='11'"
                    :rules="[{ required: true,  validator: $taiWan, message: '请输入正确的港澳台居民居住证证件号码' }]"
                    label="证件号码"
                    name="certiCode"
                    clearable
                    autocomplete="off"
                    v-model.trim="form.certiCode"
                    @input="handleInput"
            />
            <van-field
                    v-if="form.certiType!=='1' && form.certiType !=='11'"
                    :rules="[{ required: true,  validator: otherCertiCodeFun, message: '请输入本人正确的证件号码' }]"
                    label="证件号码"
                    name="certiCode"
                    clearable
                    autocomplete="off"
                    v-model.trim="form.certiCode"
                    @input="handleInput"
            />
            <van-field
                    v-if="form.certiType==='1'"
                    :rules="[{ required: true, validator: validatorIDFun, message: '请输入本人正确的身份证号码' }]"
                    label="证件号码"
                    name="certiCode"
                    clearable
                    autocomplete="off"
                    v-model.trim="form.certiCode"
                    @input="handleInput"
            />
            <van-field
                    v-if="isShowBirGen"
                    :rules="[{ required: true }]"
                    readonly
                    clickable
                    label="出生日期"
                    name="birthday"
                    :value="form.birthday"
                    is-link
                    autocomplete="off"
                    placeholder="选择出生日期"
                    @click="birthdayShow = true"
            />
            <van-field v-if="isShowBirGen" :rules="[{ required: true, message: '请选择性别' }]" name="radio" label="性别">
              <template #input>
                <van-radio-group v-model="form.gender" name="gender" @change="handleInput" direction="horizontal" :checked-color="$globalColor.baseColor">
                  <van-radio name="1">男</van-radio>
                  <van-radio name="2">女</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
                    :rules="[{ required: true, validator: $validatorIphone, message: '请填写本人正确的手机号码' }]"
                    label="手机号码"
                    name="phoneNo"
                    clearable
                    type="tel"
                    autocomplete="off"
                    v-model.trim="form.phoneNo"
            />
            <van-field
                    :rules="[{ required: true }]"
                    v-model.trim="form.smsCode"
                    type="digit"
                    center
                    clearable
                    label="短信验证码"
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
            <div class="info-item info-item-two">
              <div class="flex-start">
                <van-tag class="item-no" :color="$globalColor.baseColor">2</van-tag>
                <div>为谁参保（被保人）</div>
              </div>
              <div class="insured-box" v-for="(item1, i) in insured" :key="i">
                <div class="insured-name flex-sb">
                  <p>被保人{{i+1}}</p>
                  <van-icon v-if="i>0" name="cross" color="#666" @click="insuredClose"/>
                </div>
                <div class="insured-item-box">
                  <div class="relate-option">
                    <van-field
                            v-model="item1.relationWtHolder"
                            :rules="[{ required: true, message: '请选择被保人与缴费人关系' }]"
                            clearable
                    >
                      <template #button>
                        <div v-for="(item, index) in item1.relationWtHolderOpt" :key="index"
                             @click="handelCheckInsure(item1, item, i, index)"
                             :class="['insured-item', {'insured-active' : item.active === index}]">{{item.label}}
                        </div>
                      </template>
                    </van-field>
                  </div>
                </div>
                <div class="insured-input">
                  <div class="flex-start">
                    <van-field
                            v-model.trim="item1.name"
                            label="被保人姓名"
                            :rules="[{ required: true, validator: validatorIsName, message: '请输入正确的姓名' }]"
                            clearable
                            autocomplete="off"
                            :readonly="item1.relationWtHolder === '1'"
                    />
                  </div>
                  <div class="flex-start">
                    <van-field
                            :rules="[{ required: true}]"
                            readonly
                            label="证件类型"
                            :value="item1.certiTypeHan"
                            is-link
                            placeholder="选择证件类型"
                            @click="selectInsureSelect(item1)"

                    />
                  </div>
                  <div class="flex-start">
                    <van-field
                            v-if="item1.certiType === '1'"
                            label="证件号码"
                            v-model.trim="item1.certiCode"
                            :name="item1.certiCode"
                            :rules="[{ required: true, validator: validatorIDFun, message: '请输入正确的身份证号码' }]"
                            clearable
                            autocomplete="off"
                            :readonly="item1.relationWtHolder === '1'"
                            @input="handleInput(item1)"
                    />
                    <van-field
                            v-if="item1.certiType !== '1'"
                            label="证件号码"
                            v-model.trim="item1.certiCode"
                            :name="item1.certiCode"
                            :rules="[{ required: true, validator: otherCertiCodeFun, message: '请输入本人正确的证件号码' }]"
                            clearable
                            autocomplete="off"
                            :readonly="item1.relationWtHolder === '1'"
                            @input="handleInput(item1)"
                    />
                  </div>
                  <div class="flex-start" v-if="item1.isShowGender">
                    <van-field
                            :rules="[{ required: true }]"
                            label="出生日期"
                            clickable
                            readonly
                            :value="item1.birthday"
                            is-link
                            placeholder="选择出生日期"
                            @click="onInsureBirthdayConfirm(item1)"
                    />
                  </div>
                  <div class="flex-start" v-if="item1.isShowGender">
                    <van-field label="性别" :rules="[{ required: true, message: '请选择性别' }]" name="radio">
                      <template #input>
                        <van-radio-group v-model="item1.gender" :disabled="item1.relationWtHolder === '1'" direction="horizontal" :checked-color="$globalColor.baseColor">
                          <van-radio name="1">男</van-radio>
                          <van-radio name="2">女</van-radio>
                        </van-radio-group>
                      </template>
                    </van-field>
                  </div>
                </div>
              </div>
              <van-button class="add-insured" type="primary" @click.stop.prevent="handleAdd">+ 添加被保人</van-button>
            </div>
          </div>
          <!--            <div class="driver"></div>-->
          <div class="info-item renewal-way-box">
            <div class="flex-start">
              <van-tag class="item-no" :color="$globalColor.baseColor">3</van-tag>
              <div>明年参保意向</div>
            </div>
            <div class="renewal-way flex-sb" ref="renewalRef">
              <div class="renewal-way-item flex-sa way-active" @click="changeWayBg('Y')">
                <van-tag type="primary" :color="$globalColor.baseColor">推荐</van-tag>
                <div>有意向</div>
              </div>
              <div class="renewal-way-item flex-sa" @click="changeWayBg('N')">
                暂不考虑
              </div>
            </div>
          </div>
          <div class="renewal-content flex-sb">
            <img src="../../assets/images/bt-01.png" alt="" />
            <img src="../../assets/images/bt-02.png" alt="" />
          </div>
          <div class="read-confirm" id="readConfirm">
            <div class="checkbox-box">
              <van-checkbox class="checkbox" v-model="checked" shape="square" @click="handleCheckBox" :checked-color="$globalColor.baseColor">
                <div class="text">
                  <span>我已知悉：本产品的被保险人仅限青岛市职工、城乡居民基本医疗保险人员参保，已经阅读并同意</span>
                  <span class="clause" @click.stop="readFun('key1')">《参保须知》</span>
                  <span class="clause" @click.stop="readFun('key2')">《保障计划及产品条款》</span>
                  <span class="clause" @click.stop="readFun('key3')">《理赔须知》</span>
                  <span class="clause" @click.stop="readFun('key4')">《医保个人结余账户支付授权书》</span>
                  <span class="clause" @click.stop="readFun('key5')">《用户协议》</span>
                  <span class="clause" @click.stop="readFun('key6')">《授权申明及重要提示内容及信息安全承诺书》</span>
                  <span class="clause" @click.stop="readFun('key7')">《人身保险参保提示书》</span>
                </div>
              </van-checkbox>
            </div>
          </div>
          <footer-phone/>
          <div class="submit-box flex-sb">
            <div class="customer-icon" @click="handleCustomer">
              <span class="icon-customer"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
            </div>
            <div class="submit-price">
              <span class="total">保险费合计</span>
              <span class="cost"><countTo :startVal='startVal' :endVal='cost' :duration='1000' :decimals='2' suffix="元"></countTo></span>
            </div>
            <van-button native-type="submit" type="info">
              提交
            </van-button>
          </div>
        </div>
      </van-form>
      <!--弹框-->
      <div>
        <van-popup v-model="birthdayShow" round position="bottom" :close-on-click-overlay="false">
          <van-datetime-picker
                  v-model="currentData"
                  type="date"
                  title="选择年月日"
                  :min-date="minDate"
                  :max-date="maxDate"
                  :formatter="$birthDayFormatter"
                  @confirm="onBirthdayConfirm"
                  @cancel="birthdayShow = false"
          />
        </van-popup>
        <picker :insuredIdShow="insuredIdShow" @close="insuredIdShow=false" v-model="activePicker"></picker>
        <date-picker :insureBirthdayShow="insureBirthdayShow" @close="insureBirthdayShow=false" v-model="activeDatePicker"></date-picker>
        <van-action-sheet title="您需要阅读以下内容" v-model="clauseDialog" :close-on-popstate="true" class="van-action-box">
          <clause :keyValue="keyValue" @readFinish="readFinish"/>
        </van-action-sheet>
        <van-dialog v-model="isShowTip" title="温馨提示" theme="round-button" :confirm-button-color="$globalColor.baseColor">
          <div class="tip-error-box">
            <div v-if="errorResult.length>0">
              姓名:
              <span class="people-box" v-for="(item, index) in errorResult" :key="index">{{item}},</span>
              未查询到青岛/青岛本级医保身份，暂时无法参保，请核验后下单。
            </div>
            <p v-else class="people-box">姓名：--</p>
          </div>
        </van-dialog>
        <van-dialog v-model="isProShowTip" title="温馨提示" theme="round-button" :confirm-button-color="$globalColor.baseColor">
          <div class="tip-error-box">
            目前多个被保人情况下，不能同时包含省直属和市医保参保人员，需要分别下单。
            <div v-if="errorResult2.length>0">
              <p>{{errorResult2}}</p>
            </div>
            <p v-else class="people-box">姓名：--</p>
          </div>
        </van-dialog>
        <tip-dialog
                :tip-dialog-visible.sync="tipDialogVisible"
                tipDialogTitle="重要提示"
                tipDialogConfirmText="已确认"
                @tipDialogClose="tipDialogFunc"
        >
          请如实填写缴费人本人手机号码，若非本人手机号码，将无法通过医保个账支付认证。
        </tip-dialog>
      </div>
    </div>
  </router-layout>
</template>

<script>
  import {getIphoneCode, getvalidata, saveOrder} from '../../api'
  import {
    addClass,
    countTime, getQueryObject,
    getUserInfo, otherCertiCode,
    parseTime,
    removeClass,
    unStrictvalidatorID,
    isName
  } from '../../utils'
  import Clause from './clause'
  import {Dialog, Toast} from 'vant'
  import {idOpt, posAgendID, S_OK} from '../../utils/constant'
  import Picker from './picker'
  import DatePicker from './datePicker'
  import TipDialog from "../../components/tipDialog";
  import countTo from 'vue-count-to';
  export default {
    name: 'Insure',
    components: {TipDialog, DatePicker, Picker, Clause, countTo },
    data() {
      return {
        form: {
          // username: 'ceshi',
          // phoneNo: '13266159782',
          // smsCode: '888888',
          // certiCode: '412425199104160697',
          username: '',
          phoneNo: '',
          smsCode: '',
          certiCode: '',
          certiType: '1',
          birthday: '',
          gender: ''
        },
        idOpt: idOpt,
        insured: [{
          relationWtHolderOpt:  [{
            label: '本人',
            value: '1',
            active: null
          }, {
            label: '配偶',
            value: '2',
            active: null
          }, {
            label: '子女',
            value: '3',
            active: null
          }, {
            label: '父母',
            value: '4',
            active: null
          }, {
            label: '其他近亲属',
            value: '5',
            active: null
          }],
          relationWtHolder: '',
          name: '',
          certiCode: '',
          level: 1,
          certiType: '1',
          certiTypeHan: '居民身份证（户口簿）',
          birthday: '',
          gender: ''
        }],
        checkCodeText: '获取验证码',
        countDownTime: 60,
        disabled: false,
        idTypeShow: false,
        insuredIdShow: false, // 被保人证件类型弹窗
        insureBirthdayShow: false, // 被保人出生日期
        checked: false,
        clauseDialog: false,
        token: '',
        isRennew: 'Y', // 手动自动
        cost: 139,
        minDate: new Date(1900, 0, 1),
        maxDate: new Date(),
        currentData: new Date('1990-01-01'),
        birthdayShow: false,
        certiType: '', // 汉字证件类型
        isShowBirGen: false,
        activePicker: {},
        activeDatePicker: {},
        keyValue: '', // 传给clause的值
        isShowTip: false,
        isProShowTip: false, // 省级医保
        errorResult: [],
        errorResult2: [],
        callbackTimer: null,
        callbackNum: 0,
        validsbDataToast: '',
        callbackSpeed: 1200,
        tipDialogVisible: false,
        fromPage: '',
        busiDomainCode: '',
        agentID: '',
        startVal: 139
      }
    },
    created() {
      if ( getQueryObject().from && getQueryObject().from ==='succeed') {
        this.form = this.$route.query
        this.fromPage = 'succeed'
      }else if (getQueryObject().from && getQueryObject().from ==='userCenter') { // 从个人中心页面过来
        this.fromPage = 'userCenter'
      }
      this.busiDomainCode = getQueryObject().busiDomainCode
      this.agentID = getQueryObject().agentID

      // this.$getWeChatParams(this.agentID, window.location.href, true); // 微信自定义分享

      idOpt.filter((val) => {
        if(this.form.certiType === val.value) {
          this.certiType = val.text
          this.initData()
          return
        }
      })
    },
    mounted() {

    },
    activated() {
      this.clauseDialog = false
    },
    deactivated() {
      sessionStorage.removeItem('setPhoneDialogShow')
    },
    methods: {
      initData() {
        this.idTypeShow = false
        if (this.form.certiType === '1') {
          this.isShowBirGen = false
          this.form.gender = ''
          this.form.birthday = ''
        }else {
          this.isShowBirGen = true
        }
        this.handleInput()
      },
      validatorIDFun(val) {
        return unStrictvalidatorID(val)
      },
      otherCertiCodeFun(val) {
        return otherCertiCode(val)
      },
      validatorIsName(val) {
        return isName(val)
      },
      onConfirm(value) {
        this.form.certiType = value.value
        this.certiType = value.text
        this.form.certiCode = ''
        this.$refs.ruleForm.resetValidation('certiCode')
        this.idTypeShow = false
        if (value.value === '1') {
          this.isShowBirGen = false
          this.form.gender = ''
          this.form.birthday = ''
        }else {
          this.isShowBirGen = true
        }
        this.handleInput()
      },
      handleInput(item) {
        if(this.form.certiType === '1') {
          this.form.certiCode = this.form.certiCode.toUpperCase()
        }
        this.insured = this.insured.map(val => {
          if (item && item.certiCode) {
            val.certiCode = item.certiType === '1' ? val.certiCode.toUpperCase() : val.certiCode
          }
          if (val.relationWtHolder && val.relationWtHolder === '1') {
            val.relationWtHolderOpt.map(value => {
              if (value.value === '1') {
                val.relationWtHolder = '1'
                val.certiType = this.form.certiType
                val.name = this.form.username
                val.birthday = this.form.birthday
                val.gender = this.form.gender
                val.certiCode = this.form.certiCode
                // 带过来参保人证件类型数据
                idOpt.filter(idVal => {
                  if (idVal.value === this.form.certiType) {
                    val.certiTypeHan = idVal.text
                  }
                })
                val.isShowGender = val.certiType !== '1'
              }
            })
            return val
          }
          return val
        })
      },
      handelCheckInsure(item1, item, i, index) {
        this.insured = this.insured.map(val => {
          val.relationWtHolderOpt.map(value => {
            if (item1.level === val.level) {
              value.active = null
              if (item.value === value.value) {
                value.active = index
                if (value.value === '1') {
                  val.relationWtHolder = '1'
                  val.certiType = this.form.certiType
                  val.name = this.form.username
                  val.birthday = this.form.birthday
                  val.gender = this.form.gender
                  val.certiCode = this.form.certiCode
                  // 带过来参保人证件类型数据
                  idOpt.filter(idVal => {
                    if (idVal.value === this.form.certiType) {
                      val.certiTypeHan = idVal.text
                    }
                  })
                  val.isShowGender = val.certiType !== '1'
                  return val
                } else {
                  val.relationWtHolder = value.value
                  val.certiCode = ''
                  val.name = ''
                  val.gender = ''
                  val.birthday = ''
                  return val
                }
              }
            }
            return value
          })
          return val
        })

        // // 不能重
        this.insured = this.insured.map(val => {
          val.relationWtHolderOpt.map(value => {
            if (item1.level !== val.level) {
              if (val.relationWtHolder === '1') {
                if (item1.relationWtHolder === '1') {
                  item.active = null
                  item1.relationWtHolder = ''
                  item1.name = ''
                  item1.certiCode = ''
                  Toast('不能重复选择本人')
                  return value
                }else {
                  item1.birthday = ''
                  item1.gender = ''
                }
              }
            }
            return value
          })
          return val
        })
      },
      handleAdd() {
        if (this.insured.length >= 8) {
          Toast('最多添加8个被保人')
          return
        }
        this.insured.push({
          relationWtHolderOpt: [{
            label: '本人',
            value: '1',
            active: null
          }, {
            label: '配偶',
            value: '2',
            active: null
          }, {
            label: '子女',
            value: '3',
            active: null
          }, {
            label: '父母',
            value: '4',
            active: null
          }, {
            label: '其他近亲属',
            value: '5',
            active: null
          }],
          name: '',
          certiCode: '',
          certiType: '1',
          certiTypeHan: '居民身份证（户口簿）',
          birthday: '',
          gender: '',
          level: this.insured.length + 1,
          relationWtHolder: ''
        })
        this.cost = this.insured.length * 139
      },
      async getCode() {
        // if( smsCodeTimeRange() === true ) {
        // Toast({
        //   message: '2021/01/20正式开放参保',
        //   duration: 2000
        // })
        // setTimeout(() => {
        //   this.smsCodeFunc()
        // }, 2000)
        // }
        this.smsCodeFunc()
      },
      smsCodeFunc() {
        const params = {
          phoneNo: this.form.phoneNo,
          bizType: 'valid'
        }
        this.$refs.ruleForm.validate('phoneNo').then(async res => {
          this.disabled = true
          const result = await getIphoneCode(params)
          if (result.code === S_OK) {
            Toast({
              message: '验证码发送成功',
              duration: 2000
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
        }).catch(() => {
          // this.$refs.ruleForm.resetValidation('phoneNo')
        })
      },
      insuredClose() {
        this.insured.pop()
        this.cost = this.insured.length * 139
      },
      changeWayBg(isRennew) {
        if (isRennew === 'Y') {
          removeClass(this.$refs.renewalRef.getElementsByClassName('renewal-way-item')[1], 'way-active')
          addClass(this.$refs.renewalRef.getElementsByClassName('renewal-way-item')[0], 'way-active')
        } else {
          removeClass(this.$refs.renewalRef.getElementsByClassName('renewal-way-item')[0], 'way-active')
          addClass(this.$refs.renewalRef.getElementsByClassName('renewal-way-item')[1], 'way-active')
        }
        this.isRennew = isRennew
      },
      readFun(val) {
        Toast.loading({
          message: '加载中',
          loadingType: 'spinner',
          duration: 1000
        })
        this.clauseDialog = true
        this.keyValue = val
      },
      onSubmit: async function () {
        let _this = this
        this.$refs.ruleForm.validate().then(async res => {
          if (res && res.length > 0) {
            return
          } else {
            if (!this.checked) {
              document.getElementById('readConfirm').scrollIntoView()
              this.$toast('请先阅读条款')
              return
            } else {
              if (!this.fromPage) {
                if (!getUserInfo().agent) {
                  Toast('对不起！初始化失败，请退出程序重新参保')
                  return
                }
              }
              Dialog.confirm({
                title: '温馨提示',
                message: '您提交的参保信息，请认真检查，暂不支持修改，请知悉。',
                confirmButtonColor: this.$globalColor.baseColor
              })
                .then(() => {
                  _this.submitFunc()
                })
            }
          }
        }, error => {
          if (error && error.length > 0) {
            return
          }
          if ((error === 'undefined' || error === undefined) && !this.checked) {
            this.$toast('请先阅读条款')
            return
          }
        })
      },

      async submitFunc() {
        let params = {}
        if (this.fromPage) {
          params = {
            smsToken: this.form.token,
            smsCode: this.form.smsCode,
            isRennew: this.isRennew,
            agent: {
              token: this.agentID
            },
            issureds: this.insured.map(value => {
              return {
                certiCode: value.certiCode,
                certiType: value.certiType,
                gender: value.gender,
                birthday: value.birthday,
                name: value.name,
                relationWtHolder: value.relationWtHolder
              }
            }),
            holder: {
              contactMobile: this.form.phoneNo,
              certiType: this.form.certiType,
              name: this.form.username,
              certiCode: this.form.certiCode,
              gender: this.form.gender,
              birthday: this.form.birthday
            }
          }
        }else {
          params = {
            smsToken: this.form.token,
            smsCode: this.form.smsCode,
            orgCode: getUserInfo().agent.companyCode,
            orgName: getUserInfo().agent.companyName,
            openId: getUserInfo().agent.openId,
            isRennew: this.isRennew,
            agent: {
              agentCode: getUserInfo().agent.agentCode,
              agentName: getUserInfo().agent.agentName,
              orginCode: getUserInfo().agent.companyCode,
              orginName: getUserInfo().agent.companyName,
              orgLevelOne: getUserInfo().agent.orgLevelOne,
              orgLevelTwo: getUserInfo().agent.orgLevelTwo,
              orgLevelThree: getUserInfo().agent.orgLevelThree,
              extenndInfo1: getUserInfo().agent.extenndInfo1,
              token: getUserInfo().agent.token,
              putAddress: getUserInfo().agent.putAddress
            },
            busiDomain: {
              productDomainCode: getUserInfo().products[0].busiDomain
            },
            issureds: this.insured.map(value => {
              return {
                certiCode: value.certiCode,
                certiType: value.certiType,
                gender: value.gender,
                birthday: value.birthday,
                name: value.name,
                relationWtHolder: value.relationWtHolder
              }
            }),
            holder: {
              contactMobile: this.form.phoneNo,
              certiType: this.form.certiType,
              name: this.form.username,
              certiCode: this.form.certiCode,
              gender: this.form.gender,
              birthday: this.form.birthday
            }
          }
        }

        this.validsbDataToast = Toast.loading({
          message: '身份正在验证中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        })
        const getResult = await getvalidata(params)
        this.callbackNum = 1
        if (getResult.code === S_OK) {
          this.validsbDataToast.clear()
          const insureInfo = getResult.data
          this.saveData(insureInfo)
        } else if (getResult.code === '77777') {
          this.validsbDataToast.clear()
          this.errorResult = getResult.message.split(',')
          this.isShowTip = true
        } else if (getResult.code === '77778') {
          this.validsbDataToast.clear()
          this.errorResult2 = getResult.data
          this.isProShowTip = true
        } else if (getResult.code === '10002') {
          this.callbackGetvalidata(params)
        } else {
          this.validsbDataToast.clear();
          Toast({
            message: getResult.message || '校验接口有无',
            duration: 3000
          })
        }
      },

      async callbackGetvalidata(params) {
        if (this.callbackNum < 9) {
          clearTimeout(this.callbackTimer)
          this.callbackTimer = setTimeout(async() => {
            const getResult = await getvalidata(params)
            if (getResult.code === S_OK) {
              this.validsbDataToast.clear()
              const insureInfo = getResult.data
              this.saveData(insureInfo)
            } else if (getResult.code === '77777') {
              this.validsbDataToast.clear()
              this.errorResult = getResult.message.split(',')
              this.isShowTip = true
            } else if (getResult.code === '77778') {
              this.validsbDataToast.clear()
              this.errorResult2 = getResult.data
              this.isProShowTip = true
            } else if (getResult.code === '10002') {
              this.callbackGetvalidata(params)
            } else {
              this.validsbDataToast.clear()
              clearTimeout(this.callbackTimer)
              Toast({ message: getResult.message || '校验接口有无', duration: 3000 })
            }
            this.callbackNum++
            this.callbackSpeed = this.callbackSpeed + 600
          }, this.callbackSpeed)
        } else {
          this.validsbDataToast.clear()
          clearTimeout(this.callbackTimer)
          Toast({ message: "亲，当前在线参保人数较多，请稍后再试。", duration: 3000 })
        }
      },

      async saveData(insureInfo) {

        const result = await saveOrder(insureInfo)
        if (result.code === S_OK) {
          this.$store.dispatch('setOrderInfo', {...result.data, from: 'confirm'})

          if(this.fromPage === 'userCenter' || this.fromPage === 'succeed') {
            this.$router.replace({name: 'PayWay', query: { routeWay: '4', token: this.agentID, busiDomainCode: this.busiDomainCode, agentID: this.agentID }})
          }else {
            let agentID = JSON.parse(sessionStorage.getItem('commonParams')).agentID
            if (agentID.indexOf('#/') > -1) {
              agentID = agentID.split('#')[0]
            }
            if (sessionStorage.getItem('commonParams') && agentID === posAgendID) {
              this.$router.replace('/goPos')
            } else {
              this.$router.replace({name: 'PayWay', query: {from: 'confirm', routeWay: '3', busiDomainCode: this.busiDomainCode, agentID: this.agentID, orderNo: result.data.orderNo}})
            }
          }
        }
      },
      onBirthdayConfirm(value) {
        this.form.birthday = parseTime(value, '{y}-{m}-{d}')
        this.birthdayShow = false
        this.handleInput()
      },
      selectInsureSelect(item) {
        if (item.relationWtHolder === '1') {
          return
        } else {
          this.activePicker = item
          this.insuredIdShow = true
          this.$refs.ruleForm.resetValidation(item.certiCode)
        }

      },
      onInsureBirthdayConfirm(item) {
        if (item.relationWtHolder === '1') {
          return
        } else {
          this.activeDatePicker = item
          this.insureBirthdayShow = true
        }
      },
      handleCheckBox() {
        Toast.loading({
          message: '加载中',
          loadingType: 'spinner',
          duration: 1000
        })
        if(this.checked) {
          this.clauseDialog = true
          this.keyValue = 'key6'
          this.checked = !this.checked
        }
      },
      readFinish() {
        this.checked = true
        this.keyValue = ''
        this.clauseDialog = false
      },
      handleCustomer() {
        this.$router.push('/customer')
      },
      tipDialogFunc() {
        this.tipDialogVisible=false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  .insure-wrapper {
    color: #666;
    height: 100%;
    .insure-top {
      font-size: 32px;
      padding: 30px 0 20px 20px;
      border-bottom: 1px solid #ddd;
    }

    .customer-icon {
      font-size: 100px;
    }
    .info-content {
      margin: 40px auto 70px;
      padding: 0 20px 140px;

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
      .item-no {
        width: 30px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .info-item-two {
        margin-top: 80px;

        .insured-box {
          border: 1px solid #ddd;
          margin-top: 20px;
          font-size: 24px;

          .insured-name {
            margin: 20px;
          }

          .insured-item-box {
            padding-bottom: 20px;

            .insured-item {
              width: 100px;
              height: 60px;
              border: 2px solid #999;
              text-align: center;
              line-height: 56px;
              border-radius: 2px;
              &.insured-active {
                /*background: url('https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/bt-03.png') no-repeat;*/
                border: 2px solid $base-color;
                box-sizing: border-box;
              }
              &:last-child {
                width: 180px;
                &.insured-active {
                  border: 2px solid $base-color;
                  /*background: url('https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/bt-04.png') no-repeat;*/
                }
              }
            }
          }
        }
      }
    }

    .renewal-way-box {
      margin-top: 20px;
      .renewal-way {
        margin-top: 20px;
        .renewal-way-item {
          width: 330px;
          border: 1px solid #ddd;
          height: 100px;
          box-sizing: border-box;
          font-size: 30px;
          padding: 0 60px;
        }
      }
    }

    .way-active {
      /*background: url("../../assets/images/way-active.png") no-repeat;*/
      border: 2px solid $base-color !important;
      /*background-size:328px 98px;*/
      /*box-sizing: border-box;*/
      /*border: 1px solid transparent !important;*/
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
            color: $base-color;
          }
        }
      }
    }
    .submit-box {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100px;
      border-top: 1px solid #ddd;
      margin: 0 auto;
      background: #fafafa;
      z-index: 1000;
      .customer-icon {
        width: 100px;
        height: 100px;
      }
      .submit-price {
        flex: 1;
        height: 100px;
        line-height: 100px;
        border-left: 1px solid #eee;
        text-align: right;
        margin-right: 50px;
      }
      .total {
        margin: 0 10px 0 10px;
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

    .driver {
      width: 100%;
      height: 1px;
      background: #ddd;
      margin: 80px auto 20px;
    }

    .insured-input {
      margin: 0 20px;
    }
    .renewal-content {
      img {
        width: 330px;
      }
    }
    .tip-error-box {
      padding: 20px 40px;
      line-height: 46px;
      font-size: 26px;
      text-align: justify;
      .people-box {
        margin: 20px auto;
      }
    }
  }
</style>
<style lang="scss">
  @import "../../styles/variables";
  @import "../../static/iconfront/style.css";
  .insure-wrapper {
    .van-action-sheet {
      max-height: 100%;
    }
    .iconFront {
      display: block;
      font-size: 70px;
      text-align: center;
      line-height: 1.4;
    }
    .van-popup--bottom.van-popup--round {
      border-radius: 0;
    }
    .van-cell {
      font-size: 24px;
    }

    .form-box {
      margin: 20px auto;
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

    .relate-option {
      .van-cell {
        padding: 0;
      }
      .van-field__button {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin: 0;
        padding-left: 0;
      }
    }
  }
</style>


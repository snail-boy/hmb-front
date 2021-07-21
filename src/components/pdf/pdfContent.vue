<template>
  <div class="pdf-content">
    <h3 class="tip">为保障您的隐私，参缴凭证已加密</h3>
    <h2>青岛市商业健康补充保险“琴岛e保”个人参保凭证</h2>
    <div class="flex-sb voucher-top">
      <p>参缴编号：{{this.pdfData.certificate}}</p>
      <p>保险费：139元</p>
      <p>缴费方式：{{this.pdfData.payMode}}</p>
      <p>被保险人姓名：{{this.pdfData.name}}</p>
      <p>性别：{{this.pdfData.gender}}</p>
      <p>出生日期：{{this.pdfData.birthday}}</p>
      <p>证件号码：{{this.pdfData.certNo}}</p>
      <p style="width: 60%">保险期限：{{this.pdfData.effectiveDateChn}}</p>
    </div>
    <span class="line-box"></span>
    <div class="title-name">【保险责任】</div>
    <p v-for="(item, index) in dutyDetail" :key="index">
      <span class="g-bolder" v-if="item.key1" v-html="item.key1"></span>
      <span v-html="item.key2"></span>
    </p>
    <span class="line-box"></span>
    <div class="title-name">【特别约定】</div>
    <div class="bold">
      <p>（一）待遇核算</p>
      <p>“琴岛e保”的待遇核算在享受青岛市社会医疗保险统筹待遇之后进行。</p>
      <p>（二）转外就医</p>
      <p>被保险人转外就医符合青岛基本医保管理办法要求，并按医保规定办理转外治疗手续，发生的相关医疗费用达到约定起付线标准，在约定赔付比例的基础上降低5个百分点后予以报销。若未按规定办理相关备案手续的或临时外出就医的，发生相关医疗费用达到约定起付线标准，在约定赔付比例的基础上降低15个百分点后予以报销。</p>
      <p>（三）等待期：2021年首年投保的，首年及续保均不设待遇等待期；以后各年新增参保者，自合同生效日起60日（含第60日）为等待期（新生儿无等待期）。等待期，是指保险合同在生效的指定时期内，即使发生保险事故，受益人也不能获得保险赔偿，这段时期称为等待期。</p>
      <p>（四）本产品为医疗费用补偿型，总体给付原则是各方（包括但不限于所属社会医疗保险，工作单位、侵权人或侵权责任承担方及商业保险机构等）汇总给付金额不超过被保险人实际支出的医疗费用。</p>
      <p>（五）被保险人在保险责任期起始日（2021年7月1日）以前入院，因事故发生不在保险责任期内，该次住院产生的所有医疗费用保险人不承担给付保险金责任；被保险人在保险责任期间入院，但在保险责任终止日期（2022年6月30日）治疗仍未结束且次年未及时续保的，保险人所负保险责任自保险期间届满之时终止。</p>
      <p>（六）被保险人在保险责任期起始日（2021年7月1日）以前入院，因事故发生不在保险责任期内，该次住院产生的所有医疗费用保险人不承担给付保险金责任；被保险人在保险责任期间入院，但在保险责任终止日期（2022年6月30日）治疗仍未结束且次年未及时续保的，保险人所负保险责任自保险期间届满之时终止。</p>
      <p>其他未尽事宜详见“琴岛e保”微信公众号参保须知等。</p>
    </div>
    <span class="line-box"></span>
    <div class="title-name">【免责条款】</div>
    <p class="two">1.应当由第三人负担的；</p>
    <p class="two">2.应当从工伤保险、护理保险、门诊统筹等支付的以及因生育住院产生的医疗费用；</p>
    <p class="two">3.应当由公共卫生负担的；</p>
    <p class="two">4.保险合同中载明的起付线以下金额；</p>
    <p class="two">5.被保险人符合特药/特材慈善援助用药申请，但因被保险人未提交相关申请或者提交申请材料不全，导致援助项目申请未通过而发生的药品费用；被保险人通过援助审核，但因被保险人原因未领取援助药品，视为被保险人自愿放弃本合同项下适用的保险权益；</p>
    <p class="two">6.法律、法规、政策、文件规定不予支付的事项；</p>
    <p class="two">7.被保险人不按本市社会医疗保险有关规定就医发生的医疗费用；</p>
    <p class="two">8.被保险人在医疗费用发生期间，不享受青岛市社会医疗保险统筹待遇的；</p>
    <p class="two">9.当次手术或住院基本医疗保险整体不予报销的情形，如各种美容、整形、非功能性矫形、减肥，治疗雀斑、脱痣、护肤、镶牙、洁牙，配镜、装配假眼、假肢、助听器等发生的费用；</p>
    <p class="two">10.非疾病治疗项目类，如各种健康体检、婚前检查、旅游体检、职业体检、出境体检等费用；</p>
    <p class="two">11.各种不育（孕）症、性功能障碍的诊疗项目（如：男性不育、女性不育检查、治疗费，鉴定性病检查、治疗费，违反计划生育的－切医疗费用），各种教学性、科研性和临床验证性的诊疗项目费用。</p>
    <p>其他未尽事宜详见“琴岛e保”微信公众号参保须知等。</p>
    <span class="line-box"></span>
    <div class="title-name">【联合承保单位】</div>
    <p>首席保险人：中国人寿保险股份有限公司青岛市分公司</p>
    <p>共同保险人：泰康养老保险股份有限公司青岛分公司</p>
    <p>平安养老保险股份有限公司青岛分公司</p>
    <p>太平养老保险股份有限公司青岛分公司</p>
    <p>中国人民健康保险股份有限公司青岛分公司</p>
    <p>服务热线：中国人寿95519、泰康养老4006695522、平安养老95511、太平养老95589、人保健康95518</p>
    <p>未尽事宜，详请查询“琴岛e保”微信公众号、“青岛医保”微信公众号和青岛市各区市医保局微信公众号、“青岛市保险行业协会”微信公众号、承保公司微信公众号（中国人寿保险青岛市分公司服务号、泰康养老青岛分公司、平安养老险青岛分公司、太平养老青岛分公司、青岛人保健康）公布的相关信息或咨询承保单位工作人员。</p>
  </div>
</template>

<script>
  import {dutyDetail} from "../../utils/json";
  export default {
    name: "pdfContent",
    props: {
      pdfData: {
        type: Object,
        default: function () {
          return {
            certNo: "",
            certType: "",
            certificate: "",
            effectiveDate: "",
            effectiveDateChn: "",
            gender: "",
            name: "",
          }
        }
      }
    },
    data() {
      return {
        dutyDetail: dutyDetail
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  .pdf-content {
    width: 100%;
    height: auto;
    .tip {
      color: red;
      text-align: center;
    }
    .flex-sb {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
    }

    .flex-sb .flex-item {
      margin-right: 20px;
    }
    .voucher-top {
      p {
        width: 33%;
      }
    }

    .line-box {
      display: block;
      width: 100%;
      height: 2px;
      background: $base-color;
      margin: 10px auto;
    }

    .title-name {
      font-weight: bold;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 16px;
    }

    h2 {
      margin:0 auto 20px;
      color: black;
      font-weight: bold;
      line-height: 40px;
      text-align: center;
      font-size: 26px;
    }

    p {
      line-height: 1.5;
      margin: 0 0 6px;
      text-align: justify;
      font-size: 14px;
    }

    .bold {
      font-weight: bolder;
      color: black;
    }

    .marginTop40 {
      margin-top: 20px;
    }
    .title-two {
      font-weight: bolder;
      font-size: 16px;
    }
    .text-two {
      font-size: 14px;
    }
    .big-text {
      font-size: 14px;
      font-weight: bolder;
    }
    .table-data-head {
      font-size: 14px;
    }
  }
</style>

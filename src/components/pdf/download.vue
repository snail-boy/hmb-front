<template>
  <div class="main-article">
    <div id="pdfContent" ref="pdfContent" class="node-article-content" style="transform-origin: 500px 100px 200px; transform: scale(1);">
      <pdf-content :pdf-data="resultList"></pdf-content>
    </div>
    <van-overlay :show="show">
      <img src="../../assets/images/yindao.gif"/>
    </van-overlay>
  </div>
</template>

<script>
  import PdfContent from "./pdfContent";
  import {Toast} from 'vant'
  import {judegeAlipay} from "../../utils";

  export default {
    components: {PdfContent},
    data() {
      return {
        article: '',
        resultList: {},
        title: '青岛市商业健康补充保险“琴岛e保”个人参保凭证',
        show: true,
        voucherToast: '',
        pageShow: false
      }
    },
    created() {
      if (judegeAlipay() === 'weChat') {
        this.show = true
      }else if (judegeAlipay() === 'AliPy') {
        this.show = true
      }else {
        this.show = false
      }
      this.resultList = this.$route.query
    },
    mounted() {
      if (judegeAlipay() !== 'weChat' && judegeAlipay() !== 'AliPy') {
        setTimeout(() => {
          this.download()
        }, 600)
      }
    },
    methods: {
      download() {
        this.voucherToast = Toast.loading({
          message: '生成中',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 4000
        })
        let _this = this
        _this.$refs.pdfContent.scrollIntoView()
        _this.$getPdf('pdfContent', this.title, (res) => {
          if(res.isDownload) {
            _this.voucherToast.clear()
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../styles/variables";
  .main-article {
    margin: 0 auto;
    display: block;
    overflow: auto;
    user-select: none;
    font-size: 24px;
    font-family: "Songti SC";
    .van-overlay {
      background: white;
    }
  }
  .node-article-content {
    width: 200%;
    padding:20px 10px 10px;
    font-size: 18px;
    background-image: url("../../assets/images/suisui.png");
    background-repeat: repeat;
    background-size: 140px auto;
  }
</style>

import {checkRecording, setValue} from "../../api";
import router from '../../router'
import Cookies from 'js-cookie'
import md5 from 'js-md5';
import {rrWebZip} from "../../utils";
class vsr {
  constructor() {
    this.operation = null;
    this.url = ''
    this.timer = null
    this.needRecord = false
    this.events = [];

  }

  async vsrInit() {
    let events = [];
    let _this = this

    rrweb.record({
      emit(event) {
        events.push(event);
      },
      sampling: {
        // 不录制鼠标移动事件
        mousemove: false,
        // 不录制鼠标交互事件
        mouseInteraction: false,
        // 设置滚动事件的触发频率
        scroll: 200, // 每 200ms 最多触发一次
        // 设置输入事件的录制时机
        // input: 'last', // 连续输入时，只录制最终值
        MouseUp: false,
        MouseDown: false,
        // Click: false,
        ContextMenu: false,
        DblClick: false,
        Focus: false,
        Blur: false,
        // TouchStart: false,
        // TouchEnd: false,
      },
      inlineStylesheet: true,
      slimDOMOptions: {
        svg: true,
        script: true,
        comment: true,
        headFavicon: true,
        headWhitespace: true,
        headMetaDescKeywords: true,
        headMetaSocial: true,
        headMetaRobots: true,
        headMetaHttpEquiv: true,
        headMetaAuthorship: true,
        headMetaVerification: true,
      },
      packFn: rrweb.pack,
      // recordLog: true
      // checkoutEveryNth: 200, // 每 200 个 event 重新制作快照
    });

    // save 函数用于将 events 发送至后端存入，并重置 events 数组
    async function save() {
      const timestamp = new Date().getTime()
      let body = ''
      if (events.length > 0) {
        // console.log(JSON.stringify(events), 'JSON.stringify(events)')
        // console.log(rrWebZip(JSON.stringify(events)), 'rrWebZip(JSON.stringify(events)')
        body =  timestamp + md5(timestamp + 'zbkl') + rrWebZip(JSON.stringify(events)) // 压缩传输
        events = []
        await setValue(body);
      }
    }

    // router.afterEach((to) => {
    //   // if(from.name === 'Insure') {
    //   //   save()
    //   // }
    //   if(to.name === 'PayWay' || to.name === 'Succeed') {
    //     events  = []
    //   }
    // })

    router.beforeEach(async (to, from, next) => {
      let url = _this.getDomain() + '/#' + to.path
      const timestamp = new Date().getTime()
      if(to.name === 'Home' || to.name === 'Insure' || to.name === 'PayWay' || to.name === 'Succeed' || to.name === 'PayError' || to.name === 'Payment') {
        let result = await checkRecording({
          "startTime": timestamp,
          "url": url,
          'agentID': to.query && to.query.agentID
        })
        if (result.result && result.result.needRecord) {
          Cookies.set('zbklTrackMark', result.result && result.result.eventsId, 'Infinity')
          save()
          if(to.name === 'Succeed' || to.name === 'PayError' || to.name === 'Payment') {
            setTimeout(() => {
              save()
            },2000)
          }else {
            setTimeout(() => {
              save()
            },500)
          }
          setTimeout(() => {
            this.timeSave = _this.throttling(save, 1000, true);
            if(!result.result.isEndPage) {
              window.addEventListener('touchstart', this.timeSave, false)
              window.addEventListener('keyup', this.timeSave, false)
            }else {
              window.removeEventListener('touchstart', this.timeSave, false)
              window.removeEventListener('keyup', this.timeSave, false)
            }
          },600)
        }else {
          window.removeEventListener('touchstart', this.timeSave, false)
          window.removeEventListener('keyup', this.timeSave, false)
        }
      }else {
        events = []
        window.removeEventListener('touchstart', this.timeSave, false)
        window.removeEventListener('keyup', this.timeSave, false)
      }
      next()
    })
  }

  throttling (fn, wait, immediate) {
    let timer;
    let context, args;

    let run = () => {
      timer=setTimeout(()=>{
        if(!immediate){
          fn.apply(context,args);
        }
        clearTimeout(timer);
        timer=null;
      },wait);
    }

    return function () {
      context=this;
      args=arguments;
      if(!timer){
        if(immediate){
          fn.apply(context,args);
        }
        run();
      }
    }
  }

  getDomain() {
    let url = window.location.href
    return url.split('://')[1].split('/#/')[0]
  }

}

export default vsr;

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8161545e"],{"09ae":function(t,e,n){},"1d6f":function(t,e,n){"use strict";n("09ae")},"43a6":function(t,e,n){t.exports=n.p+"static/img/succeed-info.9db6aada.png"},"602f":function(t,e,n){t.exports=n.p+"static/img/code.755d01bd.jpeg"},d0662:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("router-layout",[a("div",{staticClass:"error-wrapper"},[a("div",{staticClass:"centent"},[a("img",{staticClass:"succeed-logo",attrs:{src:n("fd1d"),alt:""}}),a("div",{staticClass:"centent-font"},[a("p",{staticClass:"centent-font-two"},[t._v("可前往琴岛e保微信公众号")]),a("p",[t._v("服务中心-个人中心继续支付")])])]),a("div",{staticClass:"succeed-bg rr-block"},[a("img",{attrs:{src:n("43a6"),alt:""},on:{click:t.handleClick}})]),a("div",{staticClass:"pay-btn-box flex-sa rr-block"},[t.id?a("van-button",{attrs:{type:"primary",color:"#9CC76E"},on:{click:t.showDetail}},[t._v("查看订单")]):t._e()],1),a("footer-phone",{staticClass:"rr-block"}),a("van-overlay",{staticClass:"rr-block",attrs:{show:t.showOverlay},on:{click:function(e){t.showOverlay=!1}}},[a("div",{staticClass:"overlay-wrapper",on:{click:function(t){t.stopPropagation()}}},[a("div",{staticClass:"overlay-content"},[a("img",{attrs:{src:n("602f"),alt:""}}),a("div",{staticClass:"overlay-tip"},[t._v("长按图片，关注公众号后可订阅保单通知")])])])])],1)])},i=[],o=n("1da1"),s=(n("96cf"),n("ed08")),r=n("365c"),c={data:function(){return{agentID:"",busiDomainCode:"",id:"",orderNo:"",token:"",showOverlay:!0}},mounted:function(){var t=this;this.agentID=Object(s["d"])().token,this.busiDomainCode=Object(s["d"])().busiDomainCode,this.orderNo=Object(s["d"])().orderNo,this.token=Object(s["d"])().token,this.payChannel=Object(s["d"])().payChannel,this.id=Object(s["d"])().id,setTimeout((function(){t.getVideoFinish()}),2300)},methods:{getVideoFinish:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(r["F"])({id:t.id});case 2:case"end":return e.stop()}}),e)})))()},goIndex:function(){this.$router.push({name:"PayWay",query:{from:"payError",orderNo:this.orderNo,token:this.token,agentID:this.agentID,payChannel:this.payChannel,routeWay:1}})},showDetail:function(){sessionStorage.setItem("/payError","-2"),this.$router.push({name:"Detail",query:{id:this.id}})},handleClick:function(){this.showOverlay=!0}}},d=c,l=(n("1d6f"),n("2877")),u=Object(l["a"])(d,a,i,!1,null,"e0bf0d12",null);e["default"]=u.exports},fd1d:function(t,e,n){t.exports=n.p+"static/img/pay-error.072dc58e.png"}}]);
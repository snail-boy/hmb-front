(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e69ae252"],{3010:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("router-layout",[r("div",{staticClass:"check-code-wrapper"},[r("img",{staticClass:"logo-box",attrs:{src:n("9d64"),alt:""}}),r("div",{staticClass:"check-title"},[e._v("手机号登录")]),r("van-form",{ref:"ruleForm",staticClass:"form-box",attrs:{"submit-on-enter":!1},nativeOn:{submit:function(t){return t.preventDefault(),e.onSubmit.apply(null,arguments)}}},[r("van-field",{attrs:{rules:[{required:!0,validator:e.$validatorIphone,message:"请填写正确的手机号码"}],label:"手机号码",name:"phoneNo",clearable:"",type:"tel",autocomplete:"off",placeholder:"请填写本人手机号码"},model:{value:e.form.phoneNo,callback:function(t){e.$set(e.form,"phoneNo","string"===typeof t?t.trim():t)},expression:"form.phoneNo"}}),r("van-field",{attrs:{rules:[{required:!0,validator:e.$validatorSmsCode,message:"请填写六位验证码"}],type:"digit",center:"",clearable:"",label:"短信验证码",name:"smsCode",autocomplete:"off",maxlength:"6"},scopedSlots:e._u([{key:"button",fn:function(){return[r("van-button",{staticClass:"code-btn",attrs:{"native-type":"button",size:"small",type:"primary",disabled:e.disabled},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.getCode.apply(null,arguments)}}},[e._v(e._s(e.checkCodeText)+" ")])]},proxy:!0}]),model:{value:e.form.smsCode,callback:function(t){e.$set(e.form,"smsCode","string"===typeof t?t.trim():t)},expression:"form.smsCode"}}),r("van-button",{staticClass:"now-btn",attrs:{"native-type":"submit",type:"info"}},[e._v("登录")])],1)],1)])},o=[],a=n("1da1"),s=(n("96cf"),n("ed08")),c=n("60fe"),i=n("d399"),u=n("365c"),l={name:"CheckCode",data:function(){return{form:{phoneNo:"",smsCode:"",token:""},checkCodeText:"获取验证码",disabled:!1,timer:null,countDownTime:""}},methods:{onSubmit:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs.ruleForm.validate().then(function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(n){var r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(n&&n.length>0)){t.next=4;break}return t.abrupt("return");case 4:return r={phoneNo:e.form.phoneNo,smsCode:e.form.smsCode,returnUrl:"/userCenter?from=checkCode"},t.next=7,Object(u["n"])(r);case 7:o=t.sent,o.code===c["d"]&&e.$router.push(o.result);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),(function(e){e&&e.length}));case 1:case"end":return t.stop()}}),t)})))()},getCode:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.smsCodeFunc();case 1:case"end":return t.stop()}}),t)})))()},smsCodeFunc:function(){var e=this,t={phoneNo:this.form.phoneNo,bizType:"login"};this.$refs.ruleForm.validate("phoneNo").then(function(){var n=Object(a["a"])(regeneratorRuntime.mark((function n(r){var o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.disabled=!0,n.next=3,Object(u["E"])(t);case 3:o=n.sent,o.code===c["d"]?(Object(i["a"])({message:"验证码发送成功",duration:2e3}),clearInterval(e.timer),e.countDownTime=60,e.timer=setInterval((function(){e.countDownTime=e.countDownTime-1,e.checkCodeText=Object(s["b"])(e.countDownTime).seconds+"s",e.countDownTime<=0&&(clearInterval(e.timer),e.checkCodeText="获取验证码",e.disabled=!1)}),1e3)):(e.disabled=!1,Object(i["a"])({message:o.message,duration:1e3}));case 5:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(){}))}}},d=l,m=(n("a016"),n("2877")),f=Object(m["a"])(d,r,o,!1,null,"e8d6fc12",null);t["default"]=f.exports},"9d64":function(e,t,n){e.exports=n.p+"static/img/logo.9f2d904d.png"},a016:function(e,t,n){"use strict";n("d5fe")},d5fe:function(e,t,n){}}]);
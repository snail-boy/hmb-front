(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1eae1eaf"],{aeaa:function(e,t,n){},e002:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("router-layout",[n("div",{staticClass:"setting-wrapper"},[n("van-cell",{attrs:{title:"账户信息","is-link":"",to:"/userCenter/setting/account"}}),n("van-cell-group",[n("van-cell",{attrs:{title:"微信绑定",label:"解除微信关联帐号绑定","is-link":"",value:"去解绑"},on:{click:e.handleLogOut}}),n("van-cell",{attrs:{title:"用户认证",label:"若需实名认证或变更实名信息，请点击",value:"实名认证","is-link":""},on:{click:e.handleAuth}})],1),n("van-cell-group",[n("van-cell",{attrs:{title:"意见反馈","is-link":""},on:{click:e.handleOpinion}}),n("van-cell",{attrs:{title:"隐私相关协议","is-link":""},on:{click:e.handlePrivacy}}),n("van-cell",{attrs:{title:"关于我们","is-link":""},on:{click:e.handleAbout}})],1)],1)])},l=[],i=n("1da1"),r=(n("96cf"),n("60fe")),o=n("2241"),c=n("365c"),u={name:"Setting",created:function(){},methods:{handleOpinion:function(){this.$router.push({name:"Opinion"})},handleAuth:function(){this.$router.push({name:"NoReal",query:{returnUrl:r["r"]+"/userCenter"}})},handleAbout:function(){this.$router.push({name:"About"})},handlePrivacy:function(){this.$router.push({name:"Privacy"})},handleLogOut:function(){var e=this;o["a"].confirm({title:"尊敬的用户 您好！",message:'<div style="text-align: justify; line-height: 30px;">如果你想解除帐号绑定，请点击确认</div>',theme:"round-button",cancelButtonColor:this.$globalColor.secondColor,confirmButtonColor:this.$globalColor.baseColor}).then(Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["B"])();case 2:n=t.sent,n.code===r["d"]&&e.$router.push({name:"UserCenter",query:{from:"loginOut"}});case 4:case"end":return t.stop()}}),t)}))))}}},s=u,h=(n("e7ba"),n("2877")),d=Object(h["a"])(s,a,l,!1,null,"b6ba503a",null);t["default"]=d.exports},e7ba:function(e,t,n){"use strict";n("aeaa")}}]);
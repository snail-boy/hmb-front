(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e13a2"],{"7a13":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div")},n=[],l={name:"Real",data:function(){return{isReal:1}},created:function(){1===this.isReal?this.goNoReal():2===this.isReal?this.goYesReal():3===this.isReal&&this.goReReal()},methods:{goNoReal:function(){this.$router.push("/real/noReal")},goYesReal:function(){this.$router.push("/real/yesReal")},goReReal:function(){this.$router.push("/real/reReal")}}},i=l,o=a("2877"),u=Object(o["a"])(i,s,n,!1,null,null,null);t["default"]=u.exports}}]);
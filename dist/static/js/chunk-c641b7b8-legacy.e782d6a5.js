(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c641b7b8"],{"28ff":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"company-wrapper"},[t("div",{staticClass:"content"},[e._m(0),t("div",[t("van-form",{ref:"companyForm",staticClass:"form-box",attrs:{"submit-on-enter":!1},nativeOn:{submit:function(a){return a.preventDefault(),e.onSubmit.apply(null,arguments)}}},[t("van-field",{attrs:{rules:[{required:!0}],label:"企业名称(全称)",name:"companyName",clearable:"",autocomplete:"off",placeholder:"请填写企业名称(全称)"},model:{value:e.form.companyName,callback:function(a){e.$set(e.form,"companyName",a)},expression:"form.companyName"}}),t("van-field",{attrs:{rules:[{required:!0}],label:"联系人姓名",name:"name",clearable:"",autocomplete:"off",placeholder:"请填写联系人姓名"},model:{value:e.form.name,callback:function(a){e.$set(e.form,"name",a)},expression:"form.name"}}),t("van-field",{attrs:{rules:[{required:!0}],label:"电话",name:"phoneNo",type:"tel",clearable:"",autocomplete:"off",placeholder:"请填写电话"},model:{value:e.form.phoneNo,callback:function(a){e.$set(e.form,"phoneNo",a)},expression:"form.phoneNo"}}),t("van-field",{attrs:{rules:[{required:!0,validator:e.validatorEmail,message:"请输入正确的电子邮件"}],label:"电子邮件",name:"email",type:"email",clearable:"",autocomplete:"off"},model:{value:e.form.email,callback:function(a){e.$set(e.form,"email",a)},expression:"form.email"}}),t("van-button",{staticClass:"now-btn",attrs:{"native-type":"submit",type:"info"}},[e._v("提交")])],1)],1)])])},r=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"title-text"},[e._v(" 青岛 "),t("span",{staticClass:"title-name"},[e._v('"琴岛e保"')]),e._v(" 支持企事业单位、机关团队、社会团体以团体形式统一参保，如有意团体参保的，可在下方填写信息，将有工作人员提供专业服务。 ")])}],o=t("1da1"),l=(t("96cf"),t("365c")),c=t("60fe"),i=t("d399"),s={name:"Company",data:function(){return{form:{companyName:"",name:"",phoneNo:"",email:""}}},methods:{validatorEmail:function(e){return/^[a-zA-Z0-9._%+-]+@(?!.*\.\..*)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(e)},onSubmit:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:e.$refs.companyForm.validate().then(function(){var a=Object(o["a"])(regeneratorRuntime.mark((function a(t){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(l["d"])(e.form);case 2:n=a.sent,n.code===c["d"]&&(i["a"].success({message:"录入成功",forbidClick:!0}),e.form={});case 4:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}());case 1:case"end":return a.stop()}}),a)})))()}}},m=s,u=(t("d412"),t("2877")),f=Object(u["a"])(m,n,r,!1,null,"1f17feb8",null);a["default"]=f.exports},"2d88":function(e,a,t){},d412:function(e,a,t){"use strict";t("2d88")}}]);
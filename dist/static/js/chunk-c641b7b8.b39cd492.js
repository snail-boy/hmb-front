(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c641b7b8"],{"28ff":function(e,a,t){"use strict";t.r(a);var o=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"company-wrapper"},[t("div",{staticClass:"content"},[e._m(0),t("div",[t("van-form",{ref:"companyForm",staticClass:"form-box",attrs:{"submit-on-enter":!1},nativeOn:{submit:function(a){return a.preventDefault(),e.onSubmit.apply(null,arguments)}}},[t("van-field",{attrs:{rules:[{required:!0}],label:"企业名称(全称)",name:"companyName",clearable:"",autocomplete:"off",placeholder:"请填写企业名称(全称)"},model:{value:e.form.companyName,callback:function(a){e.$set(e.form,"companyName",a)},expression:"form.companyName"}}),t("van-field",{attrs:{rules:[{required:!0}],label:"联系人姓名",name:"name",clearable:"",autocomplete:"off",placeholder:"请填写联系人姓名"},model:{value:e.form.name,callback:function(a){e.$set(e.form,"name",a)},expression:"form.name"}}),t("van-field",{attrs:{rules:[{required:!0}],label:"电话",name:"phoneNo",type:"tel",clearable:"",autocomplete:"off",placeholder:"请填写电话"},model:{value:e.form.phoneNo,callback:function(a){e.$set(e.form,"phoneNo",a)},expression:"form.phoneNo"}}),t("van-field",{attrs:{rules:[{required:!0,validator:e.validatorEmail,message:"请输入正确的电子邮件"}],label:"电子邮件",name:"email",type:"email",clearable:"",autocomplete:"off"},model:{value:e.form.email,callback:function(a){e.$set(e.form,"email",a)},expression:"form.email"}}),t("van-button",{staticClass:"now-btn",attrs:{"native-type":"submit",type:"info"}},[e._v("提交")])],1)],1)])])},n=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"title-text"},[e._v(" 青岛 "),t("span",{staticClass:"title-name"},[e._v('"琴岛e保"')]),e._v(" 支持企事业单位、机关团队、社会团体以团体形式统一参保，如有意团体参保的，可在下方填写信息，将有工作人员提供专业服务。 ")])}],l=t("365c"),r=t("60fe"),s=t("d399"),m={name:"Company",data(){return{form:{companyName:"",name:"",phoneNo:"",email:""}}},methods:{validatorEmail(e){return/^[a-zA-Z0-9._%+-]+@(?!.*\.\..*)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(e)},async onSubmit(){this.$refs.companyForm.validate().then(async e=>{const a=await Object(l["d"])(this.form);a.code===r["d"]&&(s["a"].success({message:"录入成功",forbidClick:!0}),this.form={})})}}},i=m,c=(t("d412"),t("2877")),f=Object(c["a"])(i,o,n,!1,null,"1f17feb8",null);a["default"]=f.exports},"2d88":function(e,a,t){},d412:function(e,a,t){"use strict";t("2d88")}}]);
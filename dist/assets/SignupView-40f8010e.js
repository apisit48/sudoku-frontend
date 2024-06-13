import{C as p,M as v,D as u,H as c,Q as e,m as s,F as n,W as m,R as x,S as g}from"./index-bc405bf9.js";import{a as b}from"./axios-4a70c6fc.js";import{_}from"./_plugin-vue_export-helper-c27b6911.js";import{V as y}from"./VForm-d51b7e3f.js";import{V as l}from"./VTextField-cc628634.js";import"./useRender-926a478b.js";import"./forwardRefs-0f8e8be0.js";import"./index-cd19c8ed.js";import"./loader-195af9a8.js";const h={data(){return{visible:!1,username:"",password:"",password_again:"",email:""}},methods:{router(){return p},submit(){if(this.password===this.password_again){if(this.$refs.form.validate()){let i=new FormData;i.append("username",this.username),i.append("password",this.password),i.append("email",this.email),b.post("/api/register",i).then(o=>{alert("Successfully registered!"),console.log(o.data),this.$router.push({path:"login"})}).catch(()=>{alert("Couldn't register")})}}else alert("Passwords don't match!")}}},d=i=>(x("data-v-793fe16d"),i=i(),g(),i),w={class:"login-root"},V={class:"box-root flex-flex flex-direction--column",style:{"min-height":"100vh","flex-grow":"1"}},k=m('<div class="loginbackground box-background--white padding-top--64" data-v-793fe16d><div class="loginbackground-gridContainer" data-v-793fe16d><div class="box-root flex-flex" style="grid-area:top / start / 8 / end;" data-v-793fe16d><div class="box-root" style="background-image:linear-gradient(white 0%, rgb(247, 250, 252) 33%);flex-grow:1;" data-v-793fe16d></div></div><div class="box-root flex-flex" style="grid-area:4 / 2 / auto / 5;" data-v-793fe16d><div class="box-root box-divider--light-all-2 animationLeftRight tans3s" style="flex-grow:1;" data-v-793fe16d></div></div><div class="box-root flex-flex" style="grid-area:6 / start / auto / 2;" data-v-793fe16d><div class="box-root box-background--blue800" style="flex-grow:1;" data-v-793fe16d></div></div><div class="box-root flex-flex" style="grid-area:7 / start / auto / 4;" data-v-793fe16d><div class="box-root box-background--blue animationLeftRight" style="flex-grow:1;" data-v-793fe16d></div></div><div class="box-root flex-flex" style="grid-area:8 / 4 / auto / 6;" data-v-793fe16d><div class="box-root box-background--gray100 animationLeftRight tans3s" style="flex-grow:1;" data-v-793fe16d></div></div><div class="box-root flex-flex" style="grid-area:2 / 15 / auto / end;" data-v-793fe16d><div class="box-root box-background--cyan200 animationRightLeft tans4s" style="flex-grow:1;" data-v-793fe16d></div></div><div class="box-root flex-flex" style="grid-area:3 / 14 / auto / end;" data-v-793fe16d><div class="box-root box-background--blue animationRightLeft" style="flex-grow:1;" data-v-793fe16d></div></div><div class="box-root flex-flex" style="grid-area:4 / 17 / auto / 20;" data-v-793fe16d><div class="box-root box-background--gray100 animationRightLeft tans4s" style="flex-grow:1;" data-v-793fe16d></div></div><div class="box-root flex-flex" style="grid-area:5 / 14 / auto / 17;" data-v-793fe16d><div class="box-root box-divider--light-all-2 animationRightLeft tans3s" style="flex-grow:1;" data-v-793fe16d></div></div></div></div>',1),S={class:"box-root padding-top--24 flex-flex flex-direction--column",style:{"flex-grow":"1","z-index":"9"}},C={class:"box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center"},R=d(()=>e("h3",null,"Sudoku Showdown",-1)),L={class:"formbg-outer"},I={class:"formbg"},U={class:"formbg-inner padding-horizontal--48"},P=d(()=>e("span",{class:"padding-bottom--15"},"Sign in to your account",-1)),F=d(()=>e("label",{for:""},"Username",-1)),z=d(()=>e("label",{for:""},"Password",-1)),B=d(()=>e("label",{for:""},"Confirm Password",-1)),D=d(()=>e("label",{for:""},"Email",-1)),E={class:"field padding-bottom--24"},N={class:"footer-link padding-top--24"},j=d(()=>e("h3",null,"Sign in",-1));function H(i,o,M,Q,t,r){const f=v("router-link");return u(),c("html",null,[e("body",null,[e("div",w,[e("div",V,[k,e("div",S,[e("div",C,[e("h1",null,[s(f,{to:"/"},{default:n(()=>[R]),_:1})])]),e("div",L,[e("div",I,[e("div",U,[P,s(y,{ref:"form","lazy-validation":""},{default:n(()=>[F,s(l,{placeholder:"Username",modelValue:t.username,"onUpdate:modelValue":o[0]||(o[0]=a=>t.username=a),type:"input",density:"compact",variant:"outlined"},null,8,["modelValue"]),z,s(l,{"append-inner-icon":t.visible?"mdi-eye-off":"mdi-eye",type:t.visible?"text":"password",modelValue:t.password,"onUpdate:modelValue":o[1]||(o[1]=a=>t.password=a),placeholder:"Password","onClick:appendInner":o[2]||(o[2]=a=>t.visible=!t.visible),density:"compact",variant:"outlined"},null,8,["append-inner-icon","type","modelValue"]),B,s(l,{"append-inner-icon":t.visible?"mdi-eye-off":"mdi-eye",type:t.visible?"text":"password",modelValue:t.password_again,"onUpdate:modelValue":o[3]||(o[3]=a=>t.password_again=a),placeholder:"Password","onClick:appendInner":o[4]||(o[4]=a=>t.visible=!t.visible),density:"compact",variant:"outlined"},null,8,["append-inner-icon","type","modelValue"]),D,s(l,{placeholder:"Email",modelValue:t.email,"onUpdate:modelValue":o[5]||(o[5]=a=>t.email=a),type:"input",density:"compact",variant:"outlined"},null,8,["modelValue"]),e("div",E,[e("input",{type:"submit",onClick:o[6]||(o[6]=(...a)=>r.submit&&r.submit(...a)),name:"submit",value:"Continue"})])]),_:1},512)])]),e("div",N,[e("span",null,[s(f,{to:"/login"},{default:n(()=>[j]),_:1})])])])])])])])])}const Y=_(h,[["render",H],["__scopeId","data-v-793fe16d"]]);export{Y as default};
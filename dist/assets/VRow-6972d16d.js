import"./VGrid-a65038e9.js";import{m as V}from"./useRender-926a478b.js";import{p as v,l as S,c as k,V as w,T as b,U as L}from"./index-bc405bf9.js";import{m as N}from"./loader-195af9a8.js";const l=["start","end","center"],g=["space-between","space-around","space-evenly"];function i(t,s){return b.reduce((e,a)=>{const n=t+L(a);return e[n]=s(),e},{})}const P=[...l,"baseline","stretch"],f=t=>P.includes(t),d=i("align",()=>({type:String,default:null,validator:f})),A=[...l,...g],y=t=>A.includes(t),m=i("justify",()=>({type:String,default:null,validator:y})),E=[...l,...g,"stretch"],p=t=>E.includes(t),C=i("alignContent",()=>({type:String,default:null,validator:p})),u={align:Object.keys(d),justify:Object.keys(m),alignContent:Object.keys(C)},h={align:"align",justify:"justify",alignContent:"align-content"};function T(t,s,e){let a=h[t];if(e!=null){if(s){const n=s.replace(t,"");a+=`-${n}`}return a+=`-${e}`,a.toLowerCase()}}const G=v({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:f},...d,justify:{type:String,default:null,validator:y},...m,alignContent:{type:String,default:null,validator:p},...C,...V(),...N()},"VRow"),O=S()({name:"VRow",props:G(),setup(t,s){let{slots:e}=s;const a=k(()=>{const n=[];let o;for(o in u)u[o].forEach(r=>{const j=t[r],c=T(o,r,j);c&&n.push(c)});return n.push({"v-row--no-gutters":t.noGutters,"v-row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),n});return()=>{var n;return w(t.tag,{class:["v-row",a.value,t.class],style:t.style},(n=e.default)==null?void 0:n.call(e))}}});export{O as V};

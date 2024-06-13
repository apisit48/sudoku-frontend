import{u as O,d as Y,i as $}from"./VGrid-a65038e9.js";import{m as T,u as P}from"./useRender-926a478b.js";import{p as R,l as k,u as j,m,x as A,I as H,A as q,s as _,c as y,r as G,B as J,ak as K,am as Q,w as b,g as X,t as Z,z as ee,d as x,o as le,Y as te}from"./index-bc405bf9.js";import{m as ae}from"./loader-195af9a8.js";import{d as ne}from"./VAvatar-c2a36682.js";const se=R({fluid:{type:Boolean,default:!1},...T(),...ae()},"VContainer"),he=k()({name:"VContainer",props:se(),setup(e,a){let{slots:c}=a;const{rtlClasses:s}=j();return P(()=>m(e.tag,{class:["v-container",{"v-container--fluid":e.fluid},s.value,e.class],style:e.style},c)),{}}});const oe=R({renderless:Boolean,...T()},"VVirtualScrollItem"),re=k()({name:"VVirtualScrollItem",inheritAttrs:!1,props:oe(),emits:{"update:height":e=>!0},setup(e,a){let{attrs:c,emit:s,slots:i}=a;const{resizeRef:n,contentRect:o}=O(void 0,"border");A(()=>{var r;return(r=o.value)==null?void 0:r.height},r=>{r!=null&&s("update:height",r)}),P(()=>{var r,v;return e.renderless?m(H,null,[(r=i.default)==null?void 0:r.call(i,{itemRef:n})]):m("div",q({ref:n,class:["v-virtual-scroll__item",e.class],style:e.style},c),[(v=i.default)==null?void 0:v.call(i)])})}}),D=-1,E=1,ue=R({itemHeight:{type:[Number,String],default:48}},"virtual");function ce(e,a,c){const s=_(0),i=_(e.itemHeight),n=y({get:()=>parseInt(i.value??0,10),set(l){i.value=l}}),o=G(),{resizeRef:r,contentRect:v}=O();J(()=>{r.value=o.value});const I=K(),h=new Map;let p=Array.from({length:a.value.length});const u=y(()=>{const l=(!v.value||o.value===document.documentElement?I.height.value:v.value.height)-((c==null?void 0:c.value)??0);return Math.ceil(l/n.value*1.7+1)});function g(l,t){n.value=Math.max(n.value,t),p[l]=t,h.set(a.value[l],t)}function f(l){return p.slice(0,l).reduce((t,d)=>t+(d||n.value),0)}function S(l){const t=a.value.length;let d=0,V=0;for(;V<l&&d<t;)V+=p[d++]||n.value;return d-1}let w=0;function N(){if(!o.value||!v.value)return;const l=v.value.height-56,t=o.value.scrollTop,d=t<w?D:E,V=S(t+l/2),B=Math.round(u.value/3),C=V-B,M=s.value+B*2-1;d===D&&V<=M?s.value=b(C,0,a.value.length):d===E&&V>=M&&(s.value=b(C,0,a.value.length-u.value)),w=t}function U(l){if(!o.value)return;const t=f(l);o.value.scrollTop=t}const z=y(()=>Math.min(a.value.length,s.value+u.value)),F=y(()=>a.value.slice(s.value,z.value).map((l,t)=>({raw:l,index:t+s.value}))),L=y(()=>f(s.value)),W=y(()=>f(a.value.length)-f(z.value));return A(()=>a.value.length,()=>{p=Q(a.value.length).map(()=>n.value),h.forEach((l,t)=>{const d=a.value.indexOf(t);d===-1?h.delete(t):p[d]=l})}),{containerRef:o,computedItems:F,itemHeight:n,paddingTop:L,paddingBottom:W,scrollToIndex:U,handleScroll:N,handleItemResize:g}}const ie=R({items:{type:Array,default:()=>[]},renderless:Boolean,...ue(),...T(),...Y()},"VVirtualScroll"),ge=k()({name:"VVirtualScroll",props:ie(),setup(e,a){let{slots:c}=a;const s=X("VVirtualScroll"),{dimensionStyles:i}=$(e),{containerRef:n,handleScroll:o,handleItemResize:r,scrollToIndex:v,paddingTop:I,paddingBottom:h,computedItems:p}=ce(e,Z(e,"items"));return ee(()=>e.renderless,()=>{le(()=>{var u;n.value=ne(s.vnode.el,!0),(u=n.value)==null||u.addEventListener("scroll",o)}),te(()=>{var u;(u=n.value)==null||u.removeEventListener("scroll",o)})}),P(()=>{const u=p.value.map(g=>m(re,{key:g.index,renderless:e.renderless,"onUpdate:height":f=>r(g.index,f)},{default:f=>{var S;return(S=c.default)==null?void 0:S.call(c,{item:g.raw,index:g.index,...f})}}));return e.renderless?m(H,null,[m("div",{class:"v-virtual-scroll__spacer",style:{paddingTop:x(I.value)}},null),u,m("div",{class:"v-virtual-scroll__spacer",style:{paddingBottom:x(h.value)}},null)]):m("div",{ref:n,class:["v-virtual-scroll",e.class],onScroll:o,style:[i.value,e.style]},[m("div",{class:"v-virtual-scroll__container",style:{paddingTop:x(I.value),paddingBottom:x(h.value)}},[u])])}),{scrollToIndex:v}}});export{he as V,ge as a};
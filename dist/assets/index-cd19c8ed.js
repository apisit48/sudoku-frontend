import{p as b,V as d,A as l,a8 as I,ap as _}from"./index-bc405bf9.js";const h=b({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),O=(e,n)=>{let{slots:s}=n;const{transition:t,disabled:o,...c}=e,{component:r=I,...i}=typeof t=="object"?t:{};return d(r,l(typeof t=="string"?{name:o?"":t}:i,c,{disabled:o}),s)};function g(e,n){if(!_)return;const s=n.modifiers||{},t=n.value,{handler:o,options:c}=typeof t=="object"?t:{handler:t,options:{}},r=new IntersectionObserver(function(){var f;let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],v=arguments.length>1?arguments[1]:void 0;const a=(f=e._observe)==null?void 0:f[n.instance.$.uid];if(!a)return;const u=i.some(p=>p.isIntersecting);o&&(!s.quiet||a.init)&&(!s.once||u||a.init)&&o(u,i,v),u&&s.once?m(e,n):a.init=!0},c);e._observe=Object(e._observe),e._observe[n.instance.$.uid]={init:!1,observer:r},r.observe(e)}function m(e,n){var t;const s=(t=e._observe)==null?void 0:t[n.instance.$.uid];s&&(s.observer.unobserve(e),delete e._observe[n.instance.$.uid])}const y={mounted:g,unmounted:m},P=y;export{P as I,O as M,h as m};

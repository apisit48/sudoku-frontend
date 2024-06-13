import{a as $}from"./axios-4a70c6fc.js";import{p as D,N as f,l as R,m as a,n as ee,q as ae,c as P,O as te,P as ne,C as I,D as se,H as le,F as l,I as ie,Q as n,G as de,K as ce,R as oe,S as re}from"./index-bc405bf9.js";import{_ as ue}from"./_plugin-vue_export-helper-c27b6911.js";import{V as A,a as me}from"./VVirtualScroll-db965f71.js";import{V as T}from"./VRow-6972d16d.js";import{V as w}from"./VCol-c8ac2002.js";import{V as _}from"./VCardActions-2d1468b4.js";import{c as C,a as L,V as ve}from"./VAvatar-c2a36682.js";import{m as j,u as F}from"./useRender-926a478b.js";import{c as H,d as he,e as fe,a as pe,m as ge,f as _e,g as ke,h as ye,b as be,L as Ve}from"./loader-195af9a8.js";import{V as k,m as Ce,d as Se,a as xe,e as Pe,f as Ie,g as Ae,R as Te,b as we,h as Le,i as Be,c as De,j as Re,k as je,l as Fe}from"./VGrid-a65038e9.js";import"./index-cd19c8ed.js";const He=C("v-card-subtitle"),y=C("v-card-title"),Me=D({appendAvatar:String,appendIcon:f,prependAvatar:String,prependIcon:f,subtitle:String,title:String,...j(),...H()},"VCardItem"),b=R()({name:"VCardItem",props:Me(),setup(e,c){let{slots:s}=c;return F(()=>{var m;const t=!!(e.prependAvatar||e.prependIcon),u=!!(t||s.prepend),i=!!(e.appendAvatar||e.appendIcon),d=!!(i||s.append),p=!!(e.title||s.title),g=!!(e.subtitle||s.subtitle);return a("div",{class:["v-card-item",e.class],style:e.style},[u&&a("div",{key:"prepend",class:"v-card-item__prepend"},[s.prepend?a(k,{key:"prepend-defaults",disabled:!t,defaults:{VAvatar:{density:e.density,icon:e.prependIcon,image:e.prependAvatar}}},s.prepend):t&&a(L,{key:"prepend-avatar",density:e.density,icon:e.prependIcon,image:e.prependAvatar},null)]),a("div",{class:"v-card-item__content"},[p&&a(y,{key:"title"},{default:()=>{var r;return[((r=s.title)==null?void 0:r.call(s))??e.title]}}),g&&a(He,{key:"subtitle"},{default:()=>{var r;return[((r=s.subtitle)==null?void 0:r.call(s))??e.subtitle]}}),(m=s.default)==null?void 0:m.call(s)]),d&&a("div",{key:"append",class:"v-card-item__append"},[s.append?a(k,{key:"append-defaults",disabled:!i,defaults:{VAvatar:{density:e.density,icon:e.appendIcon,image:e.appendAvatar}}},s.append):i&&a(L,{key:"append-avatar",density:e.density,icon:e.appendIcon,image:e.appendAvatar},null)])])}),{}}}),V=C("v-card-text"),Ne=D({appendAvatar:String,appendIcon:f,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:f,ripple:{type:[Boolean,Object],default:!0},subtitle:String,text:String,title:String,...Ce(),...j(),...H(),...Se(),...xe(),...he(),...fe(),...Pe(),...pe(),...Ie(),...ge(),...ee(),...Ae({variant:"elevated"})},"VCard"),B=R()({name:"VCard",directives:{Ripple:Te},props:Ne(),setup(e,c){let{attrs:s,slots:t}=c;const{themeClasses:u}=ae(e),{borderClasses:i}=we(e),{colorClasses:d,colorStyles:p,variantClasses:g}=Le(e),{densityClasses:m}=_e(e),{dimensionStyles:r}=Be(e),{elevationClasses:M}=De(e),{loaderClasses:N}=ke(e),{locationStyles:O}=ye(e),{positionClasses:E}=Re(e),{roundedClasses:W}=be(e),v=je(e,s),G=P(()=>e.link!==!1&&v.isLink.value),h=P(()=>!e.disabled&&e.link!==!1&&(e.link||v.isClickable.value));return F(()=>{const K=G.value?"a":e.tag,q=!!(t.title||e.title),J=!!(t.subtitle||e.subtitle),Q=q||J,z=!!(t.append||e.appendAvatar||e.appendIcon),U=!!(t.prepend||e.prependAvatar||e.prependIcon),X=!!(t.image||e.image),Y=Q||U||z,Z=!!(t.text||e.text);return te(a(K,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":h.value},u.value,i.value,d.value,m.value,M.value,N.value,E.value,W.value,g.value,e.class],style:[p.value,r.value,O.value,e.style],href:v.href.value,onClick:h.value&&v.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var S;return[X&&a("div",{key:"image",class:"v-card__image"},[t.image?a(k,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):a(ve,{key:"image-img",cover:!0,src:e.image},null)]),a(Ve,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:t.loader}),Y&&a(b,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:t.item,prepend:t.prepend,title:t.title,subtitle:t.subtitle,append:t.append}),Z&&a(V,{key:"text"},{default:()=>{var x;return[((x=t.text)==null?void 0:x.call(t))??e.text]}}),(S=t.default)==null?void 0:S.call(t),t.actions&&a(_,null,{default:t.actions}),Fe(h.value,"v-card")]}}),[[ne("ripple"),h.value&&e.ripple]])}),{}}}),Oe={methods:{redirectToPlay(){I.push({name:"Play"})},redirectToLeader(){I.push({path:"leaderboard"})},ranking(){$.get("/api/ranking").then(e=>{this.scoreboard=e.data}).catch(e=>{console.error(e)})}},data(){return{scoreboard:[]}},created(){this.ranking()}},o=e=>(oe("data-v-2550ca79"),e=e(),re(),e),Ee=o(()=>n("img",{src:"https://cdn-icons-png.flaticon.com/128/5732/5732078.png",style:{width:"100%",height:"100%"},alt:"Sudoku Showdown Logo"},null,-1)),We=o(()=>n("div",{class:"text-center"}," Welcome To Sudoku Showdown! ",-1)),Ge=o(()=>n("div",{class:"text-center"},[n("div",{class:"info"},[n("span",{class:"text-h6"},"Meet The Team:")]),n("p",{class:"team-member"},"Alexandre Simon 6380359"),n("p",{class:"team-member"},"Josh Perry 6380132"),n("p",{class:"team-member"},"Pattapon Songpetchmongkol 6380830"),n("p",{class:"team-member"},"Apisit Bawornsutthimontri 6180622"),n("p",{class:"team-member"},"Pornsun Srisuhk 6180230"),n("p",{class:"team-member"},"Geon Kim 6180019")],-1)),Ke=o(()=>n("div",{class:"text-center"},[n("div",{class:"info"},[n("span",{class:"text-h6"},"Click Play to begin.")])],-1)),qe=o(()=>n("img",{src:"https://cdn-icons-png.flaticon.com/256/5021/5021877.png",style:{width:"100%",height:"100%"},alt:"Sudoku Showdown Logo"},null,-1)),Je=o(()=>n("div",{class:"text-center"}," Who's on TOP in Sudoku Showdown? ",-1)),Qe={class:"text-center"},ze=o(()=>n("div",{class:"info"},[n("span",{class:"text-h6"},"Meet The Winners!:")],-1)),Ue=o(()=>n("div",{class:"text-center"},[n("div",{class:"info"},[n("span",{class:"text-h6"},"Click to See the Leaderboard.")])],-1));function Xe(e,c,s,t,u,i){return se(),le(ie,null,[a(A,null,{default:l(()=>[a(T,{align:"center",justify:"center",class:"my-12"},{default:l(()=>[a(w,{cols:"40",md:"30",lg:"40"},{default:l(()=>[a(B,{class:"elevation-24"},{default:l(()=>[a(b,{class:"center-content"},{default:l(()=>[Ee]),_:1}),a(y,{class:"text-h3",style:{"line-height":"1","max-width":"100%"}},{default:l(()=>[We]),_:1}),a(V,null,{default:l(()=>[Ge,Ke]),_:1}),a(_,{class:"justify-center"},{default:l(()=>[n("button",{class:"custom-button",onClick:c[0]||(c[0]=(...d)=>i.redirectToPlay&&i.redirectToPlay(...d))},"Play")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),a(A,null,{default:l(()=>[a(T,{align:"center",justify:"center",class:"my-12"},{default:l(()=>[a(w,{cols:"40",md:"30",lg:"40"},{default:l(()=>[a(B,{class:"elevation-24"},{default:l(()=>[a(b,{class:"center-content"},{default:l(()=>[qe]),_:1}),a(y,{class:"text-h3",style:{"line-height":"1","max-width":"100%"}},{default:l(()=>[Je]),_:1}),a(V,null,{default:l(()=>[n("div",Qe,[ze,a(me,{items:u.scoreboard,suvtitles:e.rank,height:"200",class:"text-center"},{default:l(({item:d})=>[de(ce(d.username),1)]),_:1},8,["items","suvtitles"])]),Ue]),_:1}),a(_,{class:"justify-center"},{default:l(()=>[n("button",{class:"custom-button",onClick:c[1]||(c[1]=(...d)=>i.redirectToLeader&&i.redirectToLeader(...d))},"Leaderboard")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})],64)}const oa=ue(Oe,[["render",Xe],["__scopeId","data-v-2550ca79"]]);export{oa as default};
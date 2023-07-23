var nt=Object.defineProperty;var it=(t,e,n)=>e in t?nt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var g=(t,e,n)=>(it(t,typeof e!="symbol"?e+"":e,n),n);import{n as E,r as b,c as L,h as S,i as j,p as K,q as st,v as rt,w as lt,x as at,y as V,z as ct,A as ot,B as ft}from"./scheduler.4f524d2e.js";const U=typeof window<"u";let O=U?()=>window.performance.now():()=>Date.now(),z=U?t=>requestAnimationFrame(t):E;const T=new Set;function X(t){T.forEach(e=>{e.c(t)||(T.delete(e),e.f())}),T.size!==0&&z(X)}function I(t){let e;return T.size===0&&z(X),{promise:new Promise(n=>{T.add(e={c:t,f:n})}),abort(){T.delete(e)}}}let R=!1;function ut(){R=!0}function _t(){R=!1}function dt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function ht(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const a=[];for(let c=0;c<e.length;c++){const _=e[c];_.claim_order!==void 0&&a.push(_)}e=a}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let a=0;a<e.length;a++){const c=e[a].claim_order,_=(s>0&&e[n[s]].claim_order<=c?s+1:dt(1,s,h=>e[n[h]].claim_order,c))-1;i[a]=n[_]+1;const f=_+1;n[f]=a,s=Math.max(f,s)}const o=[],r=[];let l=e.length-1;for(let a=n[s]+1;a!=0;a=i[a-1]){for(o.push(e[a-1]);l>=a;l--)r.push(e[l]);l--}for(;l>=0;l--)r.push(e[l]);o.reverse(),r.sort((a,c)=>a.claim_order-c.claim_order);for(let a=0,c=0;a<r.length;a++){for(;c<o.length&&r[a].claim_order>=o[c].claim_order;)c++;const _=c<o.length?o[c]:null;t.insertBefore(r[a],_)}}function mt(t,e){t.appendChild(e)}function Y(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function pt(t){const e=q("style");return e.textContent="/* empty */",yt(Y(t),e),e.sheet}function yt(t,e){return mt(t.head||t,e),e.sheet}function $t(t,e){if(R){for(ht(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function gt(t,e,n){t.insertBefore(e,n||null)}function xt(t,e,n){R&&!n?$t(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function C(t){t.parentNode&&t.parentNode.removeChild(t)}function Rt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function q(t){return document.createElement(t)}function vt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function G(t){return document.createTextNode(t)}function jt(){return G(" ")}function Ot(){return G("")}function zt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function It(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function qt(t){return t.dataset.svelteH}function Gt(t){let e;return{p(...n){e=n,e.forEach(i=>t.push(i))},r(){e.forEach(n=>t.splice(t.indexOf(n),1))}}}function wt(t){return Array.from(t.childNodes)}function Z(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function tt(t,e,n,i,s=!1){Z(t);const o=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(e(l)){const a=n(l);return a===void 0?t.splice(r,1):t[r]=a,s||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(e(l)){const a=n(l);return a===void 0?t.splice(r,1):t[r]=a,s?a===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function Et(t,e,n,i){return tt(t,s=>s.nodeName===e,s=>{const o=[];for(let r=0;r<s.attributes.length;r++){const l=s.attributes[r];n[l.name]||o.push(l.name)}o.forEach(r=>s.removeAttribute(r))},()=>i(e))}function Ft(t,e,n){return Et(t,e,n,q)}function Nt(t,e){return tt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>G(e),!0)}function Jt(t){return Nt(t," ")}function W(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return-1}function Kt(t,e){const n=W(t,"HTML_TAG_START",0),i=W(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new Q(e);Z(t);const s=t.splice(n,i-n+1);C(s[0]),C(s[s.length-1]);const o=s.slice(1,s.length-1);for(const r of o)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new Q(e,o)}function Vt(t,e){e=""+e,t.data!==e&&(t.data=e)}function Wt(t,e){t.value=e??""}function Qt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Ut(t,e,n){t.classList.toggle(e,!!n)}function Tt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}class bt{constructor(e=!1){g(this,"is_svg",!1);g(this,"e");g(this,"n");g(this,"t");g(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=vt(n.nodeName):this.e=q(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)gt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(C)}}class Q extends bt{constructor(n=!1,i){super(n);g(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)xt(this.t,this.n[i],n)}}function Xt(t,e){return new t(e)}const P=new Map;let B=0;function At(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function St(t,e){const n={stylesheet:pt(e),rules:{}};return P.set(t,n),n}function k(t,e,n,i,s,o,r,l=0){const a=16.666/i;let c=`{
`;for(let m=0;m<=1;m+=a){const y=e+(n-e)*o(m);c+=m*100+`%{${r(y,1-y)}}
`}const _=c+`100% {${r(n,1-n)}}
}`,f=`__svelte_${At(_)}_${l}`,h=Y(t),{stylesheet:p,rules:u}=P.get(h)||St(h,t);u[f]||(u[f]=!0,p.insertRule(`@keyframes ${f} ${_}`,p.cssRules.length));const d=t.style.animation||"";return t.style.animation=`${d?`${d}, `:""}${f} ${i}ms linear ${s}ms 1 both`,B+=1,f}function D(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?o=>o.indexOf(e)<0:o=>o.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),B-=s,B||Ct())}function Ct(){z(()=>{B||(P.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&C(e)}),P.clear())})}let A;function F(){return A||(A=Promise.resolve(),A.then(()=>{A=null})),A}function w(t,e,n){t.dispatchEvent(Tt(`${e?"intro":"outro"}${n}`))}const H=new Set;let $;function Yt(){$={r:0,c:[],p:$}}function Zt(){$.r||b($.c),$=$.p}function Lt(t,e){t&&t.i&&(H.delete(t),t.i(e))}function te(t,e,n,i){if(t&&t.o){if(H.has(t))return;H.add(t),$.c.push(()=>{H.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const J={duration:0};function ee(t,e,n){const i={direction:"in"};let s=e(t,n,i),o=!1,r,l,a=0;function c(){r&&D(t,r)}function _(){const{delay:h=0,duration:p=300,easing:u=j,tick:d=E,css:m}=s||J;m&&(r=k(t,0,1,p,h,u,m,a++)),d(0,1);const y=O()+h,x=y+p;l&&l.abort(),o=!0,S(()=>w(t,!0,"start")),l=I(v=>{if(o){if(v>=x)return d(1,0),w(t,!0,"end"),c(),o=!1;if(v>=y){const N=u((v-y)/p);d(N,1-N)}}return o})}let f=!1;return{start(){f||(f=!0,D(t),L(s)?(s=s(i),F().then(_)):_())},invalidate(){f=!1},end(){o&&(c(),o=!1)}}}function ne(t,e,n){const i={direction:"out"};let s=e(t,n,i),o=!0,r;const l=$;l.r+=1;let a;function c(){const{delay:_=0,duration:f=300,easing:h=j,tick:p=E,css:u}=s||J;u&&(r=k(t,1,0,f,_,h,u));const d=O()+_,m=d+f;S(()=>w(t,!1,"start")),"inert"in t&&(a=t.inert,t.inert=!0),I(y=>{if(o){if(y>=m)return p(0,1),w(t,!1,"end"),--l.r||b(l.c),!1;if(y>=d){const x=h((y-d)/f);p(1-x,x)}}return o})}return L(s)?F().then(()=>{s=s(i),c()}):c(),{end(_){_&&"inert"in t&&(t.inert=a),_&&s.tick&&s.tick(1,0),o&&(r&&D(t,r),o=!1)}}}function ie(t,e,n,i){let o=e(t,n,{direction:"both"}),r=i?0:1,l=null,a=null,c=null,_;function f(){c&&D(t,c)}function h(u,d){const m=u.b-r;return d*=Math.abs(m),{a:r,b:u.b,d:m,duration:d,start:u.start,end:u.start+d,group:u.group}}function p(u){const{delay:d=0,duration:m=300,easing:y=j,tick:x=E,css:v}=o||J,N={start:O()+d,b:u};u||(N.group=$,$.r+=1),"inert"in t&&(u?_!==void 0&&(t.inert=_):(_=t.inert,t.inert=!0)),l||a?a=N:(v&&(f(),c=k(t,r,u,m,d,y,v)),u&&x(0,1),l=h(N,m),S(()=>w(t,u,"start")),I(M=>{if(a&&M>a.start&&(l=h(a,m),a=null,w(t,l.b,"start"),v&&(f(),c=k(t,r,l.b,l.duration,0,y,o.css))),l){if(M>=l.end)x(r=l.b,1-r),w(t,l.b,"end"),a||(l.b?f():--l.group.r||b(l.group.c)),l=null;else if(M>=l.start){const et=M-l.start;r=l.a+l.d*y(et/l.duration),x(r,1-r)}}return!!(l||a)}))}return{run(u){L(o)?F().then(()=>{o=o({direction:u?"in":"out"}),p(u)}):p(u)},end(){f(),l=a=null}}}function se(t){t&&t.c()}function re(t,e){t&&t.l(e)}function Mt(t,e,n){const{fragment:i,after_update:s}=t.$$;i&&i.m(e,n),S(()=>{const o=t.$$.on_mount.map(ct).filter(L);t.$$.on_destroy?t.$$.on_destroy.push(...o):b(o),t.$$.on_mount=[]}),s.forEach(S)}function Ht(t,e){const n=t.$$;n.fragment!==null&&(lt(n.after_update),b(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Pt(t,e){t.$$.dirty[0]===-1&&(ot.push(t),ft(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function le(t,e,n,i,s,o,r,l=[-1]){const a=at;V(t);const c=t.$$={fragment:null,ctx:[],props:o,update:E,not_equal:s,bound:K(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(a?a.$$.context:[])),callbacks:K(),dirty:l,skip_bound:!1,root:e.target||a.$$.root};r&&r(c.root);let _=!1;if(c.ctx=n?n(t,e.props||{},(f,h,...p)=>{const u=p.length?p[0]:h;return c.ctx&&s(c.ctx[f],c.ctx[f]=u)&&(!c.skip_bound&&c.bound[f]&&c.bound[f](u),_&&Pt(t,f)),h}):[],c.update(),_=!0,b(c.before_update),c.fragment=i?i(c.ctx):!1,e.target){if(e.hydrate){ut();const f=wt(e.target);c.fragment&&c.fragment.l(f),f.forEach(C)}else c.fragment&&c.fragment.c();e.intro&&Lt(t.$$.fragment),Mt(t,e.target,e.anchor),_t(),st()}V(a)}class ae{constructor(){g(this,"$$");g(this,"$$set")}$destroy(){Ht(this,1),this.$destroy=E}$on(e,n){if(!L(n))return E;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!rt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Bt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Bt);export{D as A,Ut as B,$t as C,zt as D,Kt as E,ee as F,ne as G,Q as H,Rt as I,Gt as J,Wt as K,qt as L,ie as M,ae as S,xt as a,Zt as b,Jt as c,Lt as d,Ot as e,C as f,q as g,Ft as h,le as i,wt as j,It as k,Qt as l,G as m,Nt as n,Vt as o,Yt as p,Xt as q,se as r,jt as s,te as t,re as u,Mt as v,Ht as w,O as x,I as y,k as z};

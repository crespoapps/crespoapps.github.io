(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[516],{9600:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tools/time-in-seconds",function(){return t(8048)}])},8048:function(n,e,t){"use strict";t.r(e);var r=t(5893),o=t(7294),u=t(7357),i=t(6886),s=t(3946),c=t(2008),l=t(3011),a=t(1899);function d(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function f(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})))),r.forEach((function(e){d(n,e,t[e])}))}return n}function h(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=[],r=!0,o=!1,u=void 0;try{for(var i,s=n[Symbol.iterator]();!(r=(i=s.next()).done)&&(t.push(i.value),!e||t.length!==e);r=!0);}catch(c){o=!0,u=c}finally{try{r||null==s.return||s.return()}finally{if(o)throw u}}return t}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var p={hours:"",minutes:"",seconds:"",total:""},m=function(n){return n?parseInt(n):0};e.default=function(){var n=h(o.useState(f({},p)),2),e=n[0],t=n[1],x=function(n){return function(r){var o=f({},e,d({},n,r.target.value));o.total=function(n){var e=n.hours,t=n.minutes,r=n.seconds;return 3600*m(e)+60*m(t)+m(r)+""}(o),t(o)}};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(l.Z,{children:[(0,r.jsxs)(i.ZP,{container:!0,spacing:2,children:[(0,r.jsx)(i.ZP,{item:!0,xs:4,md:4,children:(0,r.jsx)(c.Z,{label:"Hours",value:e.hours,placeholder:e.hours,inputProps:{inputMode:"numeric",pattern:"[0-9]*"},onChange:x("hours")})}),(0,r.jsx)(i.ZP,{item:!0,xs:4,md:4,children:(0,r.jsx)(c.Z,{label:"Minutes",value:e.minutes,placeholder:e.minutes,inputProps:{inputMode:"numeric",pattern:"[0-9]*"},onChange:x("minutes")})}),(0,r.jsx)(i.ZP,{item:!0,xs:4,md:4,children:(0,r.jsx)(c.Z,{label:"Seconds",value:e.seconds,placeholder:e.seconds,inputProps:{inputMode:"numeric",pattern:"[0-9]*"},onChange:x("seconds")})})]}),(0,r.jsx)("h1",{style:{fontSize:"25vw",lineHeight:0,textAlign:"center"},children:e.total}),(0,r.jsx)(u.Z,{sx:{mx:"auto",textAlign:"center"},children:(0,r.jsx)(s.Z,{onClick:function(){return function(){var n=document.getElementById("total");n.select(),n.setSelectionRange(0,99999),document.execCommand("copy")}()},children:(0,r.jsx)(a.Z,{fontSize:"inherit"})})})]}),(0,r.jsx)(c.Z,{id:"total",value:e.total,InputProps:{readOnly:!0}})]})}}},function(n){n.O(0,[14,912,11,774,888,179],(function(){return e=9600,n(n.s=e);var e}));var e=n.O();_N_E=e}]);
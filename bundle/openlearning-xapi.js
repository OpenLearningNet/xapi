(()=>{"use strict";var e,t={214:function(e,t,i){var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))((function(r,o){function a(e){try{c(n.next(e))}catch(e){o(e)}}function s(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.initCmi5=void 0;const r=i(993),o=i(114);t.initCmi5=()=>n(void 0,void 0,void 0,(function*(){const e=new URLSearchParams(window.location.search),t=e.get("endpoint"),i=e.get("fetch"),n=e.get("actor"),a=JSON.parse(n||"{}"),s=e.get("activityId"),c=e.get("registration")||void 0;if(!t||!i||!s)throw new Error("Invalid query parameters for cmi5 init");const d=yield fetch(i,{method:"POST",credentials:"include",mode:"cors"}),u=yield d.json();if(!u["auth-token"])throw new Error("No auth-token in fetch");const l=u["auth-token"],m=new r.Lrs({endpoint:t,auth:l||""}),p={lrs:m,actor:a,activityId:s,registration:c,initTimeSeconds:Date.now()/1e3,isCmi5:!0},v=yield m.retrieveActivityState(s,"LMS.LaunchData",p.actor,c);return p.launchData=yield v.json(),yield m.sendStatement((0,o.buildCmi5Statement)(p,"initialized")),p}))},114:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sendTerminated=t.sendFailed=t.sendPassed=t.sendCompleted=t.getDuration=t.buildCmi5Statement=void 0;const i=(e,t,i)=>e.some((e=>e[t]===i));t.buildCmi5Statement=(e,t,n)=>{var r,o,a,s;const c=null===(r=e.launchData)||void 0===r?void 0:r.contextTemplate,d=[...(null===(o=null==c?void 0:c.contextActivities)||void 0===o?void 0:o.category)||[]];i(d,"id","https://w3id.org/xapi/cmi5/context/categories/cmi5")||d.push({id:"https://w3id.org/xapi/cmi5/context/categories/cmi5",objectType:"Activity"});const u=[...(null===(a=null==c?void 0:c.contextActivities)||void 0===a?void 0:a.grouping)||[]];!n||void 0===n.success&&void 0===n.completion||i(u,"id","https://w3id.org/xapi/cmi5/context/categories/moveon")||d.push({id:"https://w3id.org/xapi/cmi5/context/categories/moveon",objectType:"Activity"});const l=Object.assign({},(null==c?void 0:c.contextActivities)||{});l.category=d,l.grouping=u;const m=Object.assign({},(null==c?void 0:c.extensions)||{}),p=null===(s=e.launchData)||void 0===s?void 0:s.masteryScore;void 0===p||"passed"!==t&&"failed"!==t||(m["https://w3id.org/xapi/cmi5/context/extensions/masteryscore"]=p);const v=Object.assign({},c);v.registration=e.registration||void 0,v.contextActivities=l,v.extensions=m;const h={actor:e.actor,object:{id:e.activityId,objectType:"Activity"},context:v,verb:{id:"http://adlnet.gov/expapi/verbs/"+t,display:{"en-US":t}}};return n&&(h.result=n),h};const n=(e,t)=>e?e.lrs.sendStatement(t):Promise.reject({error:"No LRS configured in the URL.",xhr:null});t.getDuration=e=>{if(e.initTimeSeconds)return"PT"+(Date.now()/1e3-e.initTimeSeconds).toFixed(2)+"S"},t.sendCompleted=e=>n(e,(0,t.buildCmi5Statement)(e,"completed",{completion:!0,duration:(0,t.getDuration)(e)})),t.sendPassed=(e,i)=>n(e,(0,t.buildCmi5Statement)(e,"passed",{score:i,success:!0,duration:(0,t.getDuration)(e)})),t.sendFailed=(e,i)=>n(e,(0,t.buildCmi5Statement)(e,"failed",{score:i,success:!1,duration:(0,t.getDuration)(e)})),t.sendTerminated=e=>n(e,(0,t.buildCmi5Statement)(e,"terminated",{duration:(0,t.getDuration)(e)}))},607:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.retrieveActivityState=t.saveActivityState=t.getDuration=t.sendTerminated=t.sendFailed=t.sendPassed=t.sendCompleted=t.initTinCan=t.initCmi5=t.sendTinCanScored=t.sendTinCanCompleted=t.sendAttachments=void 0;var n=i(86);Object.defineProperty(t,"sendAttachments",{enumerable:!0,get:function(){return n.sendAttachments}});var r=i(347);Object.defineProperty(t,"sendTinCanCompleted",{enumerable:!0,get:function(){return r.sendTinCanCompleted}}),Object.defineProperty(t,"sendTinCanScored",{enumerable:!0,get:function(){return r.sendTinCanScored}});var o=i(214);Object.defineProperty(t,"initCmi5",{enumerable:!0,get:function(){return o.initCmi5}});var a=i(387);Object.defineProperty(t,"initTinCan",{enumerable:!0,get:function(){return a.initTinCan}});var s=i(114);Object.defineProperty(t,"sendCompleted",{enumerable:!0,get:function(){return s.sendCompleted}}),Object.defineProperty(t,"sendPassed",{enumerable:!0,get:function(){return s.sendPassed}}),Object.defineProperty(t,"sendFailed",{enumerable:!0,get:function(){return s.sendFailed}}),Object.defineProperty(t,"sendTerminated",{enumerable:!0,get:function(){return s.sendTerminated}}),Object.defineProperty(t,"getDuration",{enumerable:!0,get:function(){return s.getDuration}});var c=i(192);Object.defineProperty(t,"saveActivityState",{enumerable:!0,get:function(){return c.saveActivityState}}),Object.defineProperty(t,"retrieveActivityState",{enumerable:!0,get:function(){return c.retrieveActivityState}})},86:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sendAttachments=t.buildStatement=t.convertMediaToAttachment=void 0,t.convertMediaToAttachment=({contentType:e,fileUrl:t,display:i,description:n})=>("string"==typeof i&&(i={"en-US":i}),"string"==typeof n&&(n={"en-US":n}),{contentType:e,usageType:"http://id.tincanapi.com/attachment/supporting_media",display:i,description:n,fileUrl:t}),t.buildStatement=(e,t,i)=>({actor:e.actor,object:{id:e.activityId,objectType:"Activity"},context:{registration:e.registration},verb:{id:"https://xapi.openlearning.com/verbs/"+i,display:{"en-US":i}},attachments:t}),t.sendAttachments=(e,i,n="published",r)=>{if(!e)return Promise.reject({error:"No LRS configured in the URL.",xhr:null});const o=i.map(t.convertMediaToAttachment);r&&o.unshift({contentType:"image/png",usageType:"https://xapi.openlearning.com/attachment/thumbnail",fileUrl:r,display:{"en-US":"Thumbnail Image"},description:{"en-US":"Thumbnail Image"}});const a=e.lrs,s=(0,t.buildStatement)(e,o,n);return a.sendStatement(s)}},192:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.retrieveActivityState=t.saveActivityState=void 0,t.saveActivityState=(e,t,i)=>e?e.lrs.saveActivityState(e.activityId,t,e.actor,i,e.registration).then((e=>200===e.status)):Promise.reject({error:"No LRS configured in the URL.",xhr:null}),t.retrieveActivityState=(e,t,i)=>e?e.lrs.retrieveActivityState(e.activityId,t,e.actor,e.registration).then((e=>void 0!==i&&404===e.status?Promise.resolve(i):200!==e.status?Promise.reject(e):e.json())):Promise.reject({error:"No LRS configured in the URL.",xhr:null})},387:function(e,t,i){var n=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))((function(r,o){function a(e){try{c(n.next(e))}catch(e){o(e)}}function s(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.initTinCan=void 0;const r=i(993);t.initTinCan=()=>n(void 0,void 0,void 0,(function*(){const e=new URLSearchParams(window.location.search),t=e.get("endpoint"),i=e.get("auth"),n=e.get("actor"),o=JSON.parse(n||"{}"),a=e.get("activity_id"),s=e.get("registration")||void 0;if(!t||!a)throw new Error("Invalid query parameters for Tin Can init");return{lrs:new r.Lrs({endpoint:t,auth:i||""}),actor:o,activityId:a,registration:s,isCmi5:!1}}))},347:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sendTinCanCompleted=t.sendTinCanScored=void 0;const i="http://adlnet.gov/expapi/verbs/";t.sendTinCanScored=(e,t)=>{if(!e)return Promise.reject({error:"No LRS configured in the URL.",xhr:null});if(e.isCmi5)throw new Error("Incompatible statement with cmi5 profile");const n=e.lrs,r=((e,t,n)=>{const r={};return n&&(r.score=n),{actor:e.actor,object:{id:e.activityId,objectType:"Activity"},context:{registration:e.registration},verb:{id:i+t,display:{"en-US":t}},result:r}})(e,"scored",t);return n.sendStatement(r)},t.sendTinCanCompleted=(e,t)=>{if(!e)return Promise.reject({error:"No LRS configured in the URL.",xhr:null});if(e.isCmi5)throw new Error("Incompatible statement with cmi5 profile");const n=e.lrs,r=((e,t)=>{const n={};return t&&(n["https://xapi.openlearning.com/extensions/submission-data"]=t),{actor:e.actor,object:{id:e.activityId,objectType:"Activity"},context:{registration:e.registration},verb:{id:i+"completed",display:{"de-DE":"beendete","en-US":"completed","fr-FR":"a terminé","es-ES":"completó"}},result:{completion:!0,extensions:n}}})(e,t);return n.sendStatement(r)}},993:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Lrs=t.VERSION=void 0,t.VERSION="1.0.2",t.Lrs=class{constructor(e){this.endpoint=e.endpoint,"/"!==this.endpoint.slice(-1)&&(this.endpoint+="/"),this.auth=e.auth}sendStatement(e){const i=this.endpoint+"statements",n=new Headers;return n.set("Content-Type","application/json"),n.set("Authorization",this.auth),n.set("X-Experience-API-Version",t.VERSION),e.timestamp=(new Date).toISOString(),fetch(i,{method:"PUT",headers:n,credentials:"include",mode:"cors",body:JSON.stringify(e)})}saveActivityState(e,i,n,r,o){const a=new URL(this.endpoint+"activities/state");a.searchParams.set("activityId",e),a.searchParams.set("stateId",i),a.searchParams.set("agent",JSON.stringify(n)),o&&a.searchParams.set("registration",o);const s=new Headers;return s.set("Content-Type","application/json"),s.set("Authorization",this.auth),s.set("X-Experience-API-Version",t.VERSION),fetch(a.toString(),{method:"PUT",headers:s,credentials:"include",mode:"cors",body:JSON.stringify(r)})}retrieveActivityState(e,i,n,r){const o=new URL(this.endpoint+"activities/state");o.searchParams.set("activityId",e),o.searchParams.set("stateId",i),o.searchParams.set("agent",JSON.stringify(n)),r&&o.searchParams.set("registration",r);const a=new Headers;return a.set("Authorization",this.auth),a.set("X-Experience-API-Version",t.VERSION),fetch(o.toString(),{method:"GET",headers:a,credentials:"include",mode:"cors"})}}}},i={};e=function e(n){var r=i[n];if(void 0!==r)return r.exports;var o=i[n]={exports:{}};return t[n].call(o.exports,o,o.exports,e),o.exports}(607),window.xApi=e})();
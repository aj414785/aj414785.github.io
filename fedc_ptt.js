!function(){"use strict";var t={};Object.defineProperty(t,"__esModule",{value:!0});var e,r,t=t.default=class{constructor(t,e={}){this.option=t,this.hooks=e,this.datas=[],this.timer=null,this.config={},this.option=Object.assign({maxLength:100,delay:1e3,required:[]},this.option),this.setDelay(this.option.delay)}setDelay(t){if(clearTimeout(this.timer),0===t)this.report(),this.timer=null;else{const e=()=>{this.report(),this.timer=setTimeout(e,t)};this.timer=setTimeout(e,t)}}setMaxLengthen(t){this.option.maxLength=t}setConfig(t){this.config=Object.assign(Object.assign({},this.config),t),this.option.required.forEach(t=>{if(!this.config[t])throw new Error(t+" is required")})}send(...e){var t=e.slice(-1)[0];let r=!1;"boolean"==typeof t&&(r=t,e.pop());var o,n=["category","type","desc"];const i={};let s=[];for(let t=0;t<e.length;t++){var a=e[t];if("string"!=typeof a){if(Array.isArray(a)){s=s.concat(a.map(t=>Object.assign(Object.assign({},i),t)));break}(null==(o=a)?void 0:o.constructor)===Object&&"boolean"!=typeof a&&s.push(Object.assign(Object.assign({},i),a));break}i[n[t]]=a}0==s.length&&0<Object.keys(i).length&&s.push(i);t=s.map(t=>Object.assign(Object.assign({},this.config),t));this.datas=this.datas.concat(t),!r&&0!=this.option.delay||this.report()}getSendData(){return this.datas.splice(0,this.option.maxLength).filter(t=>"function"!=typeof this.hooks.onBeforeSend||!0===this.hooks.onBeforeSend.call(this,t)).map(t=>{"function"==typeof this.hooks.onSend&&this.hooks.onSend.call(this,t);var e,r,o=[];for([e,r]of Object.entries(t))r&&o.push(e+"="+encodeURIComponent(r));return o.join("&")})}report(){for(var{attaID:t,token:e}=this.option;0<this.datas.length;){var r=this.getSendData();r.length&&this.reportAdapter({url:"https://h.trace.qq.com/kv",method:"POST",data:{attaid:t,token:e,type:"batch",version:"v1.0.0",datas:r},header:{"Atta-Type":"batch-report"}})}}},a="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||void 0!==a&&a,o="URLSearchParams"in a,n="Symbol"in a&&"iterator"in Symbol,h="FileReader"in a&&"Blob"in a&&function(){try{return new Blob,!0}catch(t){return!1}}(),i="FormData"in a,d="ArrayBuffer"in a;function s(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t)||""===t)throw new TypeError('Invalid character in header field name: "'+t+'"');return t.toLowerCase()}function c(t){return t="string"!=typeof t?String(t):t}function u(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return n&&(t[Symbol.iterator]=function(){return t}),t}function f(e){this.map={},e instanceof f?e.forEach(function(t,e){this.append(e,t)},this):Array.isArray(e)?e.forEach(function(t){this.append(t[0],t[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function l(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function p(r){return new Promise(function(t,e){r.onload=function(){t(r.result)},r.onerror=function(){e(r.error)}})}function y(t){var e=new FileReader,r=p(e);return e.readAsArrayBuffer(t),r}function g(t){var e;return t.slice?t.slice(0):((e=new Uint8Array(t.byteLength)).set(new Uint8Array(t)),e.buffer)}function b(){return this.bodyUsed=!1,this._initBody=function(t){var e;this.bodyUsed=this.bodyUsed,(this._bodyInit=t)?"string"==typeof t?this._bodyText=t:h&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:i&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:o&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():d&&h&&(e=t)&&DataView.prototype.isPrototypeOf(e)?(this._bodyArrayBuffer=g(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):d&&(ArrayBuffer.prototype.isPrototypeOf(t)||r(t))?this._bodyArrayBuffer=g(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):o&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},h&&(this.blob=function(){var t=l(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?l(this)||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer)):this.blob().then(y)}),this.text=function(){var t,e,r=l(this);if(r)return r;if(this._bodyBlob)return r=this._bodyBlob,t=new FileReader,e=p(t),t.readAsText(r),e;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},i&&(this.formData=function(){return this.text().then(v)}),this.json=function(){return this.text().then(JSON.parse)},this}d&&(e=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],r=ArrayBuffer.isView||function(t){return t&&-1<e.indexOf(Object.prototype.toString.call(t))}),f.prototype.append=function(t,e){t=s(t),e=c(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},f.prototype.delete=function(t){delete this.map[s(t)]},f.prototype.get=function(t){return t=s(t),this.has(t)?this.map[t]:null},f.prototype.has=function(t){return this.map.hasOwnProperty(s(t))},f.prototype.set=function(t,e){this.map[s(t)]=c(e)},f.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},f.prototype.keys=function(){var r=[];return this.forEach(function(t,e){r.push(e)}),u(r)},f.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),u(e)},f.prototype.entries=function(){var r=[];return this.forEach(function(t,e){r.push([e,t])}),u(r)},n&&(f.prototype[Symbol.iterator]=f.prototype.entries);var m=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function w(t,e){if(!(this instanceof w))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var r,o=(e=e||{}).body;if(t instanceof w){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new f(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,o||null==t._bodyInit||(o=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new f(e.headers)),this.method=(t=e.method||this.method||"GET",r=t.toUpperCase(),-1<m.indexOf(r)?r:t),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o),"GET"!==this.method&&"HEAD"!==this.method||"no-store"!==e.cache&&"no-cache"!==e.cache||((r=/([?&])_=[^&]*/).test(this.url)?this.url=this.url.replace(r,"$1_="+(new Date).getTime()):this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime())}function v(t){var r=new FormData;return t.trim().split("&").forEach(function(t){var e;t&&(e=(t=t.split("=")).shift().replace(/\+/g," "),t=t.join("=").replace(/\+/g," "),r.append(decodeURIComponent(e),decodeURIComponent(t)))}),r}function T(t,e){if(!(this instanceof T))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');e=e||{},this.type="default",this.status=void 0===e.status?200:e.status,this.ok=200<=this.status&&this.status<300,this.statusText=void 0===e.statusText?"":""+e.statusText,this.headers=new f(e.headers),this.url=e.url||"",this._initBody(t)}w.prototype.clone=function(){return new w(this,{body:this._bodyInit})},b.call(w.prototype),b.call(T.prototype),T.prototype.clone=function(){return new T(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new f(this.headers),url:this.url})},T.error=function(){var t=new T(null,{status:0,statusText:""});return t.type="error",t};var A=[301,302,303,307,308],_=(T.redirect=function(t,e){if(-1===A.indexOf(e))throw new RangeError("Invalid status code");return new T(null,{status:e,headers:{location:t}})},a.DOMException);try{new _}catch(t){(_=function(t,e){this.message=t,this.name=e;e=Error(t);this.stack=e.stack}).prototype=Object.create(Error.prototype),_.prototype.constructor=_}function O(o,s){return new Promise(function(n,t){var e=new w(o,s);if(e.signal&&e.signal.aborted)return t(new _("Aborted","AbortError"));var i=new XMLHttpRequest;function r(){i.abort()}i.onload=function(){var t,r,e={status:i.status,statusText:i.statusText,headers:(t=i.getAllResponseHeaders()||"",r=new f,t.replace(/\r?\n[\t ]+/g," ").split("\r").map(function(t){return 0===t.indexOf("\n")?t.substr(1,t.length):t}).forEach(function(t){var t=t.split(":"),e=t.shift().trim();e&&(t=t.join(":").trim(),r.append(e,t))}),r)},o=(e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL"),"response"in i?i.response:i.responseText);setTimeout(function(){n(new T(o,e))},0)},i.onerror=function(){setTimeout(function(){t(new TypeError("Network request failed"))},0)},i.ontimeout=function(){setTimeout(function(){t(new TypeError("Network request failed"))},0)},i.onabort=function(){setTimeout(function(){t(new _("Aborted","AbortError"))},0)},i.open(e.method,function(e){try{return""===e&&a.location.href?a.location.href:e}catch(t){return e}}(e.url),!0),"include"===e.credentials?i.withCredentials=!0:"omit"===e.credentials&&(i.withCredentials=!1),"responseType"in i&&(h?i.responseType="blob":d&&e.headers.get("Content-Type")&&-1!==e.headers.get("Content-Type").indexOf("application/octet-stream")&&(i.responseType="arraybuffer")),!s||"object"!=typeof s.headers||s.headers instanceof f?e.headers.forEach(function(t,e){i.setRequestHeader(e,t)}):Object.getOwnPropertyNames(s.headers).forEach(function(t){i.setRequestHeader(t,c(s.headers[t]))}),e.signal&&(e.signal.addEventListener("abort",r),i.onreadystatechange=function(){4===i.readyState&&e.signal.removeEventListener("abort",r)}),i.send(void 0===e._bodyInit?null:e._bodyInit)})}O.polyfill=!0,a.fetch||(a.fetch=O,a.Headers=f,a.Request=w,a.Response=T);const E=function(t=navigator.userAgent){var e;for(e of[{name:"helper",regex:/gamehelper|lolapp/i},{name:"ingame",regex:/msdk|15d60|16A366|tiem|ingame/i,additionalCondition:()=>!!window.pandora},{name:"wechat",regex:/MicroMessenger/i},{name:"qq",regex:/QQ\//i},{name:"weibo",regex:/Weibo/i},{name:"qzone",regex:/qzone/i},{name:"yyb",regex:/yyb_version/i},{name:"qqnews",regex:/qqnews/i},{name:"othermobile",regex:/iphone|ipad|ipod|ios|android/i,additionalCondition:()=>/macintosh/i.test(t)&&navigator.maxTouchPoints&&2<navigator.maxTouchPoints&&void 0!==navigator.standalone}])if(e.regex.test(t)||e.additionalCondition&&e.additionalCondition())return e.name;return"pc"}();class S{constructor(t=location.href){this.a=document.createElement("a"),this.a.href=t}getHostname(){return this.a.hostname}getQuery(t){t=t.replace(/[\[\]]/g,"\\$&");t=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)").exec(this.a.href);return t?t[2]?decodeURIComponent(t[2].replace(/\+/g," ")):"":null}getOptions(){var{hostname:t,pathname:e,search:r}=this.a;let o=this.getQuery("ADTAG")||this.getQuery("adtag");var n=this.getQuery("media");return n&&/^\d+$/.test(n)&&(o="media_"+n),{domain:t,path:e,query:r.slice(1),adtag:o,refer:new S(document.referrer).getHostname(),ua:navigator.userAgent,platform:E}}}const x=()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)+(new Date).getTime().toString(16);class j extends t{constructor(t,e={}){var{onBeforeSend:e,onSend:r,attrName:o}=Object.assign({attrName:"fedc"},e);super({attaID:"00400074108",token:"9283316245",required:["gid","aid","domain","acttype"]},{onBeforeSend:e,onSend:r}),this.startTime=Date.now(),window.onbeforeunload=()=>{this.send("staytime",(Date.now()-this.startTime).toString(),!0)},this.init(t),function(i="fedc",s=document.documentElement){s.addEventListener("click",t=>{let e=t.target;for(;e!==s;){var r,o,n=null===e||void 0===e?void 0:e.dataset[i];n&&([n,r,o]=n.split("|"),this.send(n,r,o)),e=e.parentNode}},!0)}.call(this,o)}init(t={}){console.log("FEDC Initialized"),this.setConfig(((e={})=>{e=Object.assign(Object.assign({},(new S).getOptions()),e);if(!e.uid){var r="fedc_uid";let t=localStorage.getItem(r);t&&"null"!==t||(t=x(),localStorage.setItem(r,t)),e.uid=t}if(!e.csid){r="fedc-csid";let t=sessionStorage.getItem(r);t&&"null"!==t||(t="csid"+x(),sessionStorage.setItem(r,t)),e.csid=t}return e})(t));t=JSON.stringify((()=>{var{width:t,height:e}=screen;return{width:t,height:e}})());this.send({category:"pageview",extra:t},!0)}setAppUser(t){return this.setConfig({openid:t}),this.send({category:"appuser"},!0),this}setGameUser(t,e){return this.setConfig({gopenid:t,roleid:e}),this.send({category:"gameuser"},!0),this}reportAdapter(t){fetch(t.url,{keepalive:!0,body:JSON.stringify(t.data),method:"POST",headers:t.header})}}let B=!1,P=[],D=(window.__ENABLE_FEDC_LOG=()=>{for(;P.length;){var{str:t,option:e}=P.shift();console.info(t,e)}B=!0},window.__DISABLE_FEDC_LOG=()=>{B=!1},location.href.match(/\/(cp|act)\/(.*?)\//));if("pgvMain"in window&&window.pgvMain instanceof Function){const U=window.pgvMain;window.pgvMain=(t={})=>{if(window.setSite){const o=Object.assign(Object.assign({disablePTT:!1},window.setSite),t);if(o.virtualDomain&&(o.domain=o.virtualDomain),o.virtualURL&&(o.path=o.virtualURL),window.fedc=(t=>{var e=Object.assign(Object.assign({siteType:D?D[2]:"os",project:"other",logger:B},window.setSite||{}),t),t=(B=e.logger,new S),r=t.getQuery.bind(t);for(const c in e)e.hasOwnProperty(c)&&"function"==typeof e[c]&&(e[c]=e[c]({getQuery:r}));var{siteType:t,project:o,pageType:n,pageName:i,domain:s=location.hostname,path:a=location.pathname,aid:h}=e;let d;return s&&(d=e.gid?e.gid.toString():s.split(".")[0]),new j({gid:d,aid:h||t.toString(),acttype:o?o.toString():"other",pagetype:n.toString(),pagename:i.toString(),domain:s,path:a},{onSend(t){var{category:e,type:r,desc:o}=t;let n;switch(e){case"pageview":n="[fedc]send:"+e;break;case"appuser":n=`[fedc]send:${e}|appuser`;break;case"gameuser":n=`[fedc]send:${e}|gameuser`;break;default:n=`[fedc]send:${e}|category|${r}|type|`+o}console.info(n),B||(P.push({str:n,option:Object.assign({},t)}),100<P.length&&P.shift())}})})(o),o.disablePTT||U(t),"PTTSendClick"in window&&window.PTTSendClick instanceof Function){const n=window.PTTSendClick;window.PTTSendClick=(t,e,r)=>{window.fedc.send(t,e,r),o.disablePTT||n.call(null,t,e,r)}}}return window.fedc
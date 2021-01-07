"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.controlFreePanel=exports.createFreePanel=void 0;var _mainPanel=require("./mainPanel.vue"),_mainPanel2=_interopRequireDefault(_mainPanel);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function transit(){var t=this,n=this;this.thisContainer={},this.defaultFreeStyle={},this.defaultFreeData={},this.defaultFreeConfig={},this.componentsName=[],this.currentControlId="",this.currentSwitchCallback={},this.currentChangeCallback={},this.modifyRecord=[],this.currentRecordIndex=-1,this.triggerLock=!0,this.thisHook=function(e,t){n.thisContainer[e]||(n.thisContainer[e]=t)},this.useThis=function(e){return n.thisContainer[e]},this.removeThis=function(e){try{n.thisContainer[e]&&delete n.thisContainer[e]}catch(e){console.error(e)}},this.addDefaultFreeConfig=function(e,t){t.props&&(t.props.freeStyle&&t.props.freeStyle.default&&!n.defaultFreeStyle[e]&&(n.defaultFreeStyle[e]=t.props.freeStyle.default()),t.props.freeData&&t.props.freeData.default&&!n.defaultFreeData[e]&&(n.defaultFreeData[e]=t.props.freeData.default()),t.props.freeConfig&&t.props.freeConfig.default&&!n.defaultFreeConfig[e]&&(n.defaultFreeConfig[e]=t.props.freeConfig.default()))},this.reset=function(e){t.thisContainer.mainPanel&&Object.assign(t.thisContainer.mainPanel.$data,t.thisContainer.mainPanel.$options.data()),t.currentControlId="",t.modifyRecord=[],t.currentRecordIndex=-1,e&&(t.currentSwitchCallback={},t.currentChangeCallback={})}}var createFreePanel=exports.createFreePanel=function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},o=new transit;this.freeTransit=o,this.mainPanel=_mainPanel2.default;function n(e,t){var n;t.created?(n=t.created,t.created=function(){o.thisHook(e||this.id,this),n.call(this)}):t.created=function(){o.thisHook(e||this.id,this)},t.beforeDestroy[t.beforeDestroy.length]=function(){o.removeThis(e||this.id,this)}}n("mainPanel",this.mainPanel),o.addDefaultFreeConfig("mainPanel",this.mainPanel),e.components&&e.components.length&&e.components.map(function(e){return n(void 0,e.component),o.addDefaultFreeConfig(e.name,e.component),o.componentsName.push(e.name),e.component.props||(e.component.props={}),e.component.props.id={type:null},e.component.props.positioning={type:null},t.mainPanel.components||(t.mainPanel.components={}),t.mainPanel.components[e.name]=e.component,e}),this.component=function(){return new Promise(function(e){e(t.mainPanel)})}},controlFreePanel=exports.controlFreePanel=function(w){var a=this,c="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");function s(e,t){var n,o,i=c,r=[],a=(a=1<arguments.length&&void 0!==t?t:16)||i.length;if(e)for(n=0;n<e;n++)r[n]=i[0|Math.random()*a];else for(r[8]=r[13]=r[18]=r[23]="-",r[14]="4",n=0;n<32;n++)r[n]||(o=0|16*Math.random(),r[n]=i[19==n?3&o|8:o]);return r.join("")}function n(t,n,o,i){if(w.currentControlId&&w.triggerLock){w.triggerLock=!1;var e=w.useThis("mainPanel");try{"mainPanel"===w.currentControlId?e[t][n]=o:e.componentList.forEach(function(e){if(e.id===w.currentControlId){if(!("positioning"==t?~["left","top","zIndex"].indexOf(n)&&e.positioning:~Object.keys(w["freeStyle"==t?"defaultFreeStyle":"freeData"==t?"defaultFreeData":"freeConfig"==t?"defaultFreeConfig":""][e.name]).indexOf(n)))throw new Error("修改的配置属性不在修改范围！");throw i&&P({id:e.id,name:e.name,behavior:"updata",type:t,key:n,newData:_defineProperty({},t,_defineProperty({},n,o)),oldData:_defineProperty({},t,_defineProperty({},n,e[t][n]))}),e[t]=Object.assign({},e[t],_defineProperty({},n,o)),new Error(!0)}})}catch(e){"true"!==e.message&&!0!==e.message&&console.error(e)}e.$nextTick(function(){w.triggerLock=!0})}}function P(e){w.modifyRecord[w.currentRecordIndex+1]&&w.modifyRecord.splice(w.currentRecordIndex+1,w.modifyRecord.length-1);var t=JSON.parse(JSON.stringify(e));w.modifyRecord.push(t),w.currentRecordIndex++,Object.keys(w.currentChangeCallback).forEach(function(e){w.currentChangeCallback[e](t,w.currentRecordIndex,w.modifyRecord)})}function e(e){if(w.triggerLock){w.triggerLock=!1;var n=w.useThis("mainPanel"),o=w.modifyRecord[w.currentRecordIndex],i="rollBack"==e?"oldData":"nextStep"==e?"newData":"";try{o&&("add"==o.behavior&&o[i]||"del"==o.behavior&&o[i]?(n.componentList.push(o[i]),o[i].positioning&&n.$nextTick(function(){l(o[i].id),null!=o[i].freeStyle.width&&null!=o[i].freeStyle.height&&(f(o[i].id,"topRightAngle"),f(o[i].id,"topLeftAngle"),f(o[i].id,"bottomRightAngle"),f(o[i].id,"bottomLeftAngle"))})):n.componentList.forEach(function(e,t){e.id===o.id&&("add"==o.behavior||"del"==o.behavior?(n.componentList.splice(t,1),w.removeThis(e.id)):"updata"==o.behavior&&("dragAndDrop"==o.type?n.componentList[t].positioning=o[i].positioning:"mouseZoom"==o.type?(n.componentList[t].freeStyle=o[i].freeStyle,n.componentList[t].positioning=o[i].positioning):n.componentList[t][o.type][o.key]=o[i][o.type][o.key]))}))}catch(e){"true"!==e.message&&!0!==e.message&&console.error(e)}n.$nextTick(function(){w.triggerLock=!0})}}function l(n){var o,i,t,r=w.useThis("mainPanel"),a=r.$refs[n][0],c=0,s=0,l=0,f=0,u=!1,p=!1;function d(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,u&&(f=l=s=c=0,u=!1,document.onmouseup=null,window.onmousemove=null,p&&(p=!1,P({id:o.id,name:o.name,behavior:"updata",type:"dragAndDrop",newData:{positioning:r.componentList[i].positioning},oldData:{positioning:t}})))}function h(e){var t;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,0!=u&&(t=e.clientX,e=e.clientY,t=t-(l-c),e=e-(f-s),r.componentList[i].positioning.left=t+"px",r.componentList[i].positioning.top=e+"px",p=!0)}a.onmousedown=function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0;try{throw r.componentList.forEach(function(e,t){if(e.id===n)throw o=JSON.parse(JSON.stringify(e)),i=t,new Error(!0)}),new Error("未找到需要注册拖拽事件的节点")}catch(e){if("true"!==e.message&&!0!==e.message)return void console.error(e)}t=JSON.parse(JSON.stringify(r.componentList[i].positioning)),a.offsetWidth,a.offsetHeight,l=e.clientX,f=e.clientY,c=a.offsetLeft,s=a.offsetTop,u=!0,document.onmouseup=d,window.onmousemove=h}}function f(n,o){var i,r,t,a,c,s=w.useThis("mainPanel"),l=s.$refs[n][0],e=s.$refs[o+"_"+n][0],f=0,u=0,p=0,d=0,h=null,g=null,m=!1,y=!1;function C(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,m&&(u=f=d=p=0,g=h=null,m=!1,document.onmouseup=null,window.onmousemove=null,y&&(y=!1,P({id:i.id,name:i.name,behavior:"updata",type:"mouseZoom",newData:{positioning:s.componentList[r].positioning,freeStyle:s.componentList[r].freeStyle},oldData:{positioning:t,freeStyle:a}})))}function L(e){var t,n;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,0!=m&&(null==h&&(h=e.clientX),null==g&&(g=e.clientY),t=e.clientX-h,n=e.clientY-g,e=JSON.parse(JSON.stringify(s.componentList[r].freeStyle)),"topLeftAngle"==o?(e.width&&(e.width=b(-1*t+f,function(){c&&(s.componentList[r].positioning.left=t+p+"px")})+"px"),e.height&&(e.height=k(-1*n+u,function(){c&&(s.componentList[r].positioning.top=n+d+"px")})+"px")):"bottomLeftAngle"==o?(e.width&&(e.width=b(-1*t+f,function(){c&&(s.componentList[r].positioning.left=t+p+"px")})+"px"),e.height&&(e.height=k(n+u)+"px")):"topRightAngle"==o?(e.width&&(e.width=b(t+f)+"px"),e.height&&(e.height=k(-1*n+u,function(){c&&(s.componentList[r].positioning.top=n+d+"px")})+"px")):"bottomRightAngle"==o&&(e.width&&(e.width=b(t+f)+"px"),e.height&&(e.height=k(n+u)+"px")),s.componentList[r].freeStyle=e,y=!0)}function b(e,t){return 10<e?(t&&t(),e):10}function k(e,t){return 10<e?(t&&t(),e):10}e.onmousedown=function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0;try{throw s.componentList.forEach(function(e,t){if(e.id===n)throw i=JSON.parse(JSON.stringify(e)),r=t,c=!!e.positioning,new Error(!0)}),new Error("未找到需要注册拖拽事件的节点")}catch(e){if("true"!==e.message&&!0!==e.message)return void console.error(e)}s.componentList[r].positioning&&(t=JSON.parse(JSON.stringify(s.componentList[r].positioning)));s.componentList[r].freeStyle&&(a=JSON.parse(JSON.stringify(s.componentList[r].freeStyle)));f=l.offsetWidth,u=l.offsetHeight,p=l.offsetLeft,d=l.offsetTop,m=!0,document.onmouseup=C,window.onmousemove=L}}this.setCurrentControl=function(t){w.triggerLock&&(w.triggerLock=!1,w.currentControlId!==t&&(w.currentControlId=t,Object.keys(w.currentSwitchCallback).forEach(function(e){w.currentSwitchCallback[e](t&&w.useThis(t)||null)})),w.useThis("mainPanel").$nextTick(function(){w.triggerLock=!0}))},this.listeningCurrentSwitch=function(e){var t=s();return w.currentSwitchCallback[t]=e,function(){delete w.currentSwitchCallback[t]}},this.listeningCurrentChange=function(e){var t=s();return w.currentChangeCallback[t]=e,function(){delete w.currentChangeCallback[t]}},this.addComponent=function(e,t,n){if(~w.componentsName.indexOf(e)){var o=w.useThis("mainPanel");if(o.componentList&&w.triggerLock){w.triggerLock=!1;var i=s(),r=n||{id:i,name:e,freeStyle:w.defaultFreeStyle[e]||{},freeData:w.defaultFreeData[e]||{},freeConfig:w.defaultFreeConfig[e]||{}};t&&Object.assign(r,{positioning:{position:"absolute",left:"0px",top:(o.scrollTop||0)+"px",zIndex:1}}),o.componentList.push(r),P({id:i,name:e,behavior:"add",newData:r,oldData:null}),o.$nextTick(function(){a.setCurrentControl(i),t&&l(i),t&&null!=r.freeStyle.width&&null!=r.freeStyle.height&&(f(i,"topRightAngle"),f(i,"topLeftAngle"),f(i,"bottomRightAngle"),f(i,"bottomLeftAngle")),w.triggerLock=!0})}else try{throw new Error("页面组件没有componentList组件容器！")}catch(e){console.error(e)}}else try{throw new Error(e+":组件不存在！")}catch(e){console.error(e)}},this.removeComponent=function(n){if((n||w.currentControlId)&&w.triggerLock){w.triggerLock=!1;var o=w.useThis("mainPanel");try{o.componentList&&o.componentList.forEach(function(e,t){if(e.id==(n||w.currentControlId)){w.removeThis(w.currentControlId);t=o.componentList.splice(t,1);throw P({id:t[0].id,name:t[0].name,behavior:"del",newData:null,oldData:t[0]}),new Error(!0)}})}catch(e){"true"!==e.message&&!0!==e.message&&console.error(e)}o.$nextTick(function(){w.triggerLock=!0,a.setCurrentControl("")})}},this.setStyle=function(e,t){n("freeStyle",e,t,!(2<arguments.length&&void 0!==arguments[2])||arguments[2])},this.setData=function(e,t){n("freeData",e,t,!(2<arguments.length&&void 0!==arguments[2])||arguments[2])},this.setConfig=function(e,t){n("freeConfig",e,t,!(2<arguments.length&&void 0!==arguments[2])||arguments[2])},this.setPositioning=function(e,t){n("positioning",e,t,!(2<arguments.length&&void 0!==arguments[2])||arguments[2])},this.echoComponent=function(e){a.resetFreePanel();var t=w.useThis("mainPanel");if(t.componentList&&w.triggerLock)try{w.triggerLock=!1,t.componentList=[],Object.keys(w.thisContainer).forEach(function(e){"mainPanel"!==e&&w.removeThis(e)}),t.$nextTick(function(){t.componentList=e,t.$nextTick(function(){t.componentList.forEach(function(e){e.positioning&&l(e.id),e.positioning&&null!=e.freeStyle.width&&null!=e.freeStyle.height&&(f(e.id,"topRightAngle"),f(e.id,"topLeftAngle"),f(e.id,"bottomRightAngle"),f(e.id,"bottomLeftAngle"))}),w.triggerLock=!0})})}catch(e){w.triggerLock=!0}else try{throw new Error("页面组件没有componentList组件容器！")}catch(e){console.error(e)}},this.rollBack=function(){0<=w.currentRecordIndex&&(e("rollBack"),w.currentRecordIndex--)},this.nextStep=function(){w.currentRecordIndex+1<w.modifyRecord.length&&(w.currentRecordIndex++,e("nextStep"))},this.savePhaseData=function(){w.modifyRecord=[],w.currentRecordIndex=-1;var e=w.useThis("mainPanel");try{return e.componentList}catch(e){console.error(e)}finally{Object.keys(w.currentChangeCallback).forEach(function(e){w.currentChangeCallback[e](null,w.currentRecordIndex,w.modifyRecord)})}},this.resetFreePanel=function(e){w.reset(e),Object.keys(w.currentSwitchCallback).forEach(function(e){w.currentSwitchCallback[e](null)}),Object.keys(w.currentChangeCallback).forEach(function(e){w.currentChangeCallback[e](null,w.currentRecordIndex,w.modifyRecord)})}};
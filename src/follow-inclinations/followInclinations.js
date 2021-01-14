"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.controlFreePanel=exports.createFreePanel=void 0;var _mainPanel=require("./mainPanel.vue"),_mainPanel2=_interopRequireDefault(_mainPanel);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _toConsumableArray(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}function _defineProperty(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function transit(){var n=this,t=this;this.thisContainer={},this.defaultFreeStyle={},this.defaultFreeData={},this.defaultFreeConfig={},this.componentsName=[],this.currentControlId="",this.currentSwitchCallback={},this.currentChangeCallback={},this.groupChangeCallback={},this.eventChangeCallback={},this.zoomChangeCallback={},this.modifyRecord=[],this.currentRecordIndex=-1,this.triggerLock=!0,this.groupBarrel={};var o={mainPanel:{touchPeak:{name:"页面滑动顶部",fun:escape("((...paramet)=>{ })")},touchGround:{name:"页面滑动底部",fun:escape("((...paramet)=>{ })")}}};this.eventGather=JSON.parse(JSON.stringify(o)),this.bindEvent={},this.groupState=!1,this.groupTemporaryContainer=null,this.zoomValue=1,this.thisHook=function(e,n){t.thisContainer[e]||(t.thisContainer[e]=n)},this.useThis=function(e){return t.thisContainer[e]},this.removeThis=function(e){try{t.thisContainer[e]&&delete t.thisContainer[e]}catch(e){console.error(e)}},this.addDefaultFreeConfig=function(e,n){n.props&&(n.props.freeStyle&&n.props.freeStyle.default&&!t.defaultFreeStyle[e]&&(t.defaultFreeStyle[e]=n.props.freeStyle.default()),n.props.freeData&&n.props.freeData.default&&!t.defaultFreeData[e]&&(t.defaultFreeData[e]=n.props.freeData.default()),n.props.freeConfig&&n.props.freeConfig.default&&!t.defaultFreeConfig[e]&&(t.defaultFreeConfig[e]=n.props.freeConfig.default()))},this.reset=function(e){n.thisContainer.mainPanel&&Object.assign(n.thisContainer.mainPanel.$data,n.thisContainer.mainPanel.$options.data()),n.currentControlId="",n.modifyRecord=[],n.currentRecordIndex=-1,n.triggerLock=!0,n.groupBarrel={},n.groupState=!1,n.groupTemporaryContainer=null,n.zoomValue=1,n.eventGather=JSON.parse(JSON.stringify(o)),n.bindEvent={},e&&(n.currentSwitchCallback={},n.currentChangeCallback={},n.groupChangeCallback={},n.eventChangeCallback={},n.zoomChangeCallback={})}}var createFreePanel=exports.createFreePanel=function(){var n=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},o=new transit;this.freeTransit=o,this.mainPanel=_mainPanel2.default;function t(e,n){var t;n.created?(t=n.created,n.created=function(){o.thisHook(e||this.id,this),t.call(this)}):n.created=function(){o.thisHook(e||this.id,this)},n.beforeDestroy&&n.beforeDestroy.length||(n.beforeDestroy=[]),n.beforeDestroy[n.beforeDestroy.length]=function(){o.removeThis(e||this.id,this)}}t("mainPanel",this.mainPanel),o.addDefaultFreeConfig("mainPanel",this.mainPanel),e.components&&e.components.length&&e.components.map(function(e){return t(void 0,e.component),o.addDefaultFreeConfig(e.name,e.component),o.componentsName.push(e.name),e.component.props||(e.component.props={}),e.component.props.id={type:null},e.component.props.positioning={type:null},n.mainPanel.components||(n.mainPanel.components={}),n.mainPanel.components[e.name]=e.component,e}),this.component=function(){return new Promise(function(e){e(n.mainPanel)})}},controlFreePanel=exports.controlFreePanel=function(v){var a=this;function c(e,n){var t,o,r=1<arguments.length&&void 0!==n?n:16,i="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),a=[],r=r||i.length;if(e)for(t=0;t<e;t++)a[t]=i[0|Math.random()*r];else for(a[8]=a[13]=a[18]=a[23]="-",a[14]="4",t=0;t<32;t++)a[t]||(o=0|16*Math.random(),a[t]=i[19==t?3&o|8:o]);return a.join("")}function k(n){Object.keys(v.currentSwitchCallback).forEach(function(e){v.currentSwitchCallback[e](n)})}function u(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return new Promise(function(e,n){Object.keys(v.currentChangeCallback).forEach(function(e){var n;(n=v.currentChangeCallback)[e].apply(n,t)}),e(!0)})}function i(i){return new Promise(function(e,n){try{var t=JSON.parse(JSON.stringify(v.groupBarrel)),o=JSON.parse(JSON.stringify(v.groupTemporaryContainer)),r=v.useThis("mainPanel").componentList.map(function(e){return e.id});Object.keys(t).forEach(function(n){Object.keys(t[n].gather).forEach(function(e){~r.indexOf(e)||delete t[n].gather[e]})}),Object.keys(v.groupChangeCallback).forEach(function(e){v.groupChangeCallback[e](i,t,o)}),e(!0)}catch(e){console.error(e),n(e)}})}function s(){return new Promise(function(e,n){try{var t,o,r,i,a,c=JSON.parse(JSON.stringify(v.eventGather)),u=JSON.parse(JSON.stringify(v.bindEvent));Object.keys(c).forEach(function(n){Object.keys(c[n]).forEach(function(e){c[n][e].fun=unescape(c[n][e].fun)})}),t=c.mainPanel,"mainPanel"!==v.currentControlId&&(delete t.touchPeak,delete t.touchGround,o=u[v.currentControlId]||{},r=c[v.currentControlId]||{}),i=t,o&&r&&(Object.assign(i,r),a=Object.keys(i),Object.keys(o).forEach(function(e){~a.indexOf(o[e].funcId)||delete o[e]})),Object.keys(v.eventChangeCallback).forEach(function(e){v.eventChangeCallback[e](o,r,i,{eventGather:c,bindEvent:u})}),e(!0)}catch(e){console.error(e),n(e)}})}function t(n,t,o,r){if(v.currentControlId&&v.triggerLock){v.triggerLock=!1;var e=v.useThis("mainPanel");try{"mainPanel"===v.currentControlId?e[n][t]=o:e.componentList.forEach(function(e){if(e.id===v.currentControlId){if(!("positioning"==n?~["left","top","zIndex"].indexOf(t)&&e.positioning:~Object.keys(v["freeStyle"==n?"defaultFreeStyle":"freeData"==n?"defaultFreeData":"freeConfig"==n?"defaultFreeConfig":""][e.name]).indexOf(t)))throw new Error("修改的配置属性不在修改范围！");throw r&&L({id:e.id,name:e.name,behavior:"updata",type:n,key:t,newData:_defineProperty({},n,_defineProperty({},t,o)),oldData:_defineProperty({},n,_defineProperty({},t,e[n][t]))}),e[n]=Object.assign({},e[n],_defineProperty({},t,o)),new Error(!0)}})}catch(e){"true"!==e.message&&!0!==e.message&&console.error(e)}e.$nextTick(function(){v.triggerLock=!0})}}function L(e){v.modifyRecord[v.currentRecordIndex+1]&&v.modifyRecord.splice(v.currentRecordIndex+1,v.modifyRecord.length-1);e=JSON.parse(JSON.stringify(e));v.modifyRecord.push(e),v.currentRecordIndex++,u(e,v.currentRecordIndex,v.modifyRecord)}function e(e){if(v.triggerLock){v.triggerLock=!1;var t=v.useThis("mainPanel"),o=v.modifyRecord[v.currentRecordIndex],r="rollBack"==e?"oldData":"nextStep"==e?"newData":"";try{o&&(v.currentControlId="",k(null),"add"==o.behavior&&o[r]||"del"==o.behavior&&o[r]?(t.componentList.push(o[r]),t.$nextTick(function(){v.currentControlId=o.id,k(v.useThis(o.id)||null),l(o[r],o.id)})):"groupMobile"==o.type?t.componentList.forEach(function(e,n){~o.id.indexOf(e.id)&&(t.componentList[n].positioning=o[r].positioning[e.id])}):t.componentList.forEach(function(e,n){if(e.id===o.id)throw"add"==o.behavior||"del"==o.behavior?(t.componentList.splice(n,1),v.removeThis(e.id)):"updata"==o.behavior&&("dragAndDrop"==o.type?t.componentList[n].positioning=o[r].positioning:"mouseZoom"==o.type?(t.componentList[n].freeStyle=o[r].freeStyle,t.componentList[n].positioning=o[r].positioning):t.componentList[n][o.type][o.key]=o[r][o.type][o.key],t.$nextTick(function(){v.currentControlId=o.id,k(v.useThis(o.id)||null)})),new Error(!0)}))}catch(e){"true"!==e.message&&!0!==e.message&&console.error(e)}t.$nextTick(function(){i(),s(),v.triggerLock=!0})}}function l(e,n){function t(e){var n,t;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,C&&(y=m=f=g=0,C=!1,document.onmouseup=null,window.onmousemove=null,b&&(b=!1,s?(e=Object.keys(c),n={positioning:{}},t={positioning:{}},u.map(function(e){n.positioning[l.componentList[e].id]=JSON.parse(JSON.stringify(l.componentList[e].positioning))}),e.map(function(e){t.positioning[c[e].id]=c[e].positioning}),L({id:e,behavior:"updata",type:"groupMobile",newData:n,oldData:t})):L({id:i.id,name:i.name,behavior:"updata",type:"dragAndDrop",newData:{positioning:l.componentList[a].positioning},oldData:{positioning:i.positioning}}),s=u=c=a=i=null,d={},y=m=f=g=0,b=C=!(h={})))}function o(e){var o,r,n;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,0!=C&&(o=e.clientX,r=e.clientY,s?u.forEach(function(e){var n=(o-m)/v.zoomValue+d[e],t=(r-y)/v.zoomValue+h[e];l.componentList[e].positioning.left=Math.round(n)+"px",l.componentList[e].positioning.top=Math.round(t)+"px"}):(n=(o-m)/v.zoomValue+g,e=(r-y)/v.zoomValue+f,l.componentList[a].positioning.left=Math.round(n)+"px",l.componentList[a].positioning.top=Math.round(e)+"px"),b=!0)}var r,i,a,c,u,s,l,p,g,f,d,h,m,y,C,b;e.positioning&&(r=n,l=v.useThis("mainPanel"),p=l.$refs[r][0],d={},y=m=f=g=0,b=C=!(h={}),p.onmousedown=function(e){if(!v.groupState){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,v.currentControlId!==r&&(v.currentControlId=r,k(v.useThis(r)||null)),x();try{throw l.componentList.forEach(function(n,e){var t;if(n.id===r)throw n.groupMember?v.groupBarrel[n.groupId]?(s=!0,t=Object.keys(v.groupBarrel[n.groupId].gather).map(function(e){return v.groupBarrel[n.groupId].gather[e].id}),c={},u=[],l.componentList.forEach(function(e,n){~t.indexOf(e.id)&&(c[e.id]=JSON.parse(JSON.stringify(e)),d[n]=Number(e.positioning.left.replace(/px/,"")),h[n]=Number(e.positioning.top.replace(/px/,"")),u.push(n))})):(delete l.componentList[e].groupMember,delete l.componentList[e].groupId,s=!1,i=JSON.parse(JSON.stringify(n)),a=e,g=Number(n.positioning.left.replace(/px/,"")),f=Number(n.positioning.top.replace(/px/,""))):(s=!1,i=JSON.parse(JSON.stringify(n)),a=e,g=Number(n.positioning.left.replace(/px/,"")),f=Number(n.positioning.top.replace(/px/,""))),new Error(!0)}),new Error("未找到需要注册拖拽事件的节点")}catch(e){if("true"!==e.message&&!0!==e.message)return void console.error(e)}m=e.clientX,y=e.clientY,C=!0,document.onmouseup=t,window.onmousemove=o}},null!=e.freeStyle.width&&null!=e.freeStyle.height&&(O(n,"topRightAngle"),O(n,"topLeftAngle"),O(n,"bottomRightAngle"),O(n,"bottomLeftAngle")))}function O(t,o){var r,i,a,c=v.useThis("mainPanel"),n=c.$refs[t][0],e=c.$refs[o+"_"+t][0],u=0,s=0,l=0,p=0,g=null,f=null,d=!1,h=!1;function m(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,d&&(s=u=p=l=0,f=g=null,d=!1,document.onmouseup=null,window.onmousemove=null,h&&(h=!1,L({id:r.id,name:r.name,behavior:"updata",type:"mouseZoom",newData:{positioning:c.componentList[i].positioning,freeStyle:c.componentList[i].freeStyle},oldData:{positioning:r.positioning,freeStyle:r.freeStyle}})))}function y(e){var n,t;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,0!=d&&(null==g&&(g=e.clientX),null==f&&(f=e.clientY),n=(e.clientX-g)/v.zoomValue,t=(e.clientY-f)/v.zoomValue,e=JSON.parse(JSON.stringify(c.componentList[i].freeStyle)),"topLeftAngle"==o?(e.width&&(e.width=C(-1*n+u,function(){a&&(c.componentList[i].positioning.left=Math.round(n+l)+"px")})+"px"),e.height&&(e.height=b(-1*t+s,function(){a&&(c.componentList[i].positioning.top=Math.round(t+p)+"px")})+"px")):"bottomLeftAngle"==o?(e.width&&(e.width=C(-1*n+u,function(){a&&(c.componentList[i].positioning.left=Math.round(n+l)+"px")})+"px"),e.height&&(e.height=b(t+s)+"px")):"topRightAngle"==o?(e.width&&(e.width=C(n+u)+"px"),e.height&&(e.height=b(-1*t+s,function(){a&&(c.componentList[i].positioning.top=Math.round(t+p)+"px")})+"px")):"bottomRightAngle"==o&&(e.width&&(e.width=C(n+u)+"px"),e.height&&(e.height=b(t+s)+"px")),c.componentList[i].freeStyle=e,h=!0)}function C(e,n){return 10<e?(n&&n(),Math.round(e)):10}function b(e,n){return 10<e?(n&&n(),Math.round(e)):10}e.onmousedown=function(e){if(v.groupState)return;e.stopPropagation?e.stopPropagation():e.cancelBubble=!0;v.currentControlId!==t&&(v.currentControlId=t,k(v.useThis(t)||null));x();try{throw c.componentList.forEach(function(e,n){if(e.id===t)throw r=JSON.parse(JSON.stringify(e)),i=n,a=!!e.positioning,new Error(!0)}),new Error("未找到需要注册拖拽事件的节点")}catch(e){if("true"!==e.message&&!0!==e.message)return void console.error(e)}u=n.offsetWidth,s=n.offsetHeight,l=n.offsetLeft,p=n.offsetTop,d=!0,document.onmouseup=m,window.onmousemove=y}}function x(){var o={win_page:{top:0,left:0},win:{longitudinal:[],cross:[]},page:{longitudinal:[],cross:[]}},r=v.useThis("mainPanel");return new Promise(function(e,n){var t=document.getElementById("mainPanelPage").getBoundingClientRect();o.win_page.top=t.top,o.win_page.left=t.left,r.componentList.forEach(function(e){var n,t;e.id!==v.currentControlId&&(n=(t=document.getElementById(e.id)).getBoundingClientRect(),e=t.offsetLeft,t=t.offsetTop,~o.win.longitudinal.indexOf(n.left)||o.win.longitudinal.push(n.left),~o.win.longitudinal.indexOf(n.right)||o.win.longitudinal.push(n.right),~o.win.cross.indexOf(n.top)||o.win.cross.push(n.top),~o.win.cross.indexOf(n.bottom)||o.win.cross.push(n.bottom),~o.page.longitudinal.indexOf(e)||o.page.longitudinal.push(e),~o.page.longitudinal.indexOf(e+n.width)||o.page.longitudinal.push(e+n.width),~o.page.cross.indexOf(t)||o.page.cross.push(t),~o.page.cross.indexOf(t+n.height)||o.page.cross.push(t+n.height))}),e(o)}).then(function(e){r.alignment=e})}this.useThis=function(e){return v.useThis(e)},this.setCurrentControl=function(e){v.groupState?function(e){for(var n=v.useThis("mainPanel"),t=0;t<n.componentList.length;t++)if(e==n.componentList[t].id){if(n.componentList[t].groupMember)if(n.componentList[t].groupId==v.groupTemporaryContainer.groupId)delete n.componentList[t].groupMember,delete n.componentList[t].groupId,delete v.groupTemporaryContainer.gather[e];else try{throw new Error("该组件已经加入其他分组，一个组件只能加入一个分组")}catch(e){console.log(e)}else n.componentList[t].groupMember=!0,n.componentList[t].groupId=v.groupTemporaryContainer.groupId,v.groupTemporaryContainer.gather[e]={id:n.componentList[t].id,label:n.componentList[t].name,serialNumber:function(){var e=Object.keys(v.groupTemporaryContainer.gather).map(function(e){return v.groupTemporaryContainer.gather[e].serialNumber});return e.length?Math.max.apply(Math,_toConsumableArray(e))+1+"":"0"}()};break}i(v.groupBarrel[v.groupTemporaryContainer.groupId])}(e):v.triggerLock&&(v.triggerLock=!1,v.currentControlId!==e&&k((v.currentControlId=e)&&v.useThis(e)||null),x(),v.useThis("mainPanel").$nextTick(function(){i(),s(),v.triggerLock=!0}))},this.listeningCurrentSwitch=function(e){var n=c();return v.currentSwitchCallback[n]=e,function(){delete v.currentSwitchCallback[n]}},this.listeningCurrentChange=function(e){var n=c();return v.currentChangeCallback[n]=e,function(){delete v.currentChangeCallback[n]}},this.addComponent=function(e,n,t){var o,r,i;~v.componentsName.indexOf(e)?1!=v.groupState&&((o=v.useThis("mainPanel")).componentList&&v.triggerLock?(v.triggerLock=!1,r=c(),i=t||{id:r,name:e,freeStyle:v.defaultFreeStyle[e]||{},freeData:v.defaultFreeData[e]||{},freeConfig:v.defaultFreeConfig[e]||{}},n&&Object.assign(i,{positioning:{position:"absolute",left:"0px",top:(o.scrollTop||0)+"px",zIndex:1}}),o.componentList.push(i),L({id:r,name:e,behavior:"add",newData:i,oldData:null}),o.$nextTick(function(){a.setCurrentControl(r),l(i,r),v.triggerLock=!0})):console.error("页面组件没有componentList组件容器！")):console.error(e+":组件不存在！")},this.copyComponent=function(t){if(1!=v.groupState&&v.triggerLock&&(t&&"mainPanel"!==t||v.currentControlId&&"mainPanel"!==v.currentControlId)){v.triggerLock=!1;var o=v.useThis("mainPanel");try{o.componentList&&o.componentList.forEach(function(e){if(e.id==(t||v.currentControlId)){var n=JSON.parse(JSON.stringify(e));throw n.id=c(),n.positioning&&(n.positioning.left=Number(n.positioning.left.replace(/px/,""))+5+"px",n.positioning.top=Number(n.positioning.top.replace(/px/,""))+5+"px"),o.componentList.push(n),L({id:n.id,name:n.name,behavior:"add",newData:n,oldData:null}),o.$nextTick(function(){v.triggerLock=!0,a.setCurrentControl(n.id),l(n,n.id)}),new Error(!0)}})}catch(e){"true"!==e.message&&!0!==e.message&&console.error(e)}}},this.removeComponent=function(t){if(1!=v.groupState&&v.triggerLock&&(t&&"mainPanel"!==t||v.currentControlId&&"mainPanel"!==v.currentControlId)){v.triggerLock=!1;var o=v.useThis("mainPanel");try{o.componentList&&o.componentList.forEach(function(e,n){if(e.id==(t||v.currentControlId)){v.removeThis(t||v.currentControlId);n=o.componentList.splice(n,1);throw L({id:n[0].id,name:n[0].name,behavior:"del",newData:null,oldData:n[0]}),new Error(!0)}})}catch(e){"true"!==e.message&&!0!==e.message&&console.error(e)}o.$nextTick(function(){v.triggerLock=!0,a.setCurrentControl("")})}},this.setStyle=function(e,n){t("freeStyle",e,n,!(2<arguments.length&&void 0!==arguments[2])||arguments[2])},this.setData=function(e,n){t("freeData",e,n,!(2<arguments.length&&void 0!==arguments[2])||arguments[2])},this.setConfig=function(e,n){t("freeConfig",e,n,!(2<arguments.length&&void 0!==arguments[2])||arguments[2])},this.setPositioning=function(u,s){var l=!(2<arguments.length&&void 0!==arguments[2])||arguments[2];if(v.currentControlId&&v.triggerLock){v.triggerLock=!1;var p=v.useThis("mainPanel");try{"mainPanel"===v.currentControlId?p.positioning[u]=s:p.componentList.forEach(function(n){if(n.id===v.currentControlId){if(!~["left","top","zIndex"].indexOf(u)||!n.positioning)throw new Error("修改的配置属性不在修改范围！");var t,o,r,i,e,a,c;throw n.groupMember?(t={},o=[],r=Object.keys(v.groupBarrel[n.groupId].gather).map(function(e){return v.groupBarrel[n.groupId].gather[e].id}),p.componentList.forEach(function(e,n){~r.indexOf(e.id)&&(t[e.id]=JSON.parse(JSON.stringify(e)),o.push(n))}),i=Number(s.replace(/px/,""))-Number(n.positioning[u].replace(/px/,"")),l&&(e=Object.keys(t),a={positioning:{}},c={positioning:{}},o.map(function(e){p.componentList[e].positioning[u]=Number(p.componentList[e].positioning[u].replace(/px/,""))+i+"px",a.positioning[p.componentList[e].id]=JSON.parse(JSON.stringify(p.componentList[e].positioning))}),e.map(function(e){c.positioning[t[e].id]=t[e].positioning}),L({id:e,behavior:"updata",type:"groupMobile",newData:a,oldData:c}))):(l&&L({id:n.id,name:n.name,behavior:"updata",type:"positioning",key:u,newData:{positioning:_defineProperty({},u,s)},oldData:{positioning:_defineProperty({},u,n.positioning[u])}}),n.positioning=Object.assign({},n.positioning,_defineProperty({},u,s))),new Error(!0)}})}catch(e){"true"!==e.message&&!0!==e.message&&console.error(e)}p.$nextTick(function(){v.triggerLock=!0})}},this.echoComponent=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};a.resetFreePanel();var n=v.useThis("mainPanel"),t=e.elements||[];if(v.groupBarrel=e.groupBarrel||{},v.eventGather=e.eventGather,v.bindEvent=e.bindEvent||{},n.componentList&&v.triggerLock)try{v.triggerLock=!1,n.componentList=[],Object.keys(v.thisContainer).forEach(function(e){"mainPanel"!==e&&v.removeThis(e)}),n.$nextTick(function(){n.componentList=t,n.$nextTick(function(){i(),s(),n.componentList.forEach(function(e){l(e,e.id)}),v.triggerLock=!0})})}catch(e){v.triggerLock=!0}else console.error("页面组件没有componentList组件容器！")},this.setZoomValue=function(e){try{var n;if("number"==typeof e)n=e;else if(n=Number(e),isNaN(n))throw new Error("缩放值必须为数字");if(!(0<n))throw new Error("缩放值必须大于0");v.zoomValue=Number(n.toFixed(2)),Object.keys(v.zoomChangeCallback).forEach(function(e){v.zoomChangeCallback[e](v.zoomValue)})}catch(e){console.error(e)}},this.listeningZoomChange=function(e){var n=c();return v.zoomChangeCallback[n]=e,function(){delete v.zoomChangeCallback[n]}},this.createGroup=function(){var e=c();v.groupBarrel[e]={groupId:e,label:"newGroup",gather:{},serialNumber:(e=Object.keys(v.groupBarrel).map(function(e){return v.groupBarrel[e].serialNumber})).length?Math.max.apply(Math,_toConsumableArray(e))+1+"":"0"},i()},this.setGroup=function(e){var n,t;0==v.groupState&&(n=v.useThis("mainPanel"),(t=v.groupBarrel[e])&&(v.currentControlId="",k(null),n.$nextTick(function(){v.groupState=!0,n.groupState=!0,v.groupTemporaryContainer=t,i(v.groupTemporaryContainer)})))},this.getGroup=function(e){if(v.groupBarrel[e])return v.groupBarrel[e]},this.setGroupName=function(e,n){v.groupBarrel[e]&&void 0!==n&&(v.groupBarrel[e].label=n),i()},this.setGroupMemberName=function(e,n,t){v.groupBarrel[e]&&v.groupBarrel[e].gather[n]&&void 0!==t&&(v.groupBarrel[e].gather[n].label=t),i()},this.delGroup=function(e){if(0==v.groupState){for(var n=v.useThis("mainPanel"),t=Object.keys(v.groupBarrel[e].gather),o=0;o<n.componentList.length;o++)~t.indexOf(n.componentList[o].id)&&(delete n.componentList[o].groupMember,delete n.componentList[o].groupId);delete v.groupBarrel[e],i()}},this.determineGroup=function(){var e;1==v.groupState&&(e=v.groupTemporaryContainer.groupId,v.groupBarrel[e]=v.groupTemporaryContainer,e=v.useThis("mainPanel"),v.groupState=!1,e.groupState=!1,v.groupTemporaryContainer=null),i()},this.listeningGroupChange=function(e){var n=c();return v.groupChangeCallback[n]=e,function(){delete v.groupChangeCallback[n]}},this.addPageEvent=function(e,n){try{if(!n||"string"!=typeof n)throw new Error("方法为必传数据，且需要以字符形式传入！");var t=c();v.eventGather.mainPanel[t]={name:e,fun:escape(n)},s()}catch(e){console.log(e)}},this.upPageEvent=function(e,n){try{v.eventGather.mainPanel[e]={name:n.name||v.eventGather.mainPanel[e].name,fun:escape(n.fun)||v.eventGather.mainPanel[e].fun},s()}catch(e){console.log(e)}},this.removePageEvent=function(e){try{delete v.eventGather.mainPanel[e],s()}catch(e){console.log(e)}},this.addComponentEvent=function(e,n){try{if(!n||"string"!=typeof n)throw new Error("方法为必传数据，且需要以字符形式传入！");var t=c();v.eventGather[v.currentControlId]||(v.eventGather[v.currentControlId]={}),v.eventGather[v.currentControlId][t]={name:e,fun:escape(n)},s()}catch(e){console.error(e)}},this.upComponentEvent=function(e,n){try{v.eventGather[v.currentControlId][e]={name:n.name||v.eventGather[v.currentControlId][e].name,fun:escape(n.fun)||v.eventGather[v.currentControlId][e].fun},s()}catch(e){console.error(e)}},this.removeComponentEvent=function(e){try{delete v.eventGather[v.currentControlId][e],s()}catch(e){console.error(e)}},this.bindComponentEvent=function(e,n,t){try{if(!~["click","dblclick"].indexOf(e))throw new Error("当前自定义事件绑定只开放了[click/单击,dblclick/双击]");v.bindEvent[v.currentControlId]||(v.bindEvent[v.currentControlId]={}),v.bindEvent[v.currentControlId][e]={funcId:n,paramet:t},s()}catch(e){console.error(e)}},this.removeBindComponentEvent=function(e){try{delete v.bindEvent[v.currentControlId][e],s()}catch(e){console.error(e)}},this.listeningEventChange=function(e){var n=c();return v.eventChangeCallback[n]=e,function(){delete v.eventChangeCallback[n]}},this.rollBack=function(){0<=v.currentRecordIndex&&(e("rollBack"),v.currentRecordIndex--)},this.nextStep=function(){v.currentRecordIndex+1<v.modifyRecord.length&&(v.currentRecordIndex++,e("nextStep"))},this.savePhaseData=function(){v.modifyRecord=[],v.currentRecordIndex=-1;var e=v.useThis("mainPanel"),t=JSON.parse(JSON.stringify(v.groupBarrel)),n=JSON.parse(JSON.stringify(v.eventGather)),o=JSON.parse(JSON.stringify(v.bindEvent)),r=e.componentList.map(function(e){return e.id});Object.keys(t).forEach(function(n){Object.keys(t[n].gather).forEach(function(e){~r.indexOf(e)||delete t[n].gather[e]})});var i=[];Object.keys(n).forEach(function(e){~r.indexOf(e)||"mainPanel"===e?i=i.concat(Object.keys(n[e])):delete n[e]}),Object.keys(o).forEach(function(n){Object.keys(o[n]).forEach(function(e){~i.indexOf(o[n][e].funcId)||delete o[n][e]}),~r.indexOf(n)&&Object.keys(o[n]).length||delete o[n]}),v.groupBarrel=t,v.eventGather=n,v.bindEvent=o;try{return{groupBarrel:v.groupBarrel,eventGather:v.eventGather,bindEvent:v.bindEvent,elements:e.componentList}}catch(e){console.error(e)}finally{u(null,v.currentRecordIndex,v.modifyRecord)}},this.resetFreePanel=function(e){v.reset(e),k(null),u(null,v.currentRecordIndex,v.modifyRecord),Object.keys(v.zoomChangeCallback).forEach(function(e){v.zoomChangeCallback[e](v.zoomValue)})}};
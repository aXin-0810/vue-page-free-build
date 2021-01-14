<template>
  <div :style="[{
    position: 'relative',
    display: 'inline-block',
    transform:'scale('+zoomValue+')'
  }]">
    <div
      id="mainPanelPage"
      :style="[freeStyle]"
      @click.stop="setCurrentControl('mainPanel')"
      @scroll="scrollHandle">
      <template v-for="item in componentList">
        <div
          :id="item.id"
          :ref="item.id"
          :key="item.id"
          :style="[
            (item.positioning || {}),
            ({cursor: item.positioning ? 'move' : 'default'}),
          ]"
          :class="{
            basisStyle: true,
            [currentStyle]: currentId === item.id,
            [sameGroupStyle]: currentId !== item.id && ~currentGroupMembers.indexOf(item.id),
            [haveBeenGrouped]: groupState && item.groupMember && ((temporaryGroup && temporaryGroup.groupId) ? item.groupId !== temporaryGroup.groupId : true)
          }"
          @click.stop="clickEvent(item)"
          @dblclick.stop="dblclickEvent(item)">
          <template v-if="item.positioning && item.freeStyle.height && item.freeStyle.width">
            <div :ref="'topRightAngle_' + item.id" class="topRightAngle"></div>
            <div :ref="'topLeftAngle_' + item.id" class="topLeftAngle"></div>
            <div :ref="'bottomRightAngle_' + item.id" class="bottomRightAngle"></div>
            <div :ref="'bottomLeftAngle_' + item.id" class="bottomLeftAngle"></div>
          </template>
          <div style="pointer-events: none">
            <component
              :is="item.name"
              :id="item.id"
              :freeStyle="item.freeStyle"
              :freeData="item.freeData"
              :freeConfig="item.freeConfig"
              :positioning="item.positioning">
            </component>
          </div>
        </div>
      </template>
    </div>
    <!-- 对齐线 -->
    <template v-if="currentIndex!==undefined && alignment">
      <div 
        v-show="~alignment.page.cross.indexOf(Math.round(Number(componentList[currentIndex]['positioning']['top'].replace(/px/, ''))*zoomValue))"
        :class="{topAlignment:true,[alignmentLineStyle]:true,}" 
        :style="{
          top:(Number(componentList[currentIndex]['positioning']['top'].replace(/px/, ''))-scrollTop+'px')
        }">
      </div>
      <div 
        v-show="~alignment.page.cross.indexOf(Math.round((Number(componentList[currentIndex]['positioning']['top'].replace(/px/, ''))+Number(componentList[currentIndex]['freeStyle']['height'].replace(/px/, '')))*zoomValue))"
        :class="{bottomAlignment:true,[alignmentLineStyle]:true,}"
        :style="{
          top:(Math.round(Number(componentList[currentIndex]['positioning']['top'].replace(/px/, ''))+Number(componentList[currentIndex]['freeStyle']['height'].replace(/px/, ''))-scrollTop)+'px')
        }">
      </div>
      <div 
        v-show="~alignment.page.longitudinal.indexOf(Math.round(Number(componentList[currentIndex]['positioning']['left'].replace(/px/, ''))*zoomValue))"
        :class="{leftAlignment:true,[alignmentLineStyle]:true,}"
        :style="{
          left:(Number(componentList[currentIndex]['positioning']['left'].replace(/px/, ''))+'px')
        }">
      </div>
      <div 
        v-show="~alignment.page.longitudinal.indexOf(Math.round((Number(componentList[currentIndex]['positioning']['left'].replace(/px/, ''))+Number(componentList[currentIndex]['freeStyle']['width'].replace(/px/, '')))*zoomValue))"
        :class="{rightAlignment:true,[alignmentLineStyle]:true,}"
        :style="{
          left:(Math.round(Number(componentList[currentIndex]['positioning']['left'].replace(/px/, ''))+Number(componentList[currentIndex]['freeStyle']['width'].replace(/px/, '')))+'px')
        }">
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    controlPanel: {
      type: null,
    },
    currentStyle: {
      type: String,
      default: "currentBorder",
    },
    sameGroupStyle: {
      type: String,
      default: "sameGroup",
    },
    haveBeenGrouped: {
      type: String,
      default: "groupMember",
    },
    alignmentLineStyle: {
      type: String,
      default: "alignmentLineStyle",
    },
  },
  data() {
    return {
      id: "mainPanel",
      // 主控板页面样式
      freeStyle: {
        width: "375px",
        height: "812px",
        background: "",
      },
      // 接收当前是否设置分组
      groupState: false,
      // 存放组件列表
      componentList: [],
      // 分组集合
      temporaryGroup: {},
      // 存放当前操作组件所属分组的成员
      currentGroupMembers: [],
      // 页面事件集合
      eventObj:{},
      // 当前选中id
      currentId: "",
      // 当前选中下标
      currentIndex: undefined,
      // 对齐线校准数据
      alignment:null,
      // 当前内容高度
      scrollHeight: 812,
      // 当前滚动高度
      scrollTop: 0,
      // 面板缩放值
      zoomValue:1
    };
  },
  watch: {
    "freeStyle.height"(newV) {
      this.scrollHeight = Number(newV.replace(/px/, "")) + this.scrollTop;
    },
    scrollTop(newV) {
      if (newV == 0) {
        if (this.eventObj.eventGather["mainPanel"]["touchPeak"]) {
          eval(unescape(this.eventObj.eventGather["mainPanel"]["touchPeak"]['fun']))();
        }
      } else {
        if (
          Number(this.freeStyle.height.replace(/px/, "")) + newV ==
          this.scrollHeight
        ) {
          if (this.eventObj.eventGather["mainPanel"]["touchGround"]) {
            eval(unescape(this.eventObj.eventGather["mainPanel"]["touchGround"]['fun']))();
          }
        }
      }
    },
  },
  created() {
    // 监听切换当前选中操作的组件
    this.controlPanel.listeningCurrentSwitch((data) => {
      this.currentIndex = undefined;
      if (data) {
        this.currentId = data.id;
        try {
          this.componentList.forEach((item,index) => {
            if(this.currentId==item.id){
              this.currentIndex = index;
              throw new Error(true);
            };
          });
        } catch (e) {
          if (!(e.message === "true" || e.message === true)) {
            console.error(e);
          };
        };
      } else {
        this.currentId = "";
      };
    });
    // 监听当前选中是否为分组
    this.controlPanel.listeningGroupChange((data, list, temporary) => {
      this.temporaryGroup = temporary || {};
      this.currentGroupMembers = [];
      try {
        Object.keys(list).forEach((key) => {
          var gather_ = Object.keys(list[key]["gather"]);
          if (~gather_.indexOf(this.currentId)) {
            this.currentGroupMembers = gather_;
            throw new Error(true);
          }
        });
      } catch (e) {
        if (!(e.message === "true" || e.message === true)) {
          console.error(e);
        } else {
          return;
        }
      }
      if (temporary && temporary.gather) {
        this.currentGroupMembers = Object.keys(temporary.gather);
      }
    });
    // 监听事件变化
    this.controlPanel.listeningEventChange((bindEvent,currentEventGather,combined,eventObj)=>{
      this.eventObj = eventObj;
    });
    // 监听缩放比例
    this.controlPanel.listeningZoomChange((zoomValue)=>{
      this.zoomValue = zoomValue;
    });
  },
  beforeDestroy() {
    this.controlPanel.resetFreePanel(true);
  },
  methods: {
    setCurrentControl(id) {
      this.controlPanel.setCurrentControl(id);
    },
    scrollHandle(e) {
      this.scrollTop = e.target.scrollTop;
      this.scrollHeight = e.target.scrollHeight;
    },
    clickEvent(item) {
      this.flag = true;
      this.setCurrentControl(item.id);
      setTimeout(() => {
        if (this.flag) {
          this.triggeringEvent("click",item);
        }
      }, 200);
    },
    dblclickEvent(item) {
      this.flag = false;
      this.triggeringEvent("dblclick",item);
    },
    triggeringEvent(type,item){
      if (this.eventObj.bindEvent && this.eventObj.bindEvent[item.id] && this.eventObj.bindEvent[item.id][type]) {
        var e = this.eventObj.bindEvent[item.id][type];
        if (this.eventObj.eventGather[item.id][e.funcId]) {
          var func = eval(unescape(this.eventObj.eventGather[item.id][e.funcId]['fun']));
          func.call(this.controlPanel.useThis(item.id),...(e.paramet instanceof Array ? e.paramet : [e.paramet]));
        } else if (this.eventObj.eventGather["mainPanel"][e.funcId]) {
          var func = eval(unescape(this.eventObj.eventGather["mainPanel"][e.funcId]['fun']));
          func.call(this.controlPanel.useThis(item.id),...(e.paramet instanceof Array ? e.paramet : [e.paramet]));
        }
      }
    },
  },
};
</script>

<style lang="scss" scope>
#mainPanelPage {
  box-sizing: border-box;
  background: #f6f6f6;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
#mainPanelPage::-webkit-scrollbar {
  width: 3px !important;
}
#mainPanelPage::-webkit-scrollbar-thumb {
  border-radius: 3px !important;
  -webkit-box-shadow: inset 0 0 3px rgba(200, 200, 200, 0.5) !important;
  background: rgba(200, 200, 200, 0.5) !important;
}
#mainPanelPage::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(200, 200, 200, 0.2) !important;
  border-radius: 3px !important;
  background: rgba(200, 200, 200, 0.2) !important;
}
.basisStyle {
  display: inline-block;
  -webkit-user-select: none;
}
.currentBorder {
  box-sizing: border-box;
  -moz-box-shadow: 0px 0px 8px #05d2f4;
  -webkit-box-shadow: 0px 0px 8px #05d2f4;
  box-shadow: 0px 0px 8px #05d2f4;
}
.sameGroup {
  box-sizing: border-box;
  -moz-box-shadow: 0px 0px 8px #9ce6f3;
  -webkit-box-shadow: 0px 0px 8px #9ce6f3;
  box-shadow: 0px 0px 8px #9ce6f3;
}
.groupMember {
  opacity: 0.3;
}
.topRightAngle ,
.topLeftAngle ,
.bottomRightAngle ,
.bottomLeftAngle {
  width: 6px;
  height: 6px;
  position: absolute;
  z-index: 10002;
  cursor: crosshair;
}
.topRightAngle {
  top: -3px;
  right: -3px;
}
.topLeftAngle {
  top: -3px;
  left: -3px;
}
.bottomRightAngle {
  bottom: -3px;
  right: -3px;
}
.bottomLeftAngle {
  bottom: -3px;
  left: -3px;
}
.topAlignment,
.bottomAlignment,
.leftAlignment,
.rightAlignment{
  position: absolute;
  z-index: 999999;
}
.topAlignment,
.bottomAlignment{
  width: 10000px!important;
  border-left: 0!important;
  border-right: 0!important;
  border-bottom: 0!important;
  left: 50%;
  transform: translateX(-50%);
}
.leftAlignment,
.rightAlignment{
  height: 10000px!important;
  border-right: 0!important;
  border-top: 0!important;
  border-bottom: 0!important;
  top: 50%;
  transform: translateY(-50%);
}
.alignmentLineStyle{
  border: 1px dashed #05d2f4;
}
</style>
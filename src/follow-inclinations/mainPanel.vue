<template>
  <div
    id="mainPanelPage"
    :style="[freeStyle,{
      transform:'scale('+zoomValue+')'
    }]"
    @click.stop="setCurrentControl('mainPanel')"
    @scroll="scrollHandle">
    <template v-for="item in componentList">
      <div
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
            :positioning="item.positioning"
            :eventGather="item.eventGather"
            :bindEvent="item.bindEvent">
          </component>
        </div>
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
      // 页面事件集合
      eventGather: {
        touchPeak:{
          name:"页面滑动顶部",
          fun:escape(`((...paramet)=>{ })`)
        },
        touchGround:{
          name:"页面滑动底部",
          fun:escape(`((...paramet)=>{ })`)
        },
        
      },
      // 接收当前是否设置分组
      groupState: false,
      // 存放组件列表
      componentList: [],
      // 分组集合
      temporaryGroup: {},
      // 存放当前操作组件所属分组的成员
      currentGroupMembers: [],
      // 当前选中id
      currentId: "",
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
        if (this.eventGather["touchPeak"]) {
          eval(unescape(this.eventGather["touchPeak"]['fun']))();
        }
      } else {
        if (
          Number(this.freeStyle.height.replace(/px/, "")) + newV ==
          this.scrollHeight
        ) {
          if (this.eventGather["touchGround"]) {
            eval(unescape(this.eventGather["touchGround"]['fun']))();
          }
        }
      }
    },
  },
  created() {
    // 监听切换当前选中操作的组件
    this.controlPanel.listeningCurrentSwitch((data) => {
      if (data) {
        this.currentId = data.id;
      } else {
        this.currentId = "";
      }
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
      setTimeout(() => {
        if (this.flag) {
          this.setCurrentControl(item.id);
          if (item.bindEvent && item.bindEvent.click) {
            var e = item.bindEvent.click;
            if (item.eventGather[e.funcId]) {
              var func = eval(unescape(item.eventGather[e.funcId]['fun']));
              func.call(this.controlPanel.useThis(item.id),...(e.paramet instanceof Array ? e.paramet : [e.paramet]));
            } else if (this.eventGather[e.funcId]) {
              var func = eval(unescape(this.eventGather[e.funcId]['fun']));
              func.call(this.controlPanel.useThis(item.id),...(e.paramet instanceof Array ? e.paramet : [e.paramet]));
            }
          };
        }
      }, 200);
    },
    dblclickEvent(item) {
      this.flag = false;
      if (item.bindEvent && item.bindEvent.dblclick) {
        var e = item.bindEvent.dblclick;
        if (item.eventGather[e.funcId]) {
          var func = eval(unescape(item.eventGather[e.funcId]['fun']));
          func.call(this.controlPanel.useThis(item.id),...(e.paramet instanceof Array ? e.paramet : [e.paramet]));
        } else if (this.eventGather[e.funcId]) {
          var func = eval(unescape(this.eventGather[e.funcId]['fun']));
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
</style>
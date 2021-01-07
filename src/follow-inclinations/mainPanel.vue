<template>
  <div 
    id="mainPanelPage" 
    :style="[freeStyle]"
    @click.stop="setCurrentControl('mainPanel')"
    @scroll="scrollHandle">
    <template v-for="item in componentList">
      <div 
        :ref="item.id"
        :key="item.id"
        :style="[(item.positioning||{}),{
          cursor:(item.positioning?'move':'default')
        }]"
        :class="{
          basisStyle: true,
          currentBorder:(currentId===item.id)
        }" @click.stop="setCurrentControl(item.id)">
        <template v-if="item.positioning&&item.freeStyle.height&&item.freeStyle.width">
          <div :ref="'topRightAngle_'+item.id" class="topRightAngle"></div>
          <div :ref="'topLeftAngle_'+item.id" class="topLeftAngle"></div>
          <div :ref="'bottomRightAngle_'+item.id" class="bottomRightAngle"></div>
          <div :ref="'bottomLeftAngle_'+item.id" class="bottomLeftAngle"></div>
        </template>
        <div style="pointer-events:none">
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
</template>

<script>
export default {
  props:["controlPanel"],
  data() {
    return {
      id:"mainPanel",
      // 主控板页面样式
      freeStyle:{
        width: '375px',
        height: '812px',
        background: '',
      },
      // 当前选中id
      currentId:"",
      // 存放组件列表
      componentList:[],
      // 当前内容高度
      scrollHeight:812,
      // 当前滚动高度
      scrollTop:0,
    };
  },
  watch:{
    "freeStyle.height"(newV){
      this.scrollHeight = (Number(newV.replace(/px/, ''))+this.scrollTop);
    }
  },
  created(){
    // 监听切换当前选中操作的组件
    this.controlPanel.listeningCurrentSwitch((data)=>{
      if(data){
        this.currentId = data.id;
      }else{
        this.currentId = "";
      };
    });
  },
  methods: {
    setCurrentControl(id){
      this.controlPanel.setCurrentControl(id);
    },
    scrollHandle(e){
      this.scrollTop = e.target.scrollTop;
      this.scrollHeight = e.target.scrollHeight;
    }
  }
};
</script>

<style lang="scss" scope>
#mainPanelPage{
  box-sizing: border-box;
  background: #eee;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
#mainPanelPage::-webkit-scrollbar {
  width: 3px!important;
}
#mainPanelPage::-webkit-scrollbar-thumb {
  border-radius: 3px!important;
  -webkit-box-shadow: inset 0 0 3px rgba(200,200,200,0.5)!important;
  background:  rgba(200,200,200,0.5)!important;
}
#mainPanelPage::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(200,200,200,0.2)!important;
  border-radius: 3px!important;
  background:  rgba(200,200,200,0.2)!important;
}
.basisStyle{
  display: inline-block;
}
.currentBorder{
  box-sizing: border-box;
  -moz-box-shadow:0px 0px 8px #000; 
  -webkit-box-shadow:0px 0px 8px #000; 
  box-shadow:0px 0px 8px #000;
};
.topRightAngle {
  width: 6px;
  height: 6px;
  position: absolute;
  top: -3px;
  right: -3px;
  z-index: 10002;
  cursor: crosshair;
}
.topLeftAngle {
  width: 6px;
  height: 6px;
  position: absolute;
  top: -3px;
  left: -3px;
  z-index: 10002;
  cursor: crosshair;
}
.bottomRightAngle {
  width: 6px;
  height: 6px;
  position: absolute;
  bottom: -3px;
  right: -3px;
  z-index: 10002;
  cursor: crosshair;
}
.bottomLeftAngle {
  width: 6px;
  height: 6px;
  position: absolute;
  bottom: -3px;
  left: -3px;
  z-index: 10002;
  cursor: crosshair;
}
</style>
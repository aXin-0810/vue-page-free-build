## vue 随心所欲搭建自由页面

  * 页面编辑器，可以自定义注册组件。然后通过拖拽移动，缩放，自由修改样式，数据，事件，以及其他数据，生成一个自定义的页面。然后获取对应的json数据。

## 原作者

  * levy

## 创建时间

  * 2021-1-7

## demo图片
  
  * demo项目地址：www.mml-kj.com/free/
  
  ![demo图片](https://github.com/aXin-0810/vue-page-free-build/blob/master/1610013227657.jpg)

  ![demo图片](https://github.com/aXin-0810/vue-page-free-build/blob/master/16100132276573.jpg)

## 第一步 安装依赖
```javascript

// 第一步 安装依赖
npm install vue-page-free-build

```

## 第二步 组件注册
* 新建一个组件注册的js文件（registrationFile.js）

```javascript

/**
 * @description 插件
 */
import free from "vue-page-free-build";

/**
 * @description 需要注册的组件
 */
import textVue from "./component/textVue.vue";
import imageVue from "./component/imageVue.vue";

export const freePanel = new free.createFreePanel({
  components:[{
    name:"textVue",
    component:textVue
  },{
    name:"imageVue",
    component:imageVue
  }]
});

/**
 * 获取操控
 */
export const controlPanel = new free.controlFreePanel(freePanel.freeTransit);

```

## freePanel构造组件

```javascript
freePanel.component
```

## controlPanel构造函数方法列表

| 基础方法                              | 参数                                        | 方法名字                                           |
| ---------------------------------- | -------------------------------------- | ---------------------------------------------- |
| controlPanel.addComponent | name/组件名字，bool/默认false(true为绝对定位) | 添加指定组件 |
| controlPanel.removeComponent | 默认删除当前选中，id/组件id | 删除指定组件  |
| controlPanel.setStyle | key/修改的字段，value/修改值 | 修改选中组件的样式 |
| controlPanel.setData | key/修改的字段，value/修改值 | 修改选中组件的数据 |
| controlPanel.setPositioning| key/修改的字段，value/修改值 | 绝对定位的组件修改定位位置，也可以通过拖拽移动，和缩放 |
| controlPanel.setConfig | key/修改的字段，value/修改值 | 设置更多配置数据 |
| controlPanel.setCurrentControl | id/组件id | 点击组件时设置当前可以操控的组件 |
| controlPanel.setZoomValue | number/缩放值 | 设置当前面板缩放级别 |
| controlPanel.listeningCurrentSwitch | callback/回调函数 | 监听当前操作组件切换变化 |
| controlPanel.listeningCurrentChange | callback/回调函数 | 监听当前操作记录|
| controlPanel.listeningZoomChange | callback/回调函数 | 监听面板缩放 |
| controlPanel.rollBack | 无 | 返回上一步操作 |
| controlPanel.nextStep | 无 | 前进一步操作|
| controlPanel.echoComponent | list/列表数据  | 回显页面 |
| controlPanel.resetFreePanel | bool/默认false，true深度重置会注销监听事件 | 重置面板构造器 |
| controlPanel.savePhaseData | 无 | 保存当前进度操作页面数据 |


| 分组功能                              | 参数                                        | 方法名字                                           |
| ----------------------------------- | ------------------------------------- | --------------------------------------------- |
| controlPanel.createGroup|无 |创建分组|
| controlPanel.delGroup|groupId/组id|删除分组|
| controlPanel.setGroup|groupId/组id|开启修改分组成员|
| controlPanel.determineGroup|无|在开启设置分组后，确定当前分组成员的修改|
| controlPanel.getGroup|groupId/组id|获取分组数据|
| controlPanel.listeningGroupChange|callback/回调函数|监听分组数据的变化|
| controlPanel.setGroupMemberName|groupId/组id，label/名字|设置分组名字|
| controlPanel.setGroupName|groupId/组id，id/组件id，label/名字|设置组件名字|


| 事件功能                              | 参数                                        | 方法名字                                           |
| ----------------------------------- | ------------------------------------- | --------------------------------------------- |
| controlPanel.addPageEvent|functionName/方法名称， functionStr/方法函数转换字符串为参数 |添加页面事件功能，所有组件可以使用 |
| controlPanel.upPageEvent|funcId/方法id， options.functionName，options.functionStr|修改页面事件功能|
| controlPanel.removePageEvent|funcId/方法id|删除页面事件功能|
| controlPanel.addComponentEvent|functionName/方法名称， functionStr/方法函数转换字符串为参数 |添加组件事件功能，只有该组件能使用 |
| controlPanel.upComponentEvent|funcId/方法id， options.functionName，options.functionStr|修改组件事件功能|
| controlPanel.removeComponentEvent|funcId/方法id|删除组件事件功能|
| controlPanel.bindComponentEvent|way/事件类型， funcId/方法id， paramet/携带参数|给当前选中组件绑定事件函数 |
| controlPanel.removeBindComponentEvent|way/事件类型|给当前选中组件解除绑定事件|
| controlPanel.listeningEventChange|callback/回调函数|监听事件函数的变化，与绑定事件的变化|


## 第三步 在vue中引用控办组件
```javascript

<template>
  <div >
    <!-- :controlPanel="controlPanel" 必要操作，把控制器传给面板 -->
    <freePanel :controlPanel="controlPanel"></freePanel>
  </div>
</template>

<script>
import { freePanel, controlPanel } from "**/**/**/registrationFile.js";
export default {
  components: {
    freePanel: freePanel.component,
    // ......
  },
  data() {
    return {
      controlPanel:controlPanel,
      // ......
    };
  },
  beforeDestroy(){
    // 页面销毁时重置构造器
    controlPanel.resetFreePanel(true);
  }
  // ......

};
</script>
```

## 组件开发规范（../../textVue.vue 为例）
```javascript
<template>
  <div :style="freeStyle">{{freeData.text}}</div>
</template>

<script>
export default {
  props: {
    // 注册需要修改的样式(将会通过props接收修改值)
    freeStyle: {
      type: Object,
      default: () => {
        return {
          width: '100px',
          height: 'auto',
          fontSize: '14px',
          color: 'red',
        };
      },
    },
    // 注册需要修改的数据(将会通过props接收修改值)
    freeData: {
      type: Object,
      default: () => {
        return {
          text:"文本内容"
        };
      },
    },
    // 注册需要修改的更多配置数据(将会通过props接收修改值)
    freeConfig: {
      type: Object,
      default: () => {
        return {
          animation:""
        };
      },
    },

    // ......
  },

  // ......
};
</script>

<style lang="scss" scope>
</style>
```


## 更新时间

  * 2021-1-7 （levy）

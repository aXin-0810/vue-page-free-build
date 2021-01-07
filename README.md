## vue 随心所欲搭建自由页面

  * 页面编辑器，可以自定义注册组件。然后通过拖拽移动，缩放，自由修改样式，数据，事件，以及其他数据，生成一个自定义的页面。然后获取对应的json数据。

## 原作者

  * levy

## 创建时间

  * 2021-1-7

## demo图片
  
  * demo项目地址：******
  
  ![avatar](http://www.mml-kj.com/npmImg/WechatIMG203.png)

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
* 获取方法 

```javascript

freePanel.component

```

## controlPanel构造函数方法列表

| 方法                              | 参数                                        | 方法名字                                           |
| ----------------------------------- | --------------------------------------------- | ------------------------------------------------------ |
| controlPanel.addComponent           | name/组件名字，bool/默认false(true为绝对定位) | 添加指定组件                                     |
| controlPanel.removeComponent        | 默认删除当前选中，id/组件id        | 删除指定组件                                     |
| controlPanel.setStyle               | key/修改的字段，value/修改值         | 修改选中组件的样式                            |
| controlPanel.setData                | key/修改的字段，value/修改值         | 修改选中组件的数据                            |
| controlPanel.setPositioning         | key/修改的字段，value/修改值         | 绝对定位的组件修改定位位置，也可以通过拖拽移动，和缩放 |
| controlPanel.setConfig              | key/修改的字段，value/修改值         | 设置更多配置数据                               |
| controlPanel.setCurrentControl      | id/组件id                                   | 点击组件时设置当前可以操控的组件       |
| controlPanel.listeningCurrentSwitch | callback/回调函数                         | 监听当前操作组件切换变化                   |
| controlPanel.listeningCurrentChange | callback/回调函数                         | 监听当前操作记录                   |
| controlPanel.rollBack               | 无                                           | 返回上一步操作                                  |
| controlPanel.nextStep               | 无                                           | 前进一步操作                                     |
| controlPanel.echoComponent          | list/列表数据                             | 回显页面                                           |
| controlPanel.resetFreePanel         | bool/默认false，true深度重置会注销监听事件 | 重置面板构造器                                  |
| controlPanel.savePhaseData          | 无                                           | 保存当前进度操作页面数据                   |

```javascript

// 添加组件
controlPanel.addComponent("textVue"); //顺排
controlPanel.addComponent("textVue",true); //绝对定位

// 删除组件
controlPanel.removeComponent(id);

// 设置当前选中样式
controlPanel.setStyle("width","100px");

// 设置当前选中数据
controlPanel.setData("text","新数据");

// 设置定位
controlPanel.setPositioning("left","100px");

// 设置更多自定义配置
controlPanel.setConfig("animation","type");

// 设置当前选中
controlPanel.setCurrentControl(id);

// 监听当前操作组件切换变化
controlPanel.listeningCurrentSwitch((data)=>{
  //data为选中组件实例
});

// 监听当前操作记录
controlPanel.listeningCurrentChange((newData,index,list)=>{
  // newData最新操作
  // index第几步
  // list操作记录列表
});

// 回滚上一步
controlPanel.rollBack();

// 前进一步
controlPanel.nextStep();

// 回显,数组来源于保存的数据
controlPanel.echoComponent([]);

// 重置面板（在面板组件将要销毁时执行）
controlPanel.resetFreePanel();

//保存当前步骤数据（会清空操作记录）
var saveList = controlPanel.savePhaseData();

// saveList为当前页面的数据

```
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

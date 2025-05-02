# PRD转Prefab结构CSV输入文件提示词模板

## 1. 目标
请根据以下PRD描述，梳理出UI界面的节点结构，并以CSV表格形式输出，字段包括：
**节点名、父节点、类型、组件、资源、属性、备注**。

## 2. 输出格式
请严格按照如下CSV格式输出（首行为字段名）：

```
节点名,父节点,类型,组件,资源,属性,备注
VictoryView,,Node,,,"{width:1920,height:1080}",结算页根节点
BgMask,VictoryView,Sprite,,victory_bg.png,"{opacity:180}",全屏半透明背景
Panel,VictoryView,Node,,,"{layout:'vertical'}",主内容面板
Title,Panel,Label,,victory_title.png,"{fontSize:64,align:'center'}",胜利标题
StarGroup,Panel,Node,,,"{layout:'horizontal'}",星级评价容器
Star1,StarGroup,Sprite,,star.png,"{state:'normal'}",星级1
...
```

## 3. 参考要素
- **节点名**：每个UI元素的唯一名称，建议与PRD、设计稿、脚本属性一致。
- **父节点**：该节点的直接父级（根节点留空）。
- **类型**：Node、Sprite、Label、Button、Prefab等。
- **组件**：附加组件（如Button、Spine、Animation等），可多选。
- **资源**：图片、动画、音效等资源文件名。
- **属性**：锚点、尺寸、对齐、颜色、交互等（可用JSON或key=value对）。
- **备注**：用途说明、特殊交互、动画等。

## 4. 生成要求
- 只输出CSV表格内容，不要输出多余解释。
- 层级结构要清晰，父子关系准确。
- 资源、属性、备注尽量详细，便于美术和开发理解。
- 可根据PRD内容适当扩展字段。

## 5. 示例提示词

> 请根据以下PRD描述，梳理VictoryView结算页的Prefab结构，并以CSV格式输出，字段为：节点名、父节点、类型、组件、资源、属性、备注。请确保层级、资源、属性、用途等信息准确完整。

---
如需针对具体PRD内容的定制化模板，请补充PRD片段。 
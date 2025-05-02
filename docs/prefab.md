# 结算页Prefab结构说明（VictoryView & DefeatView）

## VictoryView Prefab结构

### 1. 总体结构
```
VictoryView (根节点, Node)
├── BgMask           (Sprite, 半透明黑色/水墨背景, 覆盖全屏)
├── Panel            (Node, 主内容面板, 居中)
│   ├── Title        (Label, "胜利"艺术字, 居中)
│   ├── PandaAnim    (Node/Prefab, 熊猫庆祝动画, 居中)
│   ├── StarGroup    (Node, 星级评价, 横向排列, 包含3个Star)
│   │   ├── Star1    (Sprite, 星级灰/亮)
│   │   ├── Star2    (Sprite, 星级灰/亮)
│   │   └── Star3    (Sprite, 星级灰/亮)
│   ├── ScoreInfo    (Node, 分数/能量统计, 纵向排列)
│   │   ├── ScoreIcon (Sprite, 分数图标)
│   │   ├── ScoreLabel(Label, 分数字)
│   │   ├── EnergyIcon(Sprite, 能量条图标)
│   │   └── EnergyLabel(Label, 五行能量统计)
│   ├── RewardGroup  (Node, 奖励展示, 横向排列, 动态生成奖励项)
│   │   ├── RewardItem1 (Node, 奖励图标+数量Label)
│   │   ├── RewardItem2 (Node, 奖励图标+数量Label)
│   │   └── ...
│   ├── BtnContinue  (Button, "继续"/"下一关")
│   ├── BtnRetry     (Button, "重玩")
│   └── BtnBack      (Button, "返回主页/地图")
```

### 2. 关键节点说明
- **BgMask**：全屏半透明背景，点击无响应。
- **Panel**：主内容容器，所有UI元素居中排列。
- **Title**：胜利大字艺术字，可用Label或Sprite。
- **PandaAnim**：熊猫胜利动画，可用Spine/帧动画/切换Sprite。
- **StarGroup/Star1-3**：3个星级Sprite，支持高亮/灰显。
- **ScoreInfo**：分数与能量统计区，包含分数和五行能量。
- **RewardGroup/RewardItem**：奖励展示区，每个奖励为图标+数量。
- **BtnContinue/BtnRetry/BtnBack**：底部横向排列的按钮。

### 3. 命名规范
- 节点命名与脚本属性、资源文档一致，便于自动绑定。
- 动态奖励项建议命名为RewardItem1、RewardItem2等。

### 4. 资源引用
- 所有图片、动画资源请参考 victory_art_assets.csv。
- 按需扩展特效、音效等子节点。

### 5. 位置与布局描述（推荐）
- 建议在csv的"属性"字段中补充每个节点的`x`、`y`、`anchorX`、`anchorY`、`width`、`height`等信息。
- 例如：`{"x":0,"y":-300,"width":200,"height":80,"anchorX":0.5,"anchorY":0.5}`
- 自动化工具可解析这些属性，生成Prefab JSON时写入节点的`position`、`anchorPoint`、`contentSize`等字段。
- 如未指定，工具可用默认值（如居中、父容器自动布局等）。

---

## DefeatView Prefab结构

### 1. 总体结构
```
DefeatView (根节点, Node)
├── BgMask           (Sprite, 半透明黑色/水墨背景, 覆盖全屏)
├── Panel            (Node, 主内容面板, 居中)
│   ├── Title        (Label, "失败"/"再接再厉"艺术字, 居中)
│   ├── PandaAnim    (Node/Prefab, 熊猫失落动画, 居中)
│   ├── ScoreInfo    (Node, 分数/能量统计, 纵向排列)
│   │   ├── ScoreIcon (Sprite, 分数图标)
│   │   ├── ScoreLabel(Label, 分数字)
│   │   ├── EnergyIcon(Sprite, 能量条图标)
│   │   └── EnergyLabel(Label, 五行能量统计)
│   ├── ReasonBg     (Sprite, 失败原因底图)
│   ├── ReasonLabel  (Label, 失败原因)
│   ├── BtnRetry     (Button, "重试")
│   ├── BtnBack      (Button, "返回主页/地图")
│   └── BtnContinue  (Button, "续关"，可选)
```

### 2. 关键节点说明
- **BgMask**：全屏半透明背景，点击无响应。
- **Panel**：主内容容器，所有UI元素居中排列。
- **Title**：失败/再接再厉大字艺术字，可用Label或Sprite。
- **PandaAnim**：熊猫失落动画，可用Spine/帧动画/切换Sprite。
- **ScoreInfo**：分数与能量统计区，包含分数和五行能量。
- **ReasonBg/ReasonLabel**：失败原因底图与文字说明。
- **BtnRetry/BtnBack/BtnContinue**：底部横向排列的按钮，BtnContinue为可选。

### 3. 命名规范
- 节点命名与脚本属性、资源文档一致，便于自动绑定。

### 4. 资源引用
- 所有图片、动画资源请参考 defeat_art_assets.csv。
- 按需扩展特效、音效等子节点。

### 5. 位置与布局描述（推荐）
- 建议在csv的"属性"字段中补充每个节点的`x`、`y`、`anchorX`、`anchorY`、`width`、`height`等信息。
- 例如：`{"x":0,"y":-300,"width":200,"height":80,"anchorX":0.5,"anchorY":0.5}`
- 自动化工具可解析这些属性，生成Prefab JSON时写入节点的`position`、`anchorPoint`、`contentSize`等字段。
- 如未指定，工具可用默认值（如居中、父容器自动布局等）。

## 5. 自动化生成工具建议

### 5.1 工具目标
- 自动从Excel/CSV/JSON等结构化数据批量生成Prefab结构说明文档。
- 支持节点层级、类型、属性、资源、命名等自动输出，减少手工维护成本。
- 可扩展为自动生成Cocos Creator节点树、脚本属性绑定模板等。

### 5.2 推荐输入格式（详细说明）

#### 5.2.1 Excel/CSV格式
- **字段定义：**
  - 节点名：唯一标识节点的名称，建议与Prefab/脚本属性一致。
  - 父节点：该节点的父级节点名，根节点留空。
  - 类型：Node/Sprite/Label/Button/Prefab等。
  - 组件：附加组件（如Button、Spine、Animation等），可多选或逗号分隔。
  - 资源：引用的图片、动画、音效等资源文件名。
  - 属性：锚点、尺寸、对齐、颜色、交互、坐标x/y等（可用JSON或key=value对）。
  - 备注：说明用途、特殊交互、动画等。

- **典型CSV样例：**
```
节点名,父节点,类型,组件,资源,属性,备注
VictoryView,,Node,,,"{width:1920,height:1080}",结算页根节点
BgMask,VictoryView,Sprite,,victory_bg.png,"{opacity:180}",全屏半透明背景
Panel,VictoryView,Node,,,"{layout:'vertical'}",主内容面板
Title,Panel,Label,,victory_title.png,"{fontSize:64,align:'center'}",胜利标题
StarGroup,Panel,Node,,,"{layout:'horizontal'}",星级评价容器
Star1,StarGroup,Sprite,,star.png,"{state:'normal'}",星级1
Star2,StarGroup,Sprite,,star.png,"{state:'normal'}",星级2
Star3,StarGroup,Sprite,,star.png,"{state:'normal'}",星级3
BtnContinue,Panel,Button,Button,btn_continue.png,"{x:0,y:-300,width:200,height:80,anchorX:0.5,anchorY:0.5}",继续按钮
...（可扩展更多字段）
```
- **适用场景：**
  - 团队协作，表格可由美术、策划、开发共同维护。
  - 易于批量导入/导出、自动生成文档或节点树。

- **注意事项：**
  - 字段顺序可自定义，但需保证唯一标识和层级关系。
  - 属性字段建议用JSON或key=value对，便于扩展。

#### 5.2.2 JSON格式
- **结构说明：**
  - 采用嵌套结构，直接映射节点树。
  - 每个节点为一个对象，包含name、type、children、resource、component、props等字段。

- **典型JSON样例：**
```json
{
  "name": "VictoryView",
  "type": "Node",
  "props": {"width":1920,"height":1080},
  "children": [
    {
      "name": "BgMask",
      "type": "Sprite",
      "resource": "victory_bg.png",
      "props": {"opacity":180}
    },
    {
      "name": "Panel",
      "type": "Node",
      "props": {"layout":"vertical"},
      "children": [
        {"name": "Title", "type": "Label", "resource": "victory_title.png", "props": {"fontSize":64}},
        {"name": "BtnContinue", "type": "Button", "resource": "btn_continue.png", "props": {"x":0,"y":-300,"width":200,"height":80,"anchorX":0.5,"anchorY":0.5}}
      ]
    }
  ]
}
```
- **适用场景：**
  - 适合自动化脚本、代码生成、复杂嵌套结构。
  - 易于与前端/后端系统对接。

- **注意事项：**
  - 保证每个节点有唯一name，children为数组。
  - props字段可灵活扩展，支持自定义属性。

---
如需输入模板、字段校验规则或自动转换脚本，请继续指定。 
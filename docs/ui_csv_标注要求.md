# UI界面CSV标注要求文档

## 1. 总体目标

- **目的**：通过结构化CSV，精确描述每个UI节点的层级、类型、资源、布局属性（位置、尺寸、锚点等），实现UI自动化生成与高效协作。
- **适用范围**：所有游戏主界面、弹窗、功能页等（如LoadingView、HomeView、GameView、VictoryView、DefeatView、MapView等）。

---

## 2. CSV字段定义

| 字段名      | 说明                                                         | 示例                                  |
|-------------|--------------------------------------------------------------|---------------------------------------|
| 节点名      | 节点唯一名称，建议与Prefab/脚本属性一致                      | Logo、StartButton、ScoreLabel         |
| 父节点      | 父级节点名称，根节点留空                                      | HomeView、Panel、TopBar_Bg            |
| 类型        | 节点类型（Node/Sprite/Label/Button/Spine等）                  | Sprite、Label、Button                 |
| 组件        | 附加组件（如Button、Spine、Animation等，可多选或逗号分隔）    | Button、Spine                         |
| 资源        | 关联的图片/动画/音效等资源文件名                              | home_bg.png、btn_start.png            |
| 属性        | 节点布局属性，**JSON格式**，包含x/y/width/height/anchor等     | {"x":0,"y":600,"width":512,"height":128,"anchorX":0.5,"anchorY":0.5} |
| 备注        | 用途说明、交互、动画、特殊说明等                              | "主按钮"，"顶部Logo"，"动态生成"      |

---

## 3. 标注内容要求

### 3.1 必须标注的属性
- **x, y**：节点相对于父节点的中心坐标（像素，建议以设计稿中心为原点，向右为x正，向上为y正）。
- **width, height**：节点内容区域宽高（像素）。
- **anchorX, anchorY**：锚点（0~1，0为左/下，1为右/上，0.5为居中）。
- **如有特殊对齐/布局**，可在属性中补充（如layout:'horizontal'）。

### 3.2 推荐补充的属性
- **opacity**：透明度（0~255）。
- **visible**：是否初始可见（true/false）。
- **layout**：父节点如有横向/纵向自动布局，可注明（如layout:'horizontal'）。
- **fontSize、color**：Label类节点建议补充字体大小、颜色等。

### 3.3 资源命名规范
- 资源文件名需与美术资源表一致，便于自动绑定。
- 动画/Spine节点请注明.skel/.png等资源。

---

## 4. 标注示例

```csv
节点名,父节点,类型,组件,资源,属性,备注
HomeView,,Node,,,"{width:1080,height:1920,anchorX:0.5,anchorY:0.5,x:0,y:0}",主界面根节点
Background,HomeView,Sprite,,home_bg.png,"{x:0,y:0,width:1080,height:1920,anchorX:0.5,anchorY:0.5}",主界面背景
Logo,HomeView,Sprite,,logo.png,"{x:0,y:600,width:512,height:128,anchorX:0.5,anchorY:0.5}",顶部Logo
StartButton,HomeView,Button,Button,start_btn.png,"{x:0,y:-200,width:320,height:100,anchorX:0.5,anchorY:0.5}",主按钮
CoinIcon,TopBar_Bg,Sprite,,coin_icon.png,"{x:-300,y:0,width:48,height:48,anchorX:0.5,anchorY:0.5}",元宝图标
CoinLabel,TopBar_Bg,Label,,,"{x:-240,y:0,width:100,height:40,anchorX:0.5,anchorY:0.5}",元宝数值文本
```

---

## 5. 标注流程建议

1. **设计师/美术**在设计稿中标注所有UI元素的中心坐标、尺寸、锚点。
2. **输出CSV**，每个节点一行，字段齐全，属性字段为JSON格式。
3. **与资源表/Prefab/脚本命名保持一致**，便于自动化工具一键生成Prefab结构。
4. **如有动态生成节点**，在备注中注明"动态生成"。
5. **如有特殊交互/动画**，在备注中补充说明。

---

## 6. 常见问题与注意事项

- **锚点与坐标**：锚点决定坐标的参考点，务必与设计稿一致。
- **父子层级**：父节点必须先于子节点出现，避免层级混乱。
- **属性JSON格式**：属性字段必须为合法JSON，便于自动解析。
- **资源一致性**：资源名与美术资源表、实际文件保持一致。

---

## 7. 附加说明

- 如需批量标注，可用Excel/Google表格，导出为CSV。
- 如需自动化脚本/模板，可联系开发同事提供。

---

如有疑问或需范例模板，请联系开发团队。
**本规范适用于所有XForge+CocosCreator项目UI标注与自动化流程。** 
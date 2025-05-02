# 从界面截图生成UI标注CSV的提示词模板

---

**请根据以下界面截图，识别并输出每个UI元素的标注信息，生成结构化CSV，字段要求如下：**

- 节点名：每个UI元素的唯一名称，建议与Prefab/脚本属性一致。
- 父节点：该节点的父级节点名称，根节点留空。
- 类型：节点类型（如Node、Sprite、Label、Button、Spine等）。
- 组件：附加组件（如Button、Spine、Animation等，可多选或逗号分隔）。
- 资源：关联的图片/动画/音效等资源文件名（如xxx.png、xxx.skel）。
- 属性：节点布局属性，**JSON格式**，包含x、y、width、height、anchorX、anchorY等（如{"x":0,"y":600,"width":512,"height":128,"anchorX":0.5,"anchorY":0.5}）。
- 备注：用途说明、交互、动画、特殊说明等。

**标注要求：**
- x/y为节点中心相对父节点的坐标（像素，建议以设计稿中心为原点，向右为x正，向上为y正）。
- width/height为节点内容区域宽高（像素）。
- anchorX/anchorY为锚点（0~1，0为左/下，1为右/上，0.5为居中）。
- 如有特殊对齐/布局，可在属性中补充（如layout:'horizontal'）。
- 资源名需与美术资源表一致。
- 动画/Spine节点请注明.skel/.png等资源。
- 如有动态生成节点，在备注中注明"动态生成"。
- 属性字段必须为合法JSON，便于自动解析。

**输出格式示例：**

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

**请根据上传的界面截图，完整输出上述格式的CSV，确保每个UI元素都被标注，属性字段为JSON格式，便于自动化工具解析。**

---

如需进一步细化（如字体、颜色、透明度、布局方式等），可在属性字段补充。
如有疑问，请参考《UI界面CSV标注要求文档》或联系开发团队。 
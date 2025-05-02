# DefeatView Prefab结构说明

## 1. 总体结构
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

## 2. 关键节点说明
- **BgMask**：全屏半透明背景，点击无响应。
- **Panel**：主内容容器，所有UI元素居中排列。
- **Title**：失败/再接再厉大字艺术字，可用Label或Sprite。
- **PandaAnim**：熊猫失落动画，可用Spine/帧动画/切换Sprite。
- **ScoreInfo**：分数与能量统计区，包含分数和五行能量。
- **ReasonBg/ReasonLabel**：失败原因底图与文字说明。
- **BtnRetry/BtnBack/BtnContinue**：底部横向排列的按钮，BtnContinue为可选。

## 3. 命名规范
- 节点命名与脚本属性、资源文档一致，便于自动绑定。

## 4. 资源引用
- 所有图片、动画资源请参考 defeat_art_assets.csv。
- 按需扩展特效、音效等子节点。

---
如需更详细的Prefab结构或脚本实现方案，请继续指定。 
# DefeatView UI 绑定文档

## 1. 主要节点结构

```
DefeatView (根节点)
├── BgMask           (Sprite，半透明背景)
├── Panel            (Node，主内容面板)
│   ├── Title        (Label，"失败"/"再接再厉")
│   ├── PandaAnim    (Node/Prefab，熊猫失落动画)
│   ├── ScoreInfo    (Node，分数/能量统计)
│   ├── ReasonBg     (Sprite，失败原因底图)
│   ├── ReasonLabel  (Label，失败原因)
│   ├── BtnRetry     (Button，"重试")
│   ├── BtnBack      (Button，"返回主页/地图")
│   └── BtnContinue  (Button，"续关"，可选)
```

## 2. 脚本属性绑定建议（DefeatView.ts）

```ts
@property(Label) titleLabel: Label = null;
@property(Node) pandaAnim: Node = null;
@property(Node) scoreInfo: Node = null;
@property(Sprite) reasonBg: Sprite = null;
@property(Label) reasonLabel: Label = null;
@property(Button) btnRetry: Button = null;
@property(Button) btnBack: Button = null;
@property(Button) btnContinue: Button = null; // 可选
```

## 3. 绑定说明
- **titleLabel** 绑定到 Title 节点（Label组件）
- **pandaAnim** 绑定到 PandaAnim 节点（可为Spine/帧动画/Prefab）
- **scoreInfo** 绑定到 ScoreInfo 节点（分数、能量Label/Sprite）
- **reasonBg** 绑定到 ReasonBg 节点（Sprite组件）
- **reasonLabel** 绑定到 ReasonLabel 节点（Label组件）
- **btnRetry** 绑定到 BtnRetry 按钮节点
- **btnBack** 绑定到 BtnBack 按钮节点
- **btnContinue** 绑定到 BtnContinue 按钮节点（如有续关功能）

## 4. 资源与节点命名建议
- 所有图片、动画资源请参考 defeat_art_assets.csv
- 节点命名与脚本属性保持一致，便于自动绑定
- 按需可扩展如动画特效、音效节点

---
如需更详细的Prefab结构或脚本实现方案，请继续指定。 
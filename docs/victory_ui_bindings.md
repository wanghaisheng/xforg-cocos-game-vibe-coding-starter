# VictoryView UI 绑定文档

## 1. 主要节点结构

```
VictoryView (根节点)
├── BgMask           (Sprite，半透明背景)
├── Panel            (Node，主内容面板)
│   ├── Title        (Label，"胜利")
│   ├── PandaAnim    (Node/Prefab，熊猫庆祝动画)
│   ├── StarGroup    (Node，星级评价)
│   ├── ScoreInfo    (Node，分数/步数/能量统计)
│   ├── RewardGroup  (Node，奖励展示)
│   ├── BtnContinue  (Button，"继续"/"下一关")
│   ├── BtnRetry     (Button，"重玩")
│   └── BtnBack      (Button，"返回主页/地图")
```

## 2. 脚本属性绑定建议（VictoryView.ts）

```ts
@property(Label) titleLabel: Label = null;
@property(Node) pandaAnim: Node = null;
@property(Node) starGroup: Node = null;
@property(Node) scoreInfo: Node = null;
@property(Node) rewardGroup: Node = null;
@property(Button) btnContinue: Button = null;
@property(Button) btnRetry: Button = null;
@property(Button) btnBack: Button = null;
```

## 3. 绑定说明
- **titleLabel** 绑定到 Title 节点（Label组件）
- **pandaAnim** 绑定到 PandaAnim 节点（可为Spine/帧动画/Prefab）
- **starGroup** 绑定到 StarGroup 节点（包含3个星级Sprite）
- **scoreInfo** 绑定到 ScoreInfo 节点（可包含分数、步数、能量Label/Sprite）
- **rewardGroup** 绑定到 RewardGroup 节点（奖励图标与数量Label）
- **btnContinue** 绑定到 BtnContinue 按钮节点
- **btnRetry** 绑定到 BtnRetry 按钮节点
- **btnBack** 绑定到 BtnBack 按钮节点

## 4. 资源与节点命名建议
- 所有图片、动画资源请参考 victory_art_assets.csv
- 节点命名与脚本属性保持一致，便于自动绑定
- 按需可扩展如动画特效、音效节点

---
如需DefeatView绑定文档或更详细的Prefab结构，请继续指定。 
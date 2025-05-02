# VictoryView Prefab结构说明

## 1. 总体结构
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

## 2. 关键节点说明
- **BgMask**：全屏半透明背景，点击无响应。
- **Panel**：主内容容器，所有UI元素居中排列。
- **Title**：胜利大字艺术字，可用Label或Sprite。
- **PandaAnim**：熊猫胜利动画，可用Spine/帧动画/切换Sprite。
- **StarGroup/Star1-3**：3个星级Sprite，支持高亮/灰显。
- **ScoreInfo**：分数与能量统计区，包含分数和五行能量。
- **RewardGroup/RewardItem**：奖励展示区，每个奖励为图标+数量。
- **BtnContinue/BtnRetry/BtnBack**：底部横向排列的按钮。

## 3. 命名规范
- 节点命名与脚本属性、资源文档一致，便于自动绑定。
- 动态奖励项建议命名为RewardItem1、RewardItem2等。

## 4. 资源引用
- 所有图片、动画资源请参考 victory_art_assets.csv。
- 按需扩展特效、音效等子节点。

---
如需DefeatView的Prefab结构说明，请继续指定。 
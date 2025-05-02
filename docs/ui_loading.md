# LoadingView UI 搭建文档

## 1. 设计参考
- 参考界面：`input/loading.png`
- 风格定位：水墨中国风，简洁、雅致，突出熊猫和进度条。

## 2. 节点结构建议

```
LoadingView (根节点)
├── Logo         (Sprite/Label，游戏Logo)
├── Panda        (Sprite/Node，熊猫形象)
├── ProgressBar  (ProgressBar，加载进度条)
│   └── Bar      (Sprite，进度条填充)
├── TipLabel     (Label，加载提示文本)
└── TipsArea     (Label/ScrollView，小贴士区域，可选)
```

## 3. 详细布局说明
- **Logo**：位于顶部居中，使用 input/loading.png 中的艺术字或单独Logo资源。
- **Panda**：Logo下方居中，使用 input/loading.png 中的熊猫形象，可静态也可后续加动画。
- **ProgressBar**：熊猫下方，宽度适中，风格与整体协调，建议用 ProgressBar 组件实现。
- **TipLabel**：进度条下方，显示"正在加载，请稍候..."等提示。
- **TipsArea**（可选）：底部区域，显示五行或玩法相关小知识，可用 Label 或 ScrollView 实现多条轮播。

## 4. 组件类型与绑定建议
- Logo：Sprite 或 Label
- Panda：Sprite（后续可加动画组件）
- ProgressBar：ProgressBar 组件
- Bar：Sprite，作为 ProgressBar 的填充条
- TipLabel：Label
- TipsArea：Label 或 ScrollView（如需多条小贴士）

## 5. 脚本绑定建议
在 LoadingView.ts 中用 `@property` 绑定上述节点，示例：

```ts
@property(ProgressBar)
progressBar: ProgressBar = null;
@property(Label)
tipLabel: Label = null;
@property(Node)
pandaNode: Node = null;
```

## 6. 美术风格说明
- 整体采用水墨风格或淡雅底色，突出中国风。
- 进度条可用墨色/绿色/金色等与五行相关的色彩。
- 熊猫形象要可爱、醒目，吸引玩家注意力。
- 可适当添加水墨晕染、竹叶等装饰元素。

## 7. 交互与动画建议（可选）
- 进度条随加载进度平滑增长。
- 熊猫可做简单呼吸、眨眼等动画。
- 小贴士可定时切换或滚动。

---

如需进一步细化动画、节点命名规范或与美术资源对接细节，请补充说明。 
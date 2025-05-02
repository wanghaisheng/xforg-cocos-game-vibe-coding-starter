# GameView UI 搭建与绑定文档

## 1. 设计参考
- 参考资源清单：`game_art_assets.csv`
- 风格定位：水墨中国风，棋盘与五行元素突出，熊猫形象生动。

## 2. 节点结构建议

```
GameView (根节点)
├── Background         (Sprite，主玩法背景)
├── TopBar             (Node，顶部信息区)
│   ├── TopBar_Bg      (Sprite，顶部信息栏背景)
│   ├── PandaStatus    (Node，熊猫状态区)
│   │   ├── Panda      (Sprite/Node，熊猫形象)
│   │   ├── StatusLabel(Label，熊猫状态文本)
│   │   └── FiveBar    (Node，五行能量指示器)
│   │       ├── FiveBar_Bg (Sprite)
│   │       ├── FiveBar_Fill_Wood (Sprite)
│   │       ├── FiveBar_Fill_Fire (Sprite)
│   │       ├── FiveBar_Fill_Earth (Sprite)
│   │       ├── FiveBar_Fill_Metal (Sprite)
│   │       └── FiveBar_Fill_Water (Sprite)
│   ├── GoalLabel      (Label，关卡目标)
│   ├── StepLabel      (Label，步数/分数)
│   └── PauseBtn       (Button，暂停按钮)
├── BoardArea          (Node，棋盘区)
│   ├── BoardBg        (Sprite，棋盘背景)
│   └── GridCells      (Node，格子节点，动态生成)
├── BlockGroupArea     (Node，待选块组区)
│   ├── BlockGroup_Bg  (Sprite，块组背景)
│   ├── BlockGroup1    (Node/Prefab)
│   ├── BlockGroup2    (Node/Prefab)
│   └── BlockGroup3    (Node/Prefab)
├── ToolBar            (Node，道具栏)
│   ├── ToolBar_Bg     (Sprite，道具栏背景)
│   ├── ToolBtn1       (Button)
│   ├── ToolBtn2       (Button)
│   └── ToolBtn3       (Button)
```

## 3. 详细布局说明
- **Background**：全屏棋盘底图，水墨风。
- **TopBar**：顶部信息区，含熊猫状态、五行能量、目标、步数、暂停。
- **BoardArea**：中部棋盘区，动态生成格子和方块。
- **BlockGroupArea**：底部待选块组区，显示2-3个可拖拽块组。
- **ToolBar**：底部道具栏，显示可用道具。

## 4. 组件类型与绑定建议
- Background、TopBar_Bg、BoardBg、BlockGroup_Bg、ToolBar_Bg、FiveBar相关：Sprite
- Panda：Sprite（后续可加动画组件）
- StatusLabel、GoalLabel、StepLabel：Label
- PauseBtn、ToolBtn1、ToolBtn2、ToolBtn3：Button
- GridCells、BlockGroup1-3：Node/Prefab（动态生成）

## 5. 脚本绑定建议
在 GameView.ts 中用 `@property` 绑定上述节点，示例：

```ts
@property(Button)
pauseBtn: Button = null;
@property(Label)
goalLabel: Label = null;
@property(Label)
stepLabel: Label = null;
@property(Sprite)
panda: Sprite = null;
@property(Label)
statusLabel: Label = null;
@property(Sprite)
fiveBarFillWood: Sprite = null;
// ... 其他五行能量条
@property(Node)
boardArea: Node = null;
@property(Prefab)
gridCellPrefab: Prefab = null;
@property(Node)
blockGroupArea: Node = null;
@property(Prefab)
blockGroupPrefab: Prefab = null;
@property(Button)
toolBtn1: Button = null;
// ... 其他节点
```

## 6. 美术风格说明
- 整体采用水墨风格，棋盘与五行元素色彩分明。
- 熊猫形象生动可爱，能量条与方块色彩呼应五行。
- 按钮、道具栏等UI元素风格统一，突出中国风细节。

## 7. 交互与动画建议（可选）
- 棋盘支持拖拽放置、消除动画。
- 熊猫状态、能量条随游戏进程动态变化。
- 道具按钮有高亮、冷却等反馈。
- 方块、棋盘、能量条等有消除、增长等特效。

---

如需进一步细化动画、节点命名规范或与美术资源对接细节，请补充说明。 
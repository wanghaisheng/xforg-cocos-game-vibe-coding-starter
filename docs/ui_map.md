# MapView UI 搭建与绑定文档

## 1. 设计参考
- 参考资源清单：`map_art_assets.csv`
- 风格定位：水墨中国风，画卷式地图，关卡节点清晰，突出探索感。

## 2. 节点结构建议

```
MapView (根节点)
├── Background         (Sprite，地图背景)
├── TopBar             (Node，顶部栏)
│   ├── TopBar_Bg      (Sprite，顶部栏背景)
│   ├── BackBtn        (Button，返回按钮)
│   └── AreaTitle      (Label，区域标题)
├── MapScroll          (ScrollView/Node，地图画卷)
│   ├── LevelNode      (Button/Node，关卡节点，动态生成)
│   ├── LevelNode_Locked (Sprite/Node，未解锁节点，可选)
│   ├── LevelNode_Star (Sprite/Node，星级图标，动态生成)
│   └── PlayerMarker   (Sprite/Node，玩家当前位置)
├── ScrollBar          (Sprite，地图滚动条，可选)
└── LevelInfoPopup     (Node，关卡信息弹窗，可选)
    ├── LevelInfoPopup_Bg   (Sprite，弹窗背景)
    ├── LevelInfo_Title     (Label，关卡标题)
    ├── LevelInfo_Target    (Label，关卡目标)
    ├── LevelInfo_Reward    (Label，奖励)
    ├── LevelInfo_StartBtn  (Button，开始按钮)
    └── LevelInfo_CloseBtn  (Button，关闭按钮)
```

## 3. 详细布局说明
- **Background**：全屏地图底图，水墨风画卷。
- **TopBar**：顶部横向排列，含返回按钮和区域标题。
- **MapScroll**：地图主体，支持横向或纵向滚动，动态生成关卡节点。
- **LevelNode**：关卡节点，显示编号、星级，支持解锁/未解锁状态。
- **PlayerMarker**：标记玩家当前位置。
- **LevelInfoPopup**：点击关卡节点弹出，显示关卡目标、奖励、开始按钮。

## 4. 组件类型与绑定建议
- Background、TopBar_Bg、LevelNode、LevelNode_Locked、LevelNode_Star、PlayerMarker、ScrollBar、LevelInfoPopup_Bg：Sprite
- BackBtn、LevelNode、LevelInfo_StartBtn、LevelInfo_CloseBtn：Button
- AreaTitle、LevelInfo_Title、LevelInfo_Target、LevelInfo_Reward：Label
- MapScroll：ScrollView 或 Node（动态生成子节点）

## 5. 脚本绑定建议
在 MapView.ts 中用 `@property` 绑定上述节点，示例：

```ts
@property(Button)
backBtn: Button = null;
@property(Label)
areaTitle: Label = null;
@property(Node)
mapScroll: Node = null;
@property(Prefab)
levelNodePrefab: Prefab = null;
@property(Sprite)
playerMarker: Sprite = null;
@property(Node)
levelInfoPopup: Node = null;
// ... 其他节点
```

## 6. 美术风格说明
- 整体采用水墨风格，地图为画卷式，关卡节点与主流程突出。
- 关卡节点、星级、玩家标记等元素风格统一，突出探索与成长感。
- 可适当添加山水、竹林等装饰元素。

## 7. 交互与动画建议（可选）
- 地图支持平滑滚动，关卡节点动态生成。
- 关卡节点点击弹出信息弹窗。
- 玩家标记可有跳动或特效。
- 关卡解锁/完成有动画反馈。

---

如需进一步细化动画、节点命名规范或与美术资源对接细节，请补充说明。 
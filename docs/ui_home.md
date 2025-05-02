# HomeView UI 搭建文档

## 1. 设计参考
- 参考资源清单：`home_art_assets.csv`
- 风格定位：水墨中国风，温馨、简洁，突出熊猫和主按钮。

## 2. 节点结构建议

```
HomeView (根节点)
├── Background     (Sprite，主界面背景)
├── TopBar         (Node，货币栏)
│   ├── TopBar_Bg  (Sprite，货币栏背景)
│   ├── CoinIcon   (Sprite，元宝图标)
│   ├── CoinLabel  (Label，元宝数值)
│   ├── PowerIcon  (Sprite，体力图标)
│   └── PowerLabel (Label，体力数值)
├── PandaArea      (Node，熊猫形象及欢迎语)
│   ├── Panda      (Sprite/Node，熊猫形象)
│   └── Welcome    (Label，欢迎语)
├── StartButton    (Button/Node，主按钮)
├── FuncButtons    (Node，功能按钮区)
│   ├── SettingBtn (Button)
│   ├── ShopBtn    (Button)
│   ├── SignBtn    (Button)
│   └── AchievementBtn (Button)
```

## 3. 详细布局说明
- **Background**：全屏底图，水墨风竹林或小屋。
- **TopBar**：顶部横向排列，显示元宝、体力等。
- **PandaArea**：中部居中，熊猫形象下方可显示欢迎语。
- **StartButton**：熊猫下方，最大最醒目，主引导按钮。
- **FuncButtons**：底部横向排列，功能按钮区。

## 4. 组件类型与绑定建议
- Background：Sprite
- TopBar_Bg、CoinIcon、PowerIcon：Sprite
- CoinLabel、PowerLabel、Welcome：Label
- Panda：Sprite（后续可加动画组件）
- StartButton、SettingBtn、ShopBtn、SignBtn、AchievementBtn：Button（可用Node+Sprite+Label组合）

## 5. 脚本绑定建议
在 HomeView.ts 中用 `@property` 绑定上述节点，示例：

```ts
@property(Button)
startButton: Button = null;
@property(Sprite)
panda: Sprite = null;
@property(Label)
welcomeLabel: Label = null;
// ... 其他节点
```

## 6. 美术风格说明
- 整体采用水墨风格，色调温馨、明快。
- 熊猫形象可爱、憨态可掬。
- 按钮、货币栏等UI元素风格统一，突出中国风细节。
- 可适当添加竹叶、祥云等装饰元素。

## 7. 交互与动画建议（可选）
- 熊猫可做简单互动动画（如眨眼、挥手）。
- StartButton 按下有缩放/特效反馈。
- 货币栏数值动态刷新。
- 功能按钮可有高亮或提示红点。

---

如需进一步细化动画、节点命名规范或与美术资源对接细节，请补充说明。 
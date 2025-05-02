# 《五行悟境：熊猫平衡之道》开发任务拆解（基于XForge）

## 1. 目录结构建议

参考XForge最佳实践，结合PRD页面需求，建议如下：

```
├─assets
│   ├─app
│   │  ├─app.ts           // app单例
│   │  ├─handle.ts        // 初始化回调
│   │  └─setting.ts       // UI/音频等全局配置
│   │
│   ├─app-appinit         // 首屏（Loading）
│   │   └─LoadingView.ts  // 加载页面脚本
│   │
│   ├─app-builtin
│   │  ├─app-manager      // 管理器（UI、音频、定时器、事件等）
│   │  ├─app-control      // 控制器（如关卡、熊猫状态、棋盘等）
│   │  └─app-model        // 数据（如五行能量、关卡进度、玩家信息等）
│   │
│   ├─app-bundle
│   │  ├─app-view         // UI界面
│   │  │   ├─HomeView.ts          // 主菜单
│   │  │   ├─MapView.ts           // 关卡地图
│   │  │   ├─GameView.ts          // 游戏主界面
│   │  │   ├─VictoryView.ts       // 胜利
│   │  │   ├─DefeatView.ts        // 失败
│   │  │   ├─SettingsView.ts      // 设置
│   │  │   └─ShopView.ts          // 商店
│   │  └─app-sound        // 音效/音乐
│   │
│   ├─res-bundle          // 动态资源
│   └─res-native          // 静态资源
│
├─app                    // 框架代码
└─pkg                    // 扩展包
```

---

## 2. 页面与核心功能拆解

### 1. LoadingView（加载页）
- 资源加载、进度展示、主题引入。
- 继承BaseView，重写beforeShow/onShow等生命周期。

### 2. HomeView（主菜单）
- 熊猫形象、开始游戏、货币、设置、商店等入口。
- 通过UIManager控制显示/隐藏。

### 3. MapView（关卡地图）
- 展示关卡进度、区域、星级、进入关卡。
- 关卡数据通过app.model.levels管理。

### 4. GameView（游戏主界面）
- 顶部：熊猫状态（动画、状态文字、五行能量指示器）
- 中部：棋盘（8x8/10x10）、拖拽放置、消除逻辑
- 底部：待选块组、道具栏
- 关卡目标、步数/分数、暂停等
- 主要逻辑由GameController、PandaController、BoardController等控制器分工

### 5. VictoryView/DefeatView（胜利/失败页）
- 展示结算、奖励、星级、继续/重玩/返回等

### 6. SettingsView（设置页）
- 音乐、音效、语言、账号等

### 7. ShopView（商店页）
- 货币、道具、礼包购买

---

## 3. 管理器与控制器分工

### 管理器（app-builtin/app-manager）
- UIManager（内置）
- SoundManager（内置）
- TimerManager（内置）
- EventManager（内置）
- LevelManager（自定义，管理关卡数据与进度）
- PandaManager（自定义，管理熊猫状态与五行能量）

### 控制器（app-builtin/app-control）
- GameController：主游戏流程、棋盘逻辑、消除判定
- PandaController：熊猫状态、动画、五行能量变化
- LevelController：关卡目标、胜负判定
- ShopController：商店购买逻辑
- SettingsController：设置逻辑

---

## 4. 数据模型建议（app-builtin/app-model）

- PandaData：五行能量、当前状态
- LevelData：关卡目标、地图配置、星级
- PlayerData：货币、体力、成就
- ItemData：道具、数量

---

## 5. UI与Prefab资源组织

- 每个View对应一个Prefab和脚本，放在app-bundle/app-view下
- 资源（图片、音效、动画）按五行、熊猫、棋盘、道具等分类放入res-bundle/res-native

---

## 6. 开发流程建议

1. 使用脚手架初始化项目：  
   `npx @gamex/cc-cli@latest`
2. 按上述目录结构创建文件夹和初始脚本
3. 通过菜单栏App->创建->Manager/Controller/Model/View快速生成基础代码
4. 先实现LoadingView、HomeView、GameView的基本切换和UI展示
5. 逐步实现核心玩法逻辑（棋盘、消除、熊猫状态联动）
6. 利用XForge的生命周期钩子（beforeShow/onShow等）管理UI逻辑
7. 用app.manager.ui.show/hide切换各页面
8. 用app.lib.task、storage等工具管理异步任务和本地存储
9. 通过扩展包（pkg）引入如网络、状态管理等高级功能

---

## 7. 进阶建议

- 先用静态数据和简单动画搭建主流程，后续逐步丰富美术和交互
- 充分利用XForge的分包、扩展包机制，保持项目结构清晰
- 通过app-builtin/app-model的数据绑定机制，方便UI与数据联动
- 参考XForge文档和示例项目，快速掌握高阶用法

---

如需具体某一页面的详细脚本设计、Prefab结构、或某个功能的代码实现方案，请在任务文档后补充细化。

---

## 8. 详细任务拆解与排序（分阶段推进）

### 阶段一：项目基础与主流程（最高优先级，基础依赖）

- [ ] 1.1 使用脚手架初始化项目、搭建目录结构
- [ ] 1.2 设计并实现LoadingView（加载页）
    - Prefab设计、进度条、Logo、熊猫形象、加载逻辑
    - 资源加载完成后跳转HomeView
- [ ] 1.3 设计并实现HomeView（主菜单）
    - Prefab设计、熊猫形象、开始按钮、货币栏、功能按钮区
    - 按钮跳转到地图、设置、商店等页面
- [ ] 1.4 设计并实现MapView（关卡地图）
    - Prefab设计、地图滑动、关卡节点、星级展示、进度解锁
    - 关卡数据结构设计与本地存储
    - 关卡节点点击进入关卡
- [ ] 1.5 设计并实现SettingsView（设置页）
    - Prefab设计、音量、语言、账号、帮助等
    - 音乐/音效开关与音量调节、语言切换
- [ ] 1.6 设计数据模型（PandaData、LevelData、PlayerData、ItemData）
    - TypeScript接口/类、数据本地存储、UI绑定

### 阶段二：核心玩法与主界面（依赖阶段一，难度中高）

> 核心玩法主界面与消除机制已实现，分数/能量/生克/动画等与设计文档一致。

- [x] 2.1 设计并实现GameView（游戏主界面）
    - Prefab设计（顶部熊猫区、棋盘区、底部块组与道具栏）
    - 棋盘数据结构与渲染、拖拽放置块组、消除判定与动画
    - 熊猫状态区动画与五行能量指示器联动
    - 关卡目标、步数/分数、暂停等UI逻辑
    - 道具栏与道具使用逻辑
    - 游戏胜负判定与跳转
- [x] 2.2 实现核心管理器与控制器
    - LevelManager：关卡数据加载、进度保存、星级结算
    - PandaManager：五行能量、熊猫状态、动画控制
    - GameController：棋盘逻辑、消除、道具、胜负判定
    - BoardController：棋盘数据结构、块组生成与放置
    - SettingsController：设置项存取、通知UI

### 阶段三：结算、商店与扩展功能（依赖前两阶段，难度中等）

- [ ] 3.1 设计并实现VictoryView/DefeatView（胜利/失败页）
    - Prefab设计、熊猫动画、星级、奖励、按钮
    - 奖励结算与领取逻辑、跳转逻辑
- [ ] 3.2 设计并实现ShopView（商店页）
    - Prefab设计、商品列表、分类、购买按钮
    - ShopController：商品购买、道具发放
    - 货币显示与消耗逻辑、商品数据结构
- [ ] 3.3 道具系统与道具栏功能完善
    - 道具数据结构、道具使用逻辑、UI联动
- [ ] 3.4 国际化与本地化支持
    - 语言包、文本资源、切换逻辑

### 阶段四：优化与扩展（可并行，难度中低）

- [ ] 4.1 新手引导与教程页面
- [ ] 4.2 活动、成就、每日任务等扩展功能
- [ ] 4.3 自动化测试与持续集成配置
- [ ] 4.4 性能优化与体验打磨

---

## 任务排序说明
- 阶段一为所有后续开发的基础，需优先完成。
- 阶段二为核心玩法，需在主流程跑通后重点攻关。
- 阶段三为结算、商店、道具等扩展功能，依赖前两阶段。
- 阶段四为优化与扩展，可与部分主线开发并行推进。

如需对某一阶段或任务进一步细化，请在文档后补充。 
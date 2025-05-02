# XForge + Cocos Creator 3.8 vibe coding starter- 从 PRD 到完整游戏开发实战指南

## 目录

1. 项目初始化与目录规范
2. 任务拆解与协作流程
3. UI/美术资源与CSV标注
4. 自动化Prefab生成与资源绑定
5. 代码开发与XForge最佳实践
6. 扩展包与自动化工具
7. 版本管理与团队协作
8. 常见问题与优化建议

---

## 1. 项目初始化与目录规范

- **初始化项目**  
  `npx @gamex/cc-cli@latest`  
  或使用淘宝源：  
  `npx --registry=https://registry.npmmirror.com @gamex/cc-cli@latest`

- **目录结构（XForge推荐）**
  ```
  ├─assets
  │   ├─app
  │   ├─app-appinit
  │   ├─app-builtin
  │   ├─app-bundle
  │   ├─app-scene
  │   ├─res-bundle
  │   └─res-native
  ├─app
  ├─pkg
  ├─scripts/      # 自动化脚本
  ├─docs/         # 协作/开发文档
  ├─csv/          # UI结构与资源标注CSV
  ├─prefabs/      # 自动生成的Prefab JSON
  └─input/        # 原始设计稿、截图、PRD等
  ```

- **升级/管理扩展包**
  ```bash
  npm run upgrade
  npm run package
  ```

---

## 2. 任务拆解与协作流程

- **根据prd.md拆解任务**  
  - 阶段划分：项目基础、核心玩法与UI、结算/商店/扩展、优化
  - 每阶段细化为具体任务，写入 `task.md`，标明优先级与依赖

- **团队协作建议**
  - UI/美术、策划、开发分工明确
  - 资源、节点、脚本命名规范统一
  - 采用CSV/表格驱动资源与Prefab协作

---

## 3. UI/美术资源与CSV标注

- **美术资源表**  
  - 每个页面（如HomeView、GameView等）单独维护CSV，字段包括：资源名称、类型、尺寸、目标文件名、存放路径、用途说明

- **UI结构CSV标注**  
  - 字段：节点名、父节点、类型、组件、资源、属性（JSON）、备注
  - 属性字段需包含x/y/width/height/anchorX/anchorY等，JSON格式
  - 参考文档：`docs/ui_csv_标注要求.md`、`docs/ui_csv_截图标注提示词模板.md`

- **标注流程**
  1. 设计师在设计稿中标注所有UI元素的中心坐标、尺寸、锚点
  2. 输出CSV，字段齐全，属性为JSON
  3. 与资源表/Prefab/脚本命名保持一致

---

## 4. 自动化Prefab生成与资源绑定

- **CSV转Prefab自动化脚本**  
  - 使用 `scripts/csv2ccprefab.js` 将UI CSV自动转换为Cocos Creator 3.8标准Prefab JSON
  - 支持属性映射、组件、资源名（可后续UUID替换）、自定义脚本、批量处理

- **资源UUID自动替换**  
  - 使用 `scripts/uuid_replace.js`，依赖 `uuid_map.json`（资源名到UUID的映射表）
  - 替换Prefab JSON中的资源名为UUID，确保Creator可识别

- **批量处理建议**  
  - 所有CSV、Prefab、脚本、文档分别放在 `csv/`、`prefabs/`、`scripts/`、`docs/` 文件夹
  - 可用shell脚本或Node.js批量处理

---

## 5. 代码开发与XForge最佳实践

- **管理器、控制器、数据、UI开发**  
  - 管理器：全局流程、状态、音频、事件、定时器等，位于 `assets/app-builtin/app-manager`
  - 控制器：UI间通信、数据共享，位于 `assets/app-builtin/app-controller`
  - 数据：store/data/config三类，位于 `assets/app-builtin/app-model`
  - UI：Page/Paper/Pop/Top四类，位于 `assets/app-bundle/app-view`

- **UI绑定与生命周期**  
  - beforeShow/onShow/beforeHide/onHide/onFocus/onLostFocus/onError/onShade
  - 详见 `docs/prefab.md`、`docs/victory_prefab_structure.md`、`docs/defeat_prefab_structure.md`

- **资源与Prefab自动绑定**  
  - 节点、脚本、资源命名与CSV、Prefab、代码保持一致
  - 动态节点（如棋盘格子、奖励项）在备注中注明"动态生成"

---

## 6. 扩展包与自动化工具

- **常用扩展包**  
  - 网络请求、状态管理、ECS、碰撞检测、富文本、XML解析等
  - 通过 `npm run package` 管理

- **自动化工具**  
  - CSV转Prefab脚本、UUID替换脚本、CSV转Markdown文档、PRD转CSV提示词模板等
  - 详见 `scripts/`、`tools/`、`docs/`

---

## 7. 版本管理与团队协作

- **目录规范**  
  - `scripts/`：自动化脚本
  - `docs/`：开发/设计/协作文档
  - `csv/`：UI结构与资源标注CSV
  - `prefabs/`：自动生成的Prefab JSON
  - `input/`：原始设计稿、截图、PRD等

- **协作建议**  
  - 资源、节点、脚本命名规范
  - 任务、文档、资源、代码分工明确
  - 采用自动化工具减少重复劳动

---

## 8. 常见问题与优化建议

- **Prefab导入Creator报错**：检查JSON结构、UUID、属性映射是否与Creator 3.8一致
- **资源未绑定**：确保资源名与UUID映射表一致，且Prefab JSON已替换
- **动态节点/批量生成**：在CSV备注中注明，代码中动态生成
- **目录混乱**：定期用自动化脚本整理 `scripts/`、`docs/`、`csv/`、`prefabs/` 等

---

## 附录

- [XForge官方文档](https://gitee.com/cocos2d-zp/cococs-creator-frame-3d/wikis/pages?sort_id=9433202&doc_id=5075526)
- [Cocos Creator 3.8 Prefab格式参考](https://docs.cocos.com/creator/manual/zh/asset/prefab.html)
- 示例自动化脚本、CSV模板、UUID映射脚本见 `scripts/`、`docs/`、`tools/`

---

如需进一步定制自动化流程、批量处理脚本、团队协作模板，或有特殊需求，请随时补充！

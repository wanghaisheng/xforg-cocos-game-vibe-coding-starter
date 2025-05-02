# XForge + Cocos Creator 3.8 项目开发 Step-by-Step 操作手册

## 1. 环境准备

1. 安装 [Node.js](https://nodejs.org/)（建议 LTS 版本）
2. 安装 [Cocos Creator 3.8](https://www.cocos.com/creator)
3. 配置好 npm 源（如需国内加速可用淘宝源）

---

## 2. 初始化 XForge 项目

```bash
npx @gamex/cc-cli@latest
# 或
npx --registry=https://registry.npmmirror.com @gamex/cc-cli@latest
```

---

## 3. 目录结构与资源规范

- 按 README.md 推荐结构组织目录
- 资源、脚本、文档、CSV、Prefab、设计稿分门别类
- 命名规范：资源、节点、脚本、CSV、Prefab 保持一致

---

## 4. 任务拆解与协作

1. 阅读/整理 `input/prd.md`，明确功能与页面
2. 拆解为阶段任务，写入 `docs/task.md`，标明优先级与依赖
3. 团队分工：美术、策划、开发各自认领任务

---

## 5. UI/美术资源与CSV标注

1. 美术输出资源表（如 `csv/home_art_assets.csv`），字段包括资源名、类型、尺寸、用途等
2. 设计师在设计稿中标注所有UI元素的坐标、尺寸、锚点
3. 输出UI结构CSV（如 `csv/home_prefab.csv`），字段包括节点名、父节点、类型、组件、资源、属性（JSON）、备注
4. 参考 `docs/ui_csv_标注要求.md`、`docs/ui_csv_截图标注提示词模板.md`

---

## 6. 自动化生成Prefab

1. 使用脚本将CSV转为Prefab JSON  
   ```bash
   node scripts/csv2ccprefab.js csv/home_prefab.csv prefabs/HomeView.prefab.json
   ```
2. 用 `uuid_map.json` 资源映射表，批量替换Prefab中的资源名为UUID  
   ```bash
   node scripts/uuid_replace.js prefabs/HomeView.prefab.json
   ```
3. Prefab JSON 可直接导入 Cocos Creator 3.8

---

## 7. 代码开发与XForge最佳实践

1. 按 XForge 规范开发管理器、控制器、数据、UI
2. UI脚本与Prefab节点命名保持一致，便于自动绑定
3. 动态节点（如棋盘格子、奖励项）在CSV备注中注明"动态生成"，代码中动态生成
4. 参考 `docs/prefab.md`、`docs/victory_prefab_structure.md`、`docs/defeat_prefab_structure.md`

---

## 8. 扩展包与自动化工具

- 通过 `npm run package` 管理扩展包（如网络、状态管理、ECS等）
- 自动化脚本、模板、工具详见 `scripts/`、`tools/`、`docs/`

---

## 9. 版本管理与团队协作

- 定期整理 `scripts/`、`docs/`、`csv/`、`prefabs/` 等目录
- 资源、节点、脚本命名规范，任务分工明确
- 采用自动化工具减少重复劳动

---

## 10. 常见问题与优化建议

- Prefab导入Creator报错：检查JSON结构、UUID、属性映射
- 资源未绑定：确保资源名与UUID映射表一致
- 动态节点/批量生成：CSV备注注明，代码动态生成
- 目录混乱：定期用自动化脚本整理

---

## 11. 参考与附录

- [XForge官方文档](https://gitee.com/cocos2d-zp/cococs-creator-frame-3d/wikis/pages?sort_id=9433202&doc_id=5075526)
- [Cocos Creator 3.8 Prefab格式参考](https://docs.cocos.com/creator/manual/zh/asset/prefab.html)
- 示例自动化脚本、CSV模板、UUID映射脚本见 `scripts/`、`docs/`、`tools/`

---

如需进一步定制流程、批量处理脚本、团队协作模板，或有特殊需求，请随时补充！ 
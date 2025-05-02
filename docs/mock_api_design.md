# 《五行悟境：熊猫平衡之道》项目 Mock API 设计文档

本文件梳理了基于 PRD 的所有典型后端接口，便于前端使用 MSW（Mock Service Worker）等工具进行本地开发和联调。

---

## 1. 用户与会话相关

- **POST /api/login**  
  用户登录，返回 token 和用户基础信息  
  **返回示例**：
  ```json
  { "token": "mock-token", "user": { "id": 1, "name": "Panda" } }
  ```

- **GET /api/user**  
  获取当前玩家信息（昵称、能量、货币、体力、成就等）  
  **返回示例**：
  ```json
  { "id": 1, "name": "Panda", "energy": 100, "gold": 500, "stars": 12 }
  ```

---

## 2. 关卡与地图

- **GET /api/levels**  
  获取关卡列表/地图节点（含解锁状态、星级、区域名等）  
  **返回示例**：
  ```json
  [
    { "id": 1, "name": "竹林初境", "unlocked": true, "stars": 3 },
    { "id": 2, "name": "火山试炼", "unlocked": false, "stars": 0 }
  ]
  ```

- **GET /api/level/:id**  
  获取单个关卡详细信息（目标、初始棋盘、熊猫初始状态、步数/时间限制、奖励等）  
  **返回示例**：
  ```json
  {
    "id": 1,
    "goal": "使熊猫恢复平衡",
    "board": [[0,1,0],[1,0,1]],
    "pandaState": "火旺",
    "steps": 30,
    "rewards": [{ "type": "gold", "amount": 100 }]
  }
  ```

---

## 3. 游戏过程与结算

- **POST /api/game/start**  
  开始关卡，返回初始棋盘、熊猫状态、可用道具等  
  **返回示例**：
  ```json
  {
    "levelId": 1,
    "board": [[0,1,0],[1,0,1]],
    "pandaState": "火旺",
    "availableItems": [{ "id": 1, "type": "rotate", "count": 2 }]
  }
  ```

- **POST /api/game/step**  
  提交一次玩家操作（如放置方块、使用道具），返回最新棋盘、熊猫状态、能量条、分数等  
  **返回示例**：
  ```json
  {
    "board": [[0,1,0],[1,0,1]],
    "pandaState": "平衡",
    "energy": { "wood": 40, "fire": 60, "earth": 50, "metal": 50, "water": 50 },
    "score": 1234,
    "combo": 2
  }
  ```

- **POST /api/game/finish**  
  关卡结算，返回胜利/失败、奖励、星级、熊猫最终状态等  
  **返回示例**：
  ```json
  {
    "result": "win",
    "score": 2345,
    "stars": 3,
    "rewards": [{ "type": "gold", "amount": 100 }],
    "pandaState": "平衡"
  }
  ```

---

## 4. 道具与商店

- **GET /api/shop/items**  
  获取可购买的道具/礼包列表  
  **返回示例**：
  ```json
  [
    { "id": 1, "type": "rotate", "name": "乾坤挪移", "price": 50, "currency": "gold" },
    { "id": 2, "type": "transform", "name": "点石成金", "price": 100, "currency": "gold" }
  ]
  ```

- **POST /api/shop/buy**  
  购买道具/礼包  
  **请求体**：`{ "itemId": 1 }`  
  **返回示例**：
  ```json
  { "success": true, "item": { "id": 1, "count": 1 } }
  ```

---

## 5. 活动、签到、成就

- **GET /api/daily**  
  获取每日签到/修行奖励状态  
  **返回示例**：
  ```json
  { "signed": false, "reward": { "type": "gold", "amount": 20 } }
  ```

- **POST /api/daily/sign**  
  签到  
  **返回示例**：
  ```json
  { "success": true, "reward": { "type": "gold", "amount": 20 } }
  ```

- **GET /api/achievements**  
  获取成就/图鉴列表  
  **返回示例**：
  ```json
  [
    { "id": 1, "name": "初入悟境", "unlocked": true },
    { "id": 2, "name": "五行大师", "unlocked": false }
  ]
  ```

---

## 6. 其它（如设置、排行榜等）

- **GET /api/settings**  
  获取玩家设置（音量、语言等）
- **POST /api/settings**  
  保存设置
- **GET /api/rankings**  
  获取排行榜

---

如需扩展更多接口或详细mock逻辑，请补充！ 
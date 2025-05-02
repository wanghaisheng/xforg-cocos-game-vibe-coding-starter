# MSW（Mock Service Worker）在 XForge + Cocos Creator 3.8 项目中的集成与使用指南

## 1. 安装 MSW

在项目根目录下执行：

```bash
npm install msw --save-dev
```

---

## 2. 推荐目录结构

```
scripts/
  msw/
    handlers.js      # 所有mock接口定义
    browser.js       # 启动worker
    server.js        # （可选）Node环境下的mock
```

---

## 3. 典型游戏后端接口 mock handler 示例（handlers.js）

```js
import { rest } from 'msw';

export const handlers = [
  // 用户登录
  rest.post('/api/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ token: 'mock-token', user: { id: 1, name: 'Panda' } })
    );
  }),
  // 获取玩家数据
  rest.get('/api/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ id: 1, name: 'Panda', energy: 100, gold: 500 })
    );
  }),
  // 获取关卡列表
  rest.get('/api/levels', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: '竹林初境', unlocked: true },
        { id: 2, name: '火山试炼', unlocked: false }
      ])
    );
  }),
  // 提交分数
  rest.post('/api/score', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true, newHighScore: 12345 })
    );
  }),
];
```

---

## 4. 启动 MSW Worker（browser.js）

```js
import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

---

## 5. 在 Cocos Creator Web 项目入口集成 MSW

在你的入口文件（如 `main.ts` 或 `index.js`）顶部添加：

```js
if (process.env.NODE_ENV === 'development') {
  import('./scripts/msw/browser').then(({ worker }) => {
    worker.start();
  });
}
```
> 如果你用 TypeScript，确保 tsconfig.json 允许 dynamic import。

---

## 6. 启动开发服务器

正常运行你的 Cocos Creator Web 项目（如 `npm run dev`），此时所有 `/api/*` 请求会被 MSW 拦截并返回 mock 数据。

---

## 7. 调试与扩展

- 你可以在 `handlers.js` 中随时添加、修改 mock 接口。
- 浏览器控制台会显示 MSW 的日志，方便调试。
- 支持 REST、GraphQL、WebSocket 等多种协议。
- 支持条件 mock、延迟、错误模拟等。
- 可与自动化测试框架（如 Jest、Cypress）集成。

---

## 8. 参考资料

- [MSW 官方文档](https://mswjs.io/docs/)
- [MSW REST API Mock 示例](https://mswjs.io/docs/getting-started/mocks/rest-api)

---

如需 mock 更复杂的接口、模拟错误/延迟、或与 Cocos Creator 事件/数据流结合，请随时补充你的具体需求！ 
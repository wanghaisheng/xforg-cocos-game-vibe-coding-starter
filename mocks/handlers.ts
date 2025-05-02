import { http } from 'msw';

export const handlers = [
  // 1. 用户与会话相关
  http.post('/api/login', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json({ token: 'mock-token', user: { id: 1, name: 'Panda' } })
    );
  }),
  http.get('/api/user', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json({ id: 1, name: 'Panda', energy: 100, gold: 500, stars: 12 })
    );
  }),

  // 2. 关卡与地图
  http.get('/api/levels', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json([
        { id: 1, name: '竹林初境', unlocked: true, stars: 3 },
        { id: 2, name: '火山试炼', unlocked: false, stars: 0 }
      ])
    );
  }),
  http.get('/api/level/:id', (req: any, res: any, ctx: any) => {
    const { id } = req.params;
    return res(
      ctx.json({
        id,
        goal: "使熊猫恢复平衡",
        board: [[0,1,0],[1,0,1]],
        pandaState: "火旺",
        steps: 30,
        rewards: [{ type: "gold", amount: 100 }]
      })
    );
  }),

  // 3. 游戏过程与结算
  http.post('/api/game/start', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json({
        levelId: 1,
        board: [[0,1,0],[1,0,1]],
        pandaState: "火旺",
        availableItems: [{ id: 1, type: "rotate", count: 2 }]
      })
    );
  }),
  http.post('/api/game/step', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json({
        board: [[0,1,0],[1,0,1]],
        pandaState: "平衡",
        energy: { wood: 40, fire: 60, earth: 50, metal: 50, water: 50 },
        score: 1234,
        combo: 2
      })
    );
  }),
  http.post('/api/game/finish', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json({
        result: "win",
        score: 2345,
        stars: 3,
        rewards: [{ type: "gold", amount: 100 }],
        pandaState: "平衡"
      })
    );
  }),

  // 4. 道具与商店
  http.get('/api/shop/items', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json([
        { id: 1, type: "rotate", name: "乾坤挪移", price: 50, currency: "gold" },
        { id: 2, type: "transform", name: "点石成金", price: 100, currency: "gold" }
      ])
    );
  }),
  http.post('/api/shop/buy', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json({ success: true, item: { id: 1, count: 1 } })
    );
  }),

  // 5. 活动、签到、成就
  http.get('/api/daily', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json({ signed: false, reward: { type: "gold", amount: 20 } })
    );
  }),
  http.post('/api/daily/sign', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json({ success: true, reward: { type: "gold", amount: 20 } })
    );
  }),
  http.get('/api/achievements', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json([
        { id: 1, name: "初入悟境", unlocked: true },
        { id: 2, name: "五行大师", unlocked: false }
      ])
    );
  }),

  // 6. 其它（设置、排行榜等）
  http.get('/api/settings', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json({ music: true, sound: true, language: "zh" })
    );
  }),
  http.post('/api/settings', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json({ success: true })
    );
  }),
  http.get('/api/rankings', (req: any, res: any, ctx: any) => {
    return res(
      ctx.json([
        { id: 1, name: "Panda", score: 9999 },
        { id: 2, name: "Tiger", score: 8888 }
      ])
    );
  }),
]; 
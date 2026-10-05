# YutuHub 小程序

> YutuHub 微信小程序端 —— 面向高校学生的 AI 驱动校园知识与服务社区

原生微信小程序，不套 Web、不用跨端框架。目标是贴合微信生态的加载速度与原生交互。

---

## 五个方向

小程序端与 Web 端共用同一套内容模型，频道划分保持一致：

| 方向 | 说明 |
|---|---|
| AI 工具 | 实测笔记、成本对比、提示词流程 |
| 学习 Wiki | 课程笔记、竞赛经验、办事指南的可修订词条 |
| 技能交换 | 拿会的东西换不会的东西，贡献值结算 |
| 项目组队 | 学生项目缺人时直接联系作者 |
| 校园服务 | 办事流程、自习座位这类实用信息 |

---

## 页面结构

TabBar 四页（自定义，纯 CSS 图标）：

| Tab | 页面 | 内容 |
|---|---|---|
| 首页 | `pages/index/index` | 等级卡、五大功能入口、动态信息流（骨架屏 / 错误 / 空 / 上拉分页）、精选词条 |
| 发现 | `pages/explore/explore` | 精选频道、横向话题切换、编辑精选、讨论列表（含举报入口） |
| 发布 | `pages/create/create` | 分类选择、字数校验、真机图片选择、内容安全检测、草稿自动保存 |
| 我的 | `pages/profile/profile` | 头像昵称授权、贡献值与等级进度、四项统计、我的内容、设置入口 |

非 Tab 页面：

| 页面 | 说明 |
|---|---|
| `pages/detail/detail` | 正文、AI 标识、图片、评论（独立加载 / 错误 / 空三态）、举报 |
| `package-legal/privacy` | 隐私保护指引 |
| `package-legal/agreement` | 社区公约 |
| `package-legal/points` | 贡献值规则 |
| `package-legal/report` | 举报表单 |

---

## 合规状态

审核阻塞项已全部处理：

| 项 | 状态 | 实现 |
|---|---|---|
| 举报入口 | ✅ | 详情页底部与每条评论、发现页每条讨论均有入口；`services/report.ts` 提交到 `POST /api/reports` |
| 隐私政策 | ✅ | `package-legal/privacy`，`app.json` 开启 `__usePrivacyCheck__` |
| 隐私授权回调 | ✅ | `app.ts` 的 `onNeedPrivacyAuthorization` → `services/auth.ts` 的 `handlePrivacyAuthorization` |
| 内容安全检测 | ✅ | 发布前 `wx.security.msgSecCheck`，图片选择后 `imgSecCheck`；能力未开通时回退后端 `/moderation/text` |
| 贡献值规则公示 | ✅ | `package-legal/points`，明确不可提现、不可转让 |
| AI 内容标注 | ✅ | `DetailItem.aiAssisted` / `FeedItem.aiAssisted`，命中时页面展示标识 |
| 虚构数据 | ✅ | 移除虚构高校名与编造运营数据，学校统一用「本校」 |

> 上架前仍需在微信公众平台开通「内容安全」能力，否则检测接口不可用（已实现后端回退路径）。

---

## 性能约定

| 约定 | 原因 |
|---|---|
| 只用异步 `wx.setStorage` / `wx.getStorage` | 同步 API 阻塞渲染线程。发布页此前每次按键都同步写草稿，是最严重的一处 |
| 草稿保存 500ms debounce + `flush()` | 避免按键时反复落盘，离开页面强制补写一次 |
| 点赞只 `setData` 单行 | 此前替换整个 feed 数组，列表变长后成本线性上升 |
| 信息流上拉分页 | `fetchFeed` 已支持 `page` / `limit`，页面按 10 条一页加载 |
| 骨架屏替代动画 | 保留 shimmer 作为加载反馈，去掉入场动画与多余过渡 |
| 协议页放分包 | `package-legal` 只在需要时预载，主包体积不随合规文案增长 |

---

## 技术栈

- 微信原生 + `glass-easel` + `lazyCodeLoading: requiredComponents`
- TypeScript `strict` + `noUnusedLocals` / `noUnusedParameters`
- ESLint 9 flat config + Prettier
- `services/` 双模数据层（mock / 真实请求）

---

## 目录结构

```
miniprogram/
├── app.ts                 # 入口：globalData、登录、隐私授权预热
├── app.json               # 路由、tabBar、分包、隐私开关
├── app.wxss               # 全局设计令牌与通用样式
├── sitemap.json
├── pages/
│   ├── index/             # 首页
│   ├── explore/           # 发现
│   ├── create/            # 发布
│   ├── profile/           # 我的
│   └── detail/            # 详情
├── package-legal/         # 分包：隐私 / 公约 / 贡献值 / 举报
├── components/
│   ├── navbar/            # 顶部导航
│   ├── card/              # 通用卡片容器
│   └── feature-card/      # 功能入口卡片
├── custom-tab-bar/        # 自定义底部导航
├── data/                  # 内容与配置层
│   ├── brand.ts           # 品牌信息与问候语
│   ├── feature.ts         # 功能入口、频道、话题、发布分类
│   ├── feed.ts            # 动态信息流
│   ├── detail.ts          # 详情内容与评论
│   ├── profile.ts         # 用户资料、等级模型、菜单
│   ├── policy.ts          # 合规文案
│   └── legal.ts           # 协议数据结构
├── services/              # 数据服务层
│   ├── request.ts         # 请求封装与 mockMode 判定
│   ├── auth.ts            # 登录、会话、隐私授权
│   ├── feed.ts            # 信息流 / 详情 / 评论
│   ├── user.ts            # 资料与发布
│   ├── security.ts        # 内容安全检测
│   ├── report.ts          # 举报
│   └── skill.ts           # 技能交换
└── utils/
    ├── storage.ts         # 异步存储与 debounce
    └── platform.ts        # 新版 wx API 的类型化访问
```

---

## 开发运行

### 环境

- 微信开发者工具（稳定版）
- Node.js 20+（仅用于类型检查与 lint，运行不依赖 Node）

### 命令

```bash
npm install

npm run typecheck      # tsc --noEmit
npm run lint           # eslint，0 warning 门禁
npm run format         # prettier 写入
npm run check          # typecheck + lint，提交前跑这个
```

### 打开项目

用微信开发者工具导入**仓库根目录**（不是 `miniprogram/`），AppID 换成你自己的测试号，勾选「不校验合法域名」即可在 mock 模式预览。

---

## 接入真实后端

`miniprogram/app.ts`：

```ts
const API_BASE = 'https://api.yutuhub.com/api';

globalData: {
  apiBase: API_BASE,
  mockMode: false,   // 切换后 services 走 wx.request
  loginCode: ''
}
```

`services/` 下每个函数统一形态，切换后端**不需要改页面代码**：

```ts
if (isMockMode()) {
  return mockDelay(mockData);
}
return request({ url: '/posts', data: query });
```

对接前确认：

1. 微信公众平台 → 开发管理 → 服务器域名，把 API 域名加入 `request` 白名单
2. 后端实现 `/auth/login`（code2session）、`/moderation/text`、`/reports`
3. 后端 `CORS` 不影响小程序，但需正确返回统一响应封装 `{ success, data, message }`

---

## 相关仓库

- Web 前端与后端 API：[mia03ther/YutuHub](https://github.com/mia03ther/YutuHub)
- 技术审计与重构路线：Web 仓库 `docs/TECHNICAL_AUDIT.md`

---

## License

MIT
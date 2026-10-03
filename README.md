# YutuHub Mini Program

> 屿途校园（YuTuHub）微信小程序端 —— 面向高校学生的校园信息服务平台。

屿途校园是一款面向高校学生的校园信息服务微信小程序，连接校园信息、学习交流、生活服务与资源共享。项目以**产品 Demo** 形态开源，当前处于「mock 数据驱动」阶段，未接入真实后端。

---

## 功能

| 模块 | 说明 | 状态 |
|---|---|---|
| 校园动态 | 首页信息流，含作者、标签、摘要、点赞与评论数 | ✅ 可用（mock） |
| 学习交流 | 课程互助、考研组队、资料共享与答疑 | ✅ 可用（mock） |
| 校园生活 | 校园美食、猫咪地图等生活类内容 | ✅ 可用（mock） |
| 闲置交易 | 校园内闲置流转，含价格与自提信息 | ✅ 可用（mock） |
| AI 工具 | 提示词工程与效率工具内容 | ✅ 可用（mock） |

已实现的页面能力：

- **首页** —— 品牌 Hero、五大功能入口、校园动态信息流（含加载 / 空 / 错误三态）、推荐内容分组切换
- **探索页** —— 精选频道、热门话题（支持从首页入口自动定位）、编辑精选、最新讨论
- **详情页** —— 正文分段、图片区、标签、点赞 / 收藏 / 评论（可本地发送）
- **发布页** —— 分类选择、标题正文校验、图片占位、**草稿自动保存**、发布反馈
- **个人中心** —— 用户资料、授权绑定微信头像昵称、我的内容、设置
- **自定义 TabBar** —— 纯 CSS 图标、当前页高亮指示条

---

## 技术栈

- 微信原生小程序（无任何第三方框架）
- TypeScript（`strict` 模式，零 `any`）
- Component 组件化
- Mock 数据驱动 + services 分层

---

## 项目结构

```
YutuHub-miniapp/
├── miniprogram/
│   ├── app.ts                 # 入口，globalData（mockMode / apiBase / pendingChannel）
│   ├── app.json               # 页面路由、tabBar、窗口配置
│   ├── app.wxss               # 全局设计令牌与通用样式
│   ├── sitemap.json           # 搜索收录规则
│   │
│   ├── pages/
│   │   ├── index/             # 首页
│   │   ├── explore/           # 探索
│   │   ├── profile/           # 个人中心
│   │   ├── detail/            # 内容详情
│   │   └── create/            # 发布动态
│   │
│   ├── components/
│   │   ├── navbar/            # 顶部导航（可选返回按钮）
│   │   ├── card/              # 通用卡片容器（多变体 / 圆角 / 内边距）
│   │   └── feature-card/      # 功能入口卡片（tile / wide 两种布局）
│   │
│   ├── custom-tab-bar/        # 自定义底部导航
│   │
│   ├── data/                  # Mock 数据层（按领域拆分，index.ts 统一导出）
│   │   ├── brand.ts           # 品牌信息与问候语
│   │   ├── feature.ts         # 功能入口、频道、推荐、发布分类
│   │   ├── feed.ts            # 校园动态信息流
│   │   ├── detail.ts          # 详情内容与评论
│   │   ├── profile.ts         # 用户资料与菜单
│   │   └── index.ts           # barrel
│   │
│   └── services/              # 数据服务层（mock / 真实请求双通道）
│       ├── request.ts         # 统一请求封装、mockMode 判定、模拟延迟
│       ├── auth.ts            # 微信登录与会话存储
│       ├── feed.ts            # 信息流 / 详情 / 评论 / 点赞收藏
│       ├── user.ts            # 用户资料与内容发布
│       └── market.ts          # 闲置交易
│
├── typings/                   # 微信官方类型声明 + IAppOption 全局类型
├── project.config.json        # 微信开发者工具配置
├── tsconfig.json
└── 审核风险报告.md
```

---

## 开发运行

### 环境

- 微信开发者工具（稳定版）
- Node.js 18+（仅用于类型检查，运行不依赖 Node）
- TypeScript 5.4+

### 步骤

```bash
# 1. 安装类型检查依赖
npm install

# 2. 类型检查（必须 0 error）
npm run typecheck

# 3. 用微信开发者工具打开项目根目录
#    导入时选择「小程序」项目，AppID 使用自己的测试号
```

`project.config.json` 中的 `appid` 为原作者的 AppID，Fork 后请替换为你自己的；在开发者工具中勾选「不校验合法域名」即可在 `mockMode` 下正常预览。

### 开启真实后端

`miniprogram/app.ts` 中将 `mockMode` 置为 `false`，并配置 `apiBase`：

```ts
globalData: {
  apiBase: 'https://api.yutuhub.com/api',
  mockMode: false,   // 切换后 services 走 wx.request
  loginCode: ''
}
```

`services/` 下的每个函数都遵循同一模式：

```ts
if (isMockMode()) {
  return mockDelay(mockData)
}
return request({ url: '/posts', data: query })
```

切换后端**不需要改页面代码**。

---

## 未来规划

- [ ] **阿里云后端** —— Express + MySQL，部署于阿里云 ECS
- [ ] **用户系统** —— 微信登录、OpenID 绑定、院系认证
- [ ] **内容审核** —— 接入 `msgSecCheck` / `imgSecCheck`，补齐举报与投诉入口
- [ ] **AI 助手** —— 校园问答、资料检索、内容创作辅助
- [ ] **合规基建** —— 隐私政策、用户协议、积分规则公示

> 详细的合规差距与提审检查清单见 [审核风险报告.md](./审核风险报告.md)。
> **当前形态不建议直接提交微信审核**，原因见该报告 P0 部分。

---

## 相关仓库

- 后端 API：YutuHub（`server/` Express + Prisma + SQLite → MySQL）
- Web 前端：YutuHub（Next.js）

---

## License

MIT

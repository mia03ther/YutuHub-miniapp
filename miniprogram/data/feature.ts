/**
 * Feature entries, explore channels, recommendation groups and the
 * category picker used by the publish page.
 */

import type { Tone } from './brand'

export interface FeatureEntry {
  key: string
  icon: string
  title: string
  desc: string
  tone: Tone
  badge?: string
  route: string
}

export interface CreateCategory {
  key: string
  icon: string
  title: string
  desc: string
  tone: Tone
}

export type RecommendGroup = '本周精选' | '新生必看' | '实用工具'

export interface RecommendItem {
  id: string
  detailId: string
  title: string
  desc: string
  meta: string
  tone: Tone
  group: RecommendGroup
}

export interface ExploreChannel {
  key: string
  title: string
  desc: string
  icon: string
  tone: Tone
  topics: string[]
}

export const FEATURE_ENTRIES: FeatureEntry[] = [
  {
    key: 'ai',
    icon: 'AI',
    title: 'AI 工具',
    desc: '实测笔记 · 选型不踩坑',
    tone: 'blue',
    route: '/pages/explore/explore?channel=ai'
  },
  {
    key: 'study',
    icon: '知',
    title: '学习 Wiki',
    desc: '经验沉淀 · 可修订',
    tone: 'purple',
    route: '/pages/explore/explore?channel=study'
  },
  {
    key: 'market',
    icon: '换',
    title: '技能交换',
    desc: '会什么就换什么',
    tone: 'mint',
    route: '/pages/explore/explore?channel=market'
  },
  {
    key: 'life',
    icon: '建',
    title: '项目组队',
    desc: '找队友 · 找队友',
    tone: 'orange',
    route: '/pages/explore/explore?channel=life'
  },
  {
    key: 'service',
    icon: '校',
    title: '校园服务',
    desc: '办事指南 · 避坑经验',
    tone: 'blue',
    route: '/pages/explore/explore?channel=service'
  },
  {
    key: 'more',
    icon: '更',
    title: '更多',
    desc: '全部频道',
    tone: 'purple',
    route: '/pages/explore/explore'
  }
]

export const CREATE_CATEGORIES: CreateCategory[] = [
  {
    key: 'study',
    icon: '知',
    title: '学习 Wiki',
    desc: '课程笔记 · 竞赛经验',
    tone: 'purple'
  },
  {
    key: 'ai',
    icon: 'AI',
    title: 'AI 工具实测',
    desc: '用法笔记 · 成本对比',
    tone: 'blue'
  },
  {
    key: 'market',
    icon: '换',
    title: '技能交换',
    desc: '写清能教什么、想换什么',
    tone: 'mint'
  },
  {
    key: 'life',
    icon: '建',
    title: '项目组队',
    desc: '缺什么人、在做什么',
    tone: 'orange'
  },
  {
    key: 'service',
    icon: '校',
    title: '校园服务',
    desc: '办事流程 · 实用经验',
    tone: 'blue'
  }
]

export const RECOMMEND_GROUPS: RecommendGroup[] = [
  '本周精选',
  '新生必看',
  '实用工具'
]

export const RECOMMEND_ITEMS: RecommendItem[] = [
  {
    id: 'r_01',
    detailId: 'd_study',
    title: '期末速通 · 高数上下册重点',
    desc: '12 页讲义 + 精选题，附手写批注与易错清单。',
    meta: '学习 Wiki',
    tone: 'purple',
    group: '本周精选'
  },
  {
    id: 'r_02',
    detailId: 'd_ai',
    title: 'AI 论文润色提示词包',
    desc: '中英双语模板，覆盖摘要、方法与致谢。',
    meta: 'AI 工具',
    tone: 'blue',
    group: '本周精选'
  },
  {
    id: 'r_03',
    detailId: 'd_service_map',
    title: '校园办事地图 · 教务 / 财务 / 图书馆',
    desc: '流程与所需材料清单，附线下窗口时间。',
    meta: '校园服务',
    tone: 'blue',
    group: '新生必看'
  },
  {
    id: 'r_04',
    detailId: 'd_market',
    title: '技能交换 · LaTeX 排版换前端部署',
    desc: '一对一约 40 分钟，双方都写清想换什么。',
    meta: '技能交换',
    tone: 'mint',
    group: '新生必看'
  },
  {
    id: 'r_05',
    detailId: 'd_project',
    title: '组队招募 · 校园问答机器人',
    desc: '缺一位熟悉 RAG 的同学，已有前端和数据。',
    meta: '项目组队',
    tone: 'orange',
    group: '实用工具'
  },
  {
    id: 'r_06',
    detailId: 'd_ai',
    title: '毕业季面试复盘模板',
    desc: '自我介绍 + 项目复盘 + 反问清单，可直接改写。',
    meta: 'AI 工具',
    tone: 'blue',
    group: '实用工具'
  }
]

export const EXPLORE_CHANNELS: ExploreChannel[] = [
  {
    key: 'life',
    title: '校园服务',
    desc: '办事流程、宿舍改造、社团招新与校园周边',
    icon: '校',
    tone: 'blue',
    topics: ['办事指南', '宿舍改造', '社团招新']
  },
  {
    key: 'study',
    title: '学习 Wiki',
    desc: '课程互助、考研组队、资料共享与可修订词条',
    icon: '知',
    tone: 'purple',
    topics: ['课程笔记', '考研组队', '保研经验']
  },
  {
    key: 'ai',
    title: 'AI 工具',
    desc: '提示词工程、实测笔记、论文与竞赛助手',
    icon: 'AI',
    tone: 'blue',
    topics: ['提示词', 'AI 论文', '自动化脚本']
  },
  {
    key: 'market',
    title: '技能交换',
    desc: '拿闲置技能换想要技能，贡献值结算',
    icon: '换',
    tone: 'mint',
    topics: ['排版求助', '设计诊断', '代码陪跑']
  },
  {
    key: 'event',
    title: '项目组队',
    desc: 'AI 与 Web3 学生项目，缺人时直接联系作者',
    icon: '建',
    tone: 'orange',
    topics: ['组队招募', '黑客松', '大创项目']
  }
]

export const EXPLORE_TOPICS: string[] = [
  '全部',
  '校园服务',
  '学习交流',
  'AI 工具',
  '技能交换',
  '项目组队',
  '校园活动'
]

/**
 * Channel key → explore topic. Explore reads this onLoad / onShow.
 */
export const CHANNEL_TOPIC_MAP: Record<string, string> = {
  news: '校园活动',
  food: '校园服务',
  life: '校园服务',
  service: '校园服务',
  market: '技能交换',
  skill: '技能交换',
  ai: 'AI 工具',
  cat: '校园服务',
  study: '学习交流',
  wiki: '学习交流',
  project: '项目组队',
  event: '项目组队'
}

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
    key: 'study',
    icon: '书',
    title: '学习交流',
    desc: '课程 · 考研 · 答疑',
    tone: 'blue',
    route: '/pages/explore/explore?channel=study'
  },
  {
    key: 'food',
    icon: '食',
    title: '校园美食',
    desc: '食堂测评 · 好店',
    tone: 'orange',
    route: '/pages/explore/explore?channel=food'
  },
  {
    key: 'cat',
    icon: '猫',
    title: '猫咪地图',
    desc: '云吸猫 · 出没时间',
    tone: 'mint',
    route: '/pages/explore/explore?channel=cat'
  },
  {
    key: 'market',
    icon: '市',
    title: '闲置交易',
    desc: '闲置流转 · 校园价',
    tone: 'orange',
    route: '/pages/explore/explore?channel=market'
  },
  {
    key: 'ai',
    icon: 'AI',
    title: 'AI 工具',
    desc: '提示词 · 效率插件',
    tone: 'blue',
    route: '/pages/explore/explore?channel=ai'
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
    icon: '书',
    title: '学习交流',
    desc: '课程 · 考研 · 答疑',
    tone: 'blue'
  },
  {
    key: 'food',
    icon: '食',
    title: '校园美食',
    desc: '食堂测评 · 好店',
    tone: 'orange'
  },
  {
    key: 'cat',
    icon: '猫',
    title: '猫咪地图',
    desc: '云吸猫 · 出没时间',
    tone: 'mint'
  },
  {
    key: 'market',
    icon: '市',
    title: '闲置交易',
    desc: '闲置流转 · 校园价',
    tone: 'orange'
  },
  {
    key: 'ai',
    icon: 'AI',
    title: 'AI 工具',
    desc: '提示词 · 效率插件',
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
    desc: '12 页讲义 + 200 道精选题，附学长手写批注。',
    meta: '学习交流',
    tone: 'blue',
    group: '本周精选'
  },
  {
    id: 'r_02',
    detailId: 'd_ai',
    title: 'AI 论文润色提示词包',
    desc: '中英双语 30 条模板，覆盖摘要、方法与致谢。',
    meta: 'AI 工具',
    tone: 'blue',
    group: '本周精选'
  },
  {
    id: 'r_03',
    detailId: 'd_market',
    title: '校园生存地图 · 打印店 / 维修 / 快递',
    desc: '学长学姐实地踩点整理，附营业时间。',
    meta: '校园生活',
    tone: 'orange',
    group: '新生必看'
  },
  {
    id: 'r_04',
    detailId: 'd_study',
    title: '四六级高分听力真题精听',
    desc: '逐句精听 + 原文对照，7 天打卡训练计划。',
    meta: '学习交流',
    tone: 'blue',
    group: '新生必看'
  },
  {
    id: 'r_05',
    detailId: 'd_study',
    title: '数据结构可视化实验册',
    desc: '20 个动画演示，配可在线运行的实验代码。',
    meta: '学习交流',
    tone: 'blue',
    group: '实用工具'
  },
  {
    id: 'r_06',
    detailId: 'd_ai',
    title: '毕业季面试话术模板',
    desc: '自我介绍 + 项目复盘 + 反问清单，可直接改写。',
    meta: 'AI 工具',
    tone: 'blue',
    group: '实用工具'
  }
]

export const EXPLORE_CHANNELS: ExploreChannel[] = [
  {
    key: 'life',
    title: '校园生活',
    desc: '食堂测评、宿舍改造、社团招新与city walk',
    icon: '校',
    tone: 'orange',
    topics: ['食堂翻牌', '宿舍好物', '社团招新']
  },
  {
    key: 'study',
    title: '学习交流',
    desc: '课程互助、考研组队、资料共享与答疑',
    icon: '学',
    tone: 'blue',
    topics: ['高数互助', '考研组队', '保研经验']
  },
  {
    key: 'ai',
    title: 'AI 工具',
    desc: '提示词工程、效率插件、论文与竞赛助手',
    icon: 'AI',
    tone: 'orange',
    topics: ['提示词', 'AI 论文', '自动化脚本']
  },
  {
    key: 'event',
    title: '校园活动',
    desc: '讲座、赛事、志愿服务与跨校交流报名',
    icon: '活',
    tone: 'mint',
    topics: ['百团大战', '讲座', '志愿时长']
  }
]

export const EXPLORE_TOPICS: string[] = [
  '全部',
  '校园生活',
  '校园美食',
  '学习交流',
  'AI 工具',
  '校园活动',
  '二手好物',
  '猫咪地图'
]

/**
 * Channel key → explore topic. Explore reads this onLoad / onShow.
 */
export const CHANNEL_TOPIC_MAP: Record<string, string> = {
  news: '校园活动',
  food: '校园美食',
  market: '二手好物',
  ai: 'AI 工具',
  cat: '猫咪地图',
  study: '学习交流'
}

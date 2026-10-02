export type Tone = 'purple' | 'orange' | 'mint' | 'pink' | 'blue'

export interface FeatureEntry {
  key: string
  icon: string
  title: string
  desc: string
  tone: Tone
  badge?: string
  route: string
}

export interface FeedItem {
  id: string
  author: string
  avatar: string
  avatarTone: Tone
  channel: string
  title: string
  summary: string
  cover: string
  coverFrom: string
  coverTo: string
  emoji: string
  likes: number
  comments: number
  time: string
  liked: boolean
  tags: string[]
}

export interface RecommendItem {
  id: string
  title: string
  desc: string
  emoji: string
  tone: Tone
  meta: string
  score: string
}

export interface ExploreChannel {
  key: string
  title: string
  desc: string
  emoji: string
  tone: Tone
  count: string
  followers: string
  hot: string[]
}

export interface ProfileMenuItem {
  key: string
  label: string
  value: string
  emoji: string
  tone: Tone
}

export const FEATURE_ENTRIES: FeatureEntry[] = [
  {
    key: 'news',
    icon: '📰',
    title: '校园资讯',
    desc: '教务 · 招生 · 活动',
    tone: 'purple',
    badge: 'NEW',
    route: '/pages/explore/explore?channel=news'
  },
  {
    key: 'market',
    icon: '🛍️',
    title: '二手交易',
    desc: '闲置流转',
    tone: 'orange',
    route: '/pages/explore/explore?channel=market'
  },
  {
    key: 'ai',
    icon: '✨',
    title: 'AI 工具',
    desc: '效率翻倍',
    tone: 'purple',
    badge: 'HOT',
    route: '/pages/explore/explore?channel=ai'
  },
  {
    key: 'cat',
    icon: '🐾',
    title: '校园猫咪',
    desc: '云吸猫日常',
    tone: 'mint',
    route: '/pages/explore/explore?channel=cat'
  },
  {
    key: 'study',
    icon: '📚',
    title: '学习资料',
    desc: '课程 · 笔记',
    tone: 'blue',
    route: '/pages/explore/explore?channel=study'
  }
]

export const FEED_ITEMS: FeedItem[] = [
  {
    id: 'f_1001',
    author: '屿途官方',
    avatar: '屿',
    avatarTone: 'purple',
    channel: '校园资讯',
    title: '2026 秋季学期选课系统开放预告',
    summary: '选课通道将于本周五 12:00 开放，建议提前在教务系统确认培养方案，避免与必修冲突。',
    cover: '',
    coverFrom: '#6C5CE7',
    coverTo: '#8B7BFF',
    emoji: '🎓',
    likes: 342,
    comments: 58,
    time: '10 分钟前',
    liked: false,
    tags: ['教务', '选课', '实用']
  },
  {
    id: 'f_1002',
    author: '林一一',
    avatar: '林',
    avatarTone: 'orange',
    channel: '二手交易',
    title: '毕业清仓｜九成新机械键盘 送键帽',
    summary: '宿舍搬迁出一把 cherry 轴键盘，附原装键帽和收纳包，仅校内自提，价好可小刀。',
    cover: '',
    coverFrom: '#FF7A45',
    coverTo: '#FFA56B',
    emoji: '⌨️',
    likes: 128,
    comments: 31,
    time: '1 小时前',
    liked: true,
    tags: ['闲置', '自提']
  },
  {
    id: 'f_1003',
    author: 'AI 小屿',
    avatar: 'AI',
    avatarTone: 'blue',
    channel: 'AI 工具',
    title: '用 AI 把一整学期笔记压成一页知识地图',
    summary: '实测有效的四步提示词模板，附可直接复制的 prompt，论文和考研资料都能套用。',
    cover: '',
    coverFrom: '#3D8BFF',
    coverTo: '#7BB4FF',
    emoji: '🧠',
    likes: 876,
    comments: 142,
    time: '3 小时前',
    liked: false,
    tags: ['提示词', '效率', '收藏']
  },
  {
    id: 'f_1004',
    author: '猫猫观测站',
    avatar: '猫',
    avatarTone: 'mint',
    channel: '校园猫咪',
    title: '图书馆后花园的三花今天又在晒太阳了',
    summary: '固定出没时间更新：中午 12:00 - 14:00，位置在三楼连廊尽头的花坛旁边，亲测。',
    cover: '',
    coverFrom: '#16C79A',
    coverTo: '#5FE3C0',
    emoji: '🐈',
    likes: 654,
    comments: 96,
    time: '昨天',
    liked: false,
    tags: ['云吸猫', '出没时间']
  }
]

export const RECOMMEND_ITEMS: RecommendItem[] = [
  {
    id: 'r_01',
    title: '期末速通 · 高数上下册重点',
    desc: '12 页讲义 + 200 道精选题，附学长手写批注。',
    emoji: '📐',
    tone: 'purple',
    meta: '2.4 万同学已收藏',
    score: '9.6 分'
  },
  {
    id: 'r_02',
    title: 'AI 论文润色提示词包',
    desc: '中英双语 30 条模板，覆盖摘要、方法与致谢。',
    emoji: '📝',
    tone: 'orange',
    meta: '本周新增 1.2k 次下载',
    score: '9.4 分'
  },
  {
    id: 'r_03',
    title: '校园生存地图 · 打印店 / 维修 / 快递',
    desc: '学长学姐实地踩点整理，附营业时间。',
    emoji: '🗺️',
    tone: 'blue',
    meta: '3.1 万同学在看',
    score: '9.8 分'
  },
  {
    id: 'r_04',
    title: '四六级高分听力真题精听',
    desc: '逐句精听 + 原文对照，7 天打卡训练计划。',
    emoji: '🎧',
    tone: 'mint',
    meta: '8600 条真实评价',
    score: '9.2 分'
  }
]

export const EXPLORE_CHANNELS: ExploreChannel[] = [
  {
    key: 'life',
    title: '校园生活',
    desc: '食堂测评、宿舍改造、社团招新与city walk',
    emoji: '🏫',
    tone: 'purple',
    count: '1.2w 条内容',
    followers: '3.4w 关注',
    hot: ['食堂翻牌', '宿舍好物', '社团招新']
  },
  {
    key: 'study',
    title: '学习交流',
    desc: '课程互助、考研组队、资料共享与答疑',
    emoji: '🧠',
    tone: 'blue',
    count: '8.6k 条内容',
    followers: '2.1w 关注',
    hot: ['高数互助', '考研组队', '保研经验']
  },
  {
    key: 'ai',
    title: 'AI 工具',
    desc: '提示词工程、效率插件、论文与竞赛助手',
    emoji: '🤖',
    tone: 'orange',
    count: '5.3k 条内容',
    followers: '2.8w 关注',
    hot: ['提示词', 'AI 论文', '自动化脚本']
  },
  {
    key: 'event',
    title: '校园活动',
    desc: '讲座、赛事、志愿服务与跨校交流报名',
    emoji: '🎪',
    tone: 'mint',
    count: '2.4k 条内容',
    followers: '1.5w 关注',
    hot: ['百团大战', '讲座', '志愿时长']
  }
]

export const PROFILE_MENUS: ProfileMenuItem[] = [
  {
    key: 'posts',
    label: '我的发布',
    value: '12',
    emoji: '✍️',
    tone: 'purple'
  },
  {
    key: 'favorites',
    label: '我的收藏',
    value: '38',
    emoji: '⭐',
    tone: 'orange'
  },
  {
    key: 'comments',
    label: '我的评论',
    value: '7',
    emoji: '💬',
    tone: 'blue'
  },
  {
    key: 'likes',
    label: '我的点赞',
    value: '96',
    emoji: '❤️',
    tone: 'pink'
  }
]

export const PROFILE_SETTINGS: ProfileMenuItem[] = [
  {
    key: 'notify',
    label: '消息通知',
    value: '已开启',
    emoji: '🔔',
    tone: 'purple'
  },
  {
    key: 'privacy',
    label: '隐私设置',
    value: '',
    emoji: '🛡️',
    tone: 'blue'
  },
  {
    key: 'theme',
    label: '外观主题',
    value: '浅色',
    emoji: '🎨',
    tone: 'pink'
  },
  {
    key: 'feedback',
    label: '意见反馈',
    value: '',
    emoji: '📮',
    tone: 'orange'
  },
  {
    key: 'about',
    label: '关于屿途',
    value: 'v0.1.0',
    emoji: 'ⓘ',
    tone: 'mint'
  }
]

export const MOCK_USER = {
  nickname: '屿途同学',
  wechatName: 'Yutu_2026',
  school: '屿途大学 · 计算机学院',
  avatar: '',
  signature: '把每一天过成作品集',
  level: 'LV.4',
  points: 1280,
  followers: 246,
  following: 89,
  credits: 720
}

export const EXPLORE_TOPICS: string[] = [
  '全部',
  '校园生活',
  '学习交流',
  'AI 工具',
  '校园活动',
  '二手好物',
  '云吸猫'
]

export const CHANNEL_TOPIC_MAP: Record<string, string> = {
  news: '校园活动',
  market: '二手好物',
  ai: 'AI 工具',
  cat: '云吸猫',
  study: '学习交流'
}

export function greetingByHour(hour: number): string {
  if (hour < 6) {
    return '夜深了，注意休息'
  }
  if (hour < 11) {
    return '早上好，今天也要元气满满'
  }
  if (hour < 14) {
    return '中午好，先去干饭吧'
  }
  if (hour < 18) {
    return '下午好，来点灵感'
  }
  return '晚上好，欢迎回到屿途'
}
/**
 * Campus activity feed shown on the home page and in explore.
 *
 * Channels mirror the web app: AI tools, learning Wiki, skill exchange,
 * project teaming and campus services.
 */

import type { Tone } from './brand'

export interface FeedItem {
  id: string
  detailId: string
  author: string
  avatar: string
  avatarTone: Tone
  channel: string
  title: string
  summary: string
  cover: string
  likes: number
  comments: number
  time: string
  liked: boolean
  /** Required disclosure when content was produced or edited with AI help. */
  aiAssisted: boolean
  tags: string[]
}

export const FEED_ITEMS: FeedItem[] = [
  {
    id: 'f_1001',
    detailId: 'd_service_map',
    author: '陈曦',
    avatar: '曦',
    avatarTone: 'mint',
    channel: '校园服务',
    title: '校园办事地图 · 教务 / 财务 / 图书馆',
    summary:
      '按要办的事整理，不是按部门排的。每条都实地跑过，含材料清单与窗口时间。',
    cover: '',
    likes: 342,
    comments: 58,
    time: '10 分钟前',
    liked: false,
    aiAssisted: false,
    tags: ['办事指南', '新生']
  },
  {
    id: 'f_1002',
    detailId: 'd_market',
    author: '纳比',
    avatar: '纳',
    avatarTone: 'purple',
    channel: '技能交换',
    title: '技能交换 · LaTeX 排版换前端部署',
    summary:
      '能教参考文献格式、表格跨页、数学环境冲突。想换前端部署或简历排版指导。',
    cover: '',
    likes: 128,
    comments: 31,
    time: '1 小时前',
    liked: true,
    aiAssisted: false,
    tags: ['技能交换', 'LaTeX']
  },
  {
    id: 'f_1003',
    detailId: 'd_ai',
    author: '沈遇白',
    avatar: '沈',
    avatarTone: 'blue',
    channel: 'AI 工具',
    title: '用 AI 把一整学期笔记压成一页知识地图',
    summary:
      '实测有效的四步提示词流程，附可直接复制的模板。AI 辅助整理已标注。',
    cover: '',
    likes: 876,
    comments: 142,
    time: '3 小时前',
    liked: false,
    aiAssisted: true,
    tags: ['提示词', '效率']
  },
  {
    id: 'f_1004',
    detailId: 'd_cat',
    author: '阿其',
    avatar: '其',
    avatarTone: 'blue',
    channel: '学习 Wiki',
    title: '教学楼自习座位分布 · 按时段整理',
    summary:
      '记了两个星期的使用情况：哪个时段哪层空、有插座的排在哪、安静程度排序。',
    cover: '',
    likes: 654,
    comments: 96,
    time: '昨天',
    liked: false,
    aiAssisted: false,
    tags: ['自习', '实用']
  },
  {
    id: 'f_1005',
    detailId: 'd_project',
    author: '林知远',
    avatar: '林',
    avatarTone: 'purple',
    channel: '项目组队',
    title: '组队招募 · 校园问答机器人',
    summary: '已抓取 400+ 篇通知公告并搭好检索链路。缺向量检索和交互设计同学。',
    cover: '',
    likes: 214,
    comments: 47,
    time: '昨天',
    liked: false,
    aiAssisted: false,
    tags: ['组队', 'AI']
  }
]

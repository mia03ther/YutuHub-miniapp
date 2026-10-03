/**
 * Campus activity feed shown on the home page and in explore.
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
  tags: string[]
}

export const FEED_ITEMS: FeedItem[] = [
  {
    id: 'f_1001',
    detailId: 'd_study',
    author: '屿途官方',
    avatar: '屿',
    avatarTone: 'orange',
    channel: '校园资讯',
    title: '2026 秋季学期选课系统开放预告',
    summary: '选课通道将于本周五 12:00 开放，建议提前在教务系统确认培养方案，避免与必修冲突。',
    cover: '',
    likes: 342,
    comments: 58,
    time: '10 分钟前',
    liked: false,
    tags: ['教务', '选课', '实用']
  },
  {
    id: 'f_1002',
    detailId: 'd_market',
    author: '林一一',
    avatar: '林',
    avatarTone: 'orange',
    channel: '二手交易',
    title: '毕业清仓｜九成新机械键盘 送键帽',
    summary: '宿舍搬迁出一把 cherry 轴键盘，附原装键帽和收纳包，仅校内自提，价好可小刀。',
    cover: '',
    likes: 128,
    comments: 31,
    time: '1 小时前',
    liked: true,
    tags: ['闲置', '自提']
  },
  {
    id: 'f_1003',
    detailId: 'd_ai',
    author: 'AI 小屿',
    avatar: 'AI',
    avatarTone: 'blue',
    channel: 'AI 工具',
    title: '用 AI 把一整学期笔记压成一页知识地图',
    summary: '实测有效的四步提示词模板，附可直接复制的 prompt，论文和考研资料都能套用。',
    cover: '',
    likes: 876,
    comments: 142,
    time: '3 小时前',
    liked: false,
    tags: ['提示词', '效率', '收藏']
  },
  {
    id: 'f_1004',
    detailId: 'd_cat',
    author: '猫猫观测站',
    avatar: '猫',
    avatarTone: 'mint',
    channel: '校园猫咪',
    title: '图书馆后花园的三花今天又在晒太阳了',
    summary: '固定出没时间更新：中午 12:00 - 14:00，位置在三楼连廊尽头的花坛旁边，亲测。',
    cover: '',
    likes: 654,
    comments: 96,
    time: '昨天',
    liked: false,
    tags: ['云吸猫', '出没时间']
  }
]

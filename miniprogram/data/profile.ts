/**
 * Profile page data: current user and the menu lists.
 */

import type { Tone } from './brand'

export interface ProfileMenuItem {
  key: string
  label: string
  value: string
  icon: string
  tone: Tone
}

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

export const PROFILE_MENUS: ProfileMenuItem[] = [
  {
    key: 'posts',
    label: '我的发布',
    value: '12',
    icon: '文',
    tone: 'orange'
  },
  {
    key: 'favorites',
    label: '我的收藏',
    value: '38',
    icon: '收',
    tone: 'orange'
  },
  {
    key: 'comments',
    label: '我的评论',
    value: '7',
    icon: '评',
    tone: 'blue'
  },
  {
    key: 'likes',
    label: '我的点赞',
    value: '96',
    icon: '赞',
    tone: 'orange'
  }
]

export const PROFILE_SETTINGS: ProfileMenuItem[] = [
  {
    key: 'notify',
    label: '消息通知',
    value: '已开启',
    icon: '响',
    tone: 'blue'
  },
  {
    key: 'privacy',
    label: '隐私设置',
    value: '',
    icon: '安',
    tone: 'blue'
  },
  {
    key: 'theme',
    label: '外观主题',
    value: '浅色',
    icon: '色',
    tone: 'orange'
  },
  {
    key: 'feedback',
    label: '意见反馈',
    value: '',
    icon: '馈',
    tone: 'orange'
  },
  {
    key: 'about',
    label: '关于屿途',
    value: 'v0.2.0',
    icon: 'i',
    tone: 'mint'
  }
]

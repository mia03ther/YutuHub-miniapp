/**
 * Profile page data: current user, contribution model and the menu lists.
 */

import type { Tone } from './brand'

export interface ProfileMenuItem {
  key: string
  label: string
  value: string
  icon: string
  tone: Tone
  /** Set for entries that navigate to a real destination. */
  route?: string
}

export interface ProfileUser {
  nickname: string
  wechatName: string
  school: string
  avatar: string
  signature: string
  level: string
  points: number
  followers: number
  following: number
  credits: number
}

/** Contributor levels, mirrored from the web app. */
export interface ContributorLevel {
  level: number
  name: string
  minContribution: number
}

export const CONTRIBUTOR_LEVELS: ContributorLevel[] = [
  { level: 1, name: '探索者', minContribution: 0 },
  { level: 2, name: '贡献者', minContribution: 200 },
  { level: 3, name: '搭建者', minContribution: 800 },
  { level: 4, name: '领航员', minContribution: 2000 },
  { level: 5, name: '架构师', minContribution: 5000 }
]

/**
 * Resolves the current level, progress toward the next one, and the label the
 * profile header needs. Returns zeroed values at the top level.
 */
export function resolveLevelProgress(contribution: number): {
  level: ContributorLevel
  next: ContributorLevel | null
  progress: number
  toNext: number
} {
  let current = CONTRIBUTOR_LEVELS[0]
  let next: ContributorLevel | null = null

  for (const candidate of CONTRIBUTOR_LEVELS) {
    if (contribution >= candidate.minContribution) {
      current = candidate
      next = null
      continue
    }
    next = candidate
    break
  }

  if (!next) {
    return { level: current, next: null, progress: 100, toNext: 0 }
  }

  const span = next.minContribution - current.minContribution
  const gained = contribution - current.minContribution

  return {
    level: current,
    next,
    progress: span > 0 ? Math.min(100, Math.round((gained / span) * 100)) : 100,
    toNext: next.minContribution - contribution
  }
}

export const MOCK_USER: ProfileUser = {
  nickname: '屿途同学',
  wechatName: 'Yutu_2026',
  school: '本校 · 信息学院',
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
    key: 'points',
    label: '贡献值规则',
    value: '',
    icon: '值',
    tone: 'orange',
    route: '/package-legal/points/points'
  },
  {
    key: 'privacy',
    label: '隐私保护指引',
    value: '',
    icon: '隐',
    tone: 'blue',
    route: '/package-legal/privacy/privacy'
  },
  {
    key: 'agreement',
    label: '社区公约',
    value: '',
    icon: '约',
    tone: 'blue',
    route: '/package-legal/agreement/agreement'
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
    label: '关于 YutuHub',
    value: 'v0.3.0',
    icon: 'i',
    tone: 'mint'
  }
]

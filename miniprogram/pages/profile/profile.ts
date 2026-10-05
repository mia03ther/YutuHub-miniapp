/**
 * Profile page. Storage reads are asynchronous so switching tabs never blocks
 * the render thread, and the level / contribution model mirrors the web app.
 */

import {
  MOCK_USER,
  PROFILE_MENUS,
  PROFILE_SETTINGS,
  resolveLevelProgress
} from '../../data'
import { logout } from '../../services/auth'
import { readStorage, writeStorage } from '../../utils/storage'

const STORAGE_KEY = 'yutu_user'

type ProfileUser = typeof MOCK_USER

const EMPTY_PROGRESS = resolveLevelProgress(MOCK_USER.points)

Page({
  data: {
    user: MOCK_USER as ProfileUser,
    menus: PROFILE_MENUS,
    settings: PROFILE_SETTINGS,
    authorized: false,
    draftNickname: '',
    progress: EMPTY_PROGRESS.progress,
    toNext: EMPTY_PROGRESS.toNext,
    nextLevelName: EMPTY_PROGRESS.next ? EMPTY_PROGRESS.next.name : ''
  },

  onShow() {
    void this.loadProfile()

    const tabBar = this.getTabBar() as unknown as
      | {
          setData: (data: Record<string, unknown>) => void
        }
      | undefined
    if (tabBar) {
      tabBar.setData({ selected: 3 })
    }
  },

  loadProfile(): Promise<void> {
    return readStorage<ProfileUser>(STORAGE_KEY).then(cached => {
      if (!cached || !cached.nickname) {
        return
      }
      this.applyUser(cached)
    })
  },

  /** Single place where the user object and its derived level UI are updated. */
  applyUser(user: ProfileUser): void {
    const level = resolveLevelProgress(user.points)

    this.setData({
      user,
      authorized: true,
      draftNickname: user.nickname,
      progress: level.progress,
      toNext: level.toNext,
      nextLevelName: level.next ? level.next.name : ''
    })
  },

  onChooseAvatar(e: WechatMiniprogram.CustomEvent) {
    const url = e.detail && e.detail.avatarUrl ? e.detail.avatarUrl : ''
    if (!url) {
      wx.showToast({ title: '未选择头像', icon: 'none' })
      return
    }
    this.setData({ 'user.avatar': url, authorized: true })
  },

  onNicknameInput(e: WechatMiniprogram.Input) {
    this.setData({ draftNickname: e.detail.value })
  },

  onSaveProfile() {
    const nickname = this.data.draftNickname.trim()
    if (!nickname) {
      wx.showToast({ title: '请先设置昵称', icon: 'none' })
      return
    }

    const user: ProfileUser = { ...this.data.user, nickname }
    void writeStorage(STORAGE_KEY, user).then(() => {
      this.applyUser(user)
      wx.showToast({ title: '资料已保存', icon: 'success' })
    })
  },

  onStatTap(e: WechatMiniprogram.TouchEvent) {
    const label = String(e.currentTarget.dataset.label)
    wx.showToast({ title: `${label}明细开发中`, icon: 'none' })
  },

  onMenuTap(e: WechatMiniprogram.TouchEvent) {
    const dataset = e.currentTarget.dataset as {
      key?: string
      route?: string
      label?: string
    }
    const key = dataset.key || ''
    const route = dataset.route

    if (route) {
      wx.navigateTo({ url: route })
      return
    }

    if (key === 'privacy') {
      wx.navigateTo({ url: '/package-legal/privacy/privacy' })
      return
    }
    if (key === 'agreement') {
      wx.navigateTo({ url: '/package-legal/agreement/agreement' })
      return
    }
    if (key === 'points') {
      wx.navigateTo({ url: '/package-legal/points/points' })
      return
    }
    if (key === 'feedback') {
      this.onFeedbackTap()
      return
    }

    wx.showToast({ title: `${dataset.label || '功能'}开发中`, icon: 'none' })
  },

  onPublishTap() {
    wx.switchTab({ url: '/pages/create/create' })
  },

  onFeedbackTap() {
    wx.setClipboardData({
      data: 'feedback@yutuhub.com'
    })
  },

  onLogout() {
    wx.showModal({
      title: '退出登录',
      content: '退出后会清除本地会话，草稿和发布记录保留',
      success: res => {
        if (res.confirm) {
          void logout()
        }
      }
    })
  },

  onShareAppMessage(): WechatMiniprogram.Page.ICustomShareContent {
    return {
      title: 'YutuHub · 连接校园知识，让 AI 加速成长',
      path: '/pages/index/index'
    }
  }
})

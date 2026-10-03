import {
  MOCK_USER,
  PROFILE_MENUS,
  PROFILE_SETTINGS
} from '../../data'

interface ProfileUser {
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

const STORAGE_KEY = 'yutu_user'

Page({
  data: {
    user: MOCK_USER as ProfileUser,
    menus: PROFILE_MENUS,
    settings: PROFILE_SETTINGS,
    authorized: false,
    draftNickname: ''
  },

  onShow() {
    const cached = wx.getStorageSync(STORAGE_KEY)
    if (cached && cached.nickname) {
      this.setData({
        user: cached as ProfileUser,
        authorized: true,
        draftNickname: cached.nickname
      })
    }
    const tabBar = this.getTabBar() as unknown as {
      setData: (data: Record<string, unknown>) => void
    } | undefined
    if (tabBar) {
      tabBar.setData({ selected: 2 })
    }
  },

  onChooseAvatar(e: WechatMiniprogram.CustomEvent) {
    const url = e.detail && e.detail.avatarUrl ? e.detail.avatarUrl : ''
    if (!url) {
      wx.showToast({
        title: '未选择头像',
        icon: 'none'
      })
      return
    }
    this.setData({
      'user.avatar': url,
      authorized: true
    })
  },

  onNicknameInput(e: WechatMiniprogram.Input) {
    this.setData({ draftNickname: e.detail.value })
  },

  onSaveProfile() {
    const nickname = this.data.draftNickname.trim()
    if (!nickname) {
      wx.showToast({
        title: '请先设置昵称',
        icon: 'none'
      })
      return
    }
    const user: ProfileUser = {
      ...this.data.user,
      nickname
    }
    wx.setStorageSync(STORAGE_KEY, user)
    this.setData({ user, authorized: true })
    wx.showToast({
      title: '资料已保存',
      icon: 'success'
    })
  },

  onStatTap(e: WechatMiniprogram.TouchEvent) {
    const label = String(e.currentTarget.dataset.label)
    wx.showToast({
      title: `${label}明细开发中`,
      icon: 'none'
    })
  },

  onMenuTap(e: WechatMiniprogram.TouchEvent) {
    const label = String(e.currentTarget.dataset.label)
    wx.showToast({
      title: `${label}开发中`,
      icon: 'none'
    })
  },

  onPublishTap() {
    wx.navigateTo({ url: '/pages/create/create' })
  },

  onAiLabTap() {
    wx.showToast({
      title: 'AI 创作台开发中',
      icon: 'none'
    })
  },

  onShareAppMessage(): WechatMiniprogram.Page.ICustomShareContent {
    return {
      title: '屿途校园 · AI Native Campus',
      path: '/pages/index/index'
    }
  }
})
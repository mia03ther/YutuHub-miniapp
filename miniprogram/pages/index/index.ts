import {
  FEATURE_ENTRIES,
  FEED_ITEMS,
  MOCK_USER,
  RECOMMEND_ITEMS,
  greetingByHour
} from '../../data/mock'

Page({
  data: {
    greeting: '',
    user: MOCK_USER,
    features: FEATURE_ENTRIES,
    feed: FEED_ITEMS,
    recommends: RECOMMEND_ITEMS
  },

  onLoad() {
    this.setData({
      greeting: greetingByHour(new Date().getHours())
    })
  },

  onShow() {
    const tabBar = this.getTabBar() as unknown as {
      setData: (data: Record<string, unknown>) => void
    } | undefined
    if (tabBar) {
      tabBar.setData({ selected: 0 })
    }
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    wx.showToast({
      title: '已是最新内容',
      icon: 'none'
    })
  },

  gotoExplore() {
    wx.switchTab({ url: '/pages/explore/explore' })
  },

  gotoProfile() {
    wx.switchTab({ url: '/pages/profile/profile' })
  },

  onSearchTap() {
    wx.showToast({
      title: '搜索功能开发中',
      icon: 'none'
    })
  },

  onFeatureSelect(e: WechatMiniprogram.CustomEvent) {
    const title = e.detail ? e.detail.title : ''
    wx.showToast({
      title: `${title} 频道开发中`,
      icon: 'none'
    })
  },

  onFeedTap(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id
    wx.showToast({
      title: `内容 ${id}`,
      icon: 'none'
    })
  },

  onToggleLike(e: WechatMiniprogram.TouchEvent) {
    const id = String(e.currentTarget.dataset.id)
    const feed = this.data.feed.map((item) => {
      if (item.id !== id) {
        return { ...item }
      }
      return {
        ...item,
        liked: !item.liked,
        likes: item.liked ? item.likes - 1 : item.likes + 1
      }
    })
    this.setData({ feed })
  },

  onRecommendTap() {
    wx.showToast({
      title: '资料详情开发中',
      icon: 'none'
    })
  },

  onMoreTap() {
    wx.showToast({
      title: '更多内容开发中',
      icon: 'none'
    })
  }
})
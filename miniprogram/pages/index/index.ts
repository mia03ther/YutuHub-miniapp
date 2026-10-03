import {
  BRAND,
  FEATURE_ENTRIES,
  MOCK_USER,
  RECOMMEND_GROUPS,
  RecommendGroup,
  greetingByHour
} from '../../data'
import type { FeedItem, RecommendItem } from '../../data'
import { fetchFeed, fetchRecommends } from '../../services/feed'

Page({
  data: {
    brand: BRAND,
    greeting: '',
    user: MOCK_USER,
    features: FEATURE_ENTRIES,
    feed: [] as FeedItem[],
    loading: true,
    error: '',
    recommendGroups: RECOMMEND_GROUPS,
    activeGroup: RECOMMEND_GROUPS[0],
    recommends: [] as RecommendItem[]
  },

  onLoad() {
    this.setData({
      greeting: greetingByHour(new Date().getHours())
    })
    this.loadFeed()
    this.loadRecommends()
  },

  onShow() {
    const tabBar = this.getTabBar() as unknown as {
      setData: (data: Record<string, unknown>) => void
    } | undefined
    if (tabBar) {
      tabBar.setData({ selected: 0 })
    }
  },

  loadFeed() {
    this.setData({ loading: true, error: '' })

    fetchFeed({ limit: 20 })
      .then((result) => {
        this.setData({ feed: result.items, loading: false })
      })
      .catch((err: Error) => {
        this.setData({ loading: false, error: err.message })
      })
  },

  loadRecommends(group?: string) {
    fetchRecommends(group)
      .then((recommends) => {
        this.setData({ recommends })
      })
      .catch((err: Error) => {
        wx.showToast({ title: err.message, icon: 'none' })
      })
  },

  onRetry() {
    this.loadFeed()
  },

  onPullDownRefresh() {
    this.loadFeed()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 600)
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
    const key = String(e.currentTarget.dataset.key || '')
    if (!key) {
      return
    }
    getApp<IAppOption>().globalData.pendingChannel = key
    wx.switchTab({ url: '/pages/explore/explore' })
  },

  onFeedTap(e: WechatMiniprogram.TouchEvent) {
    const detailId = String(e.currentTarget.dataset.detail || '')
    wx.navigateTo({ url: `/pages/detail/detail?id=${detailId}` })
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

  onRecommendGroupTap(e: WechatMiniprogram.TouchEvent) {
    const group = String(
      e.currentTarget.dataset.group
    ) as RecommendGroup
    this.setData({ activeGroup: group })
    this.loadRecommends(group)
  },

  onRecommendTap(e: WechatMiniprogram.TouchEvent) {
    const detailId = String(e.currentTarget.dataset.detail || '')
    wx.navigateTo({ url: `/pages/detail/detail?id=${detailId}` })
  },

  onMoreTap() {
    wx.showToast({
      title: '更多内容开发中',
      icon: 'none'
    })
  }
})

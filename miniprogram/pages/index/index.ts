import {
  BRAND,
  FEATURE_ENTRIES,
  MOCK_USER,
  RECOMMEND_GROUPS,
  resolveLevelProgress,
  greetingByHour
} from '../../data'
import type { FeedItem, RecommendItem, RecommendGroup } from '../../data'
import { fetchFeed, fetchRecommends } from '../../services/feed'

const PAGE_SIZE = 10

Page({
  data: {
    brand: BRAND,
    greeting: '',
    user: MOCK_USER,
    levelProgress: resolveLevelProgress(MOCK_USER.points).progress,
    features: FEATURE_ENTRIES,
    feed: [] as FeedItem[],
    loading: true,
    loadingMore: false,
    error: '',
    page: 1,
    hasMore: false,
    recommendGroups: RECOMMEND_GROUPS,
    activeGroup: RECOMMEND_GROUPS[0],
    recommends: [] as RecommendItem[]
  },

  onLoad() {
    this.setData({
      greeting: greetingByHour(new Date().getHours())
    })
    this.loadFeed(true)
    this.loadRecommends()
  },

  onShow() {
    const tabBar = this.getTabBar() as unknown as
      | {
          setData: (data: Record<string, unknown>) => void
        }
      | undefined
    if (tabBar) {
      tabBar.setData({ selected: 0 })
    }
  },

  loadFeed(reset: boolean) {
    const page = reset ? 1 : this.data.page + 1

    this.setData(
      reset ? { loading: true, error: '', page: 1 } : { loadingMore: true }
    )

    fetchFeed({ page, limit: PAGE_SIZE })
      .then(result => {
        this.setData({
          feed: reset ? result.items : this.data.feed.concat(result.items),
          page,
          hasMore: result.hasMore,
          loading: false,
          loadingMore: false
        })
      })
      .catch((err: Error) => {
        this.setData({ loading: false, loadingMore: false, error: err.message })
      })
  },

  loadRecommends(group?: string) {
    fetchRecommends(group)
      .then(recommends => {
        this.setData({ recommends })
      })
      .catch((err: Error) => {
        wx.showToast({ title: err.message, icon: 'none' })
      })
  },

  onRetry() {
    this.loadFeed(true)
  },

  onPullDownRefresh() {
    this.loadFeed(true)
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 600)
  },

  /** Infinite scroll: bindscrolltolower on the page view. */
  onReachBottom() {
    if (this.data.loadingMore || !this.data.hasMore || this.data.loading) {
      return
    }
    this.loadFeed(false)
  },

  gotoExplore() {
    wx.switchTab({ url: '/pages/explore/explore' })
  },

  gotoProfile() {
    wx.switchTab({ url: '/pages/profile/profile' })
  },

  onSearchTap() {
    wx.switchTab({ url: '/pages/explore/explore' })
  },

  gotoAgreement() {
    wx.navigateTo({ url: '/package-legal/agreement/agreement' })
  },

  onFeatureSelect(e: WechatMiniprogram.CustomEvent) {
    const key = String(e.currentTarget.dataset.key || '')
    if (!key || key === 'more') {
      wx.switchTab({ url: '/pages/explore/explore' })
      return
    }
    getApp<IAppOption>().globalData.pendingChannel = key
    wx.switchTab({ url: '/pages/explore/explore' })
  },

  onFeedTap(e: WechatMiniprogram.TouchEvent) {
    const detailId = String(e.currentTarget.dataset.detail || '')
    wx.navigateTo({ url: `/pages/detail/detail?id=${detailId}` })
  },

  /** Patches a single row instead of replacing the whole array. */
  onToggleLike(e: WechatMiniprogram.TouchEvent) {
    const id = String(e.currentTarget.dataset.id)
    const index = this.data.feed.findIndex(item => item.id === id)
    if (index < 0) {
      return
    }
    const target = this.data.feed[index]
    const liked = !target.liked

    this.setData({
      [`feed[${index}].liked`]: liked,
      [`feed[${index}].likes`]: liked ? target.likes + 1 : target.likes - 1
    })
  },

  onRecommendGroupTap(e: WechatMiniprogram.TouchEvent) {
    const group = String(e.currentTarget.dataset.group) as RecommendGroup
    this.setData({ activeGroup: group })
    this.loadRecommends(group)
  },

  onRecommendTap(e: WechatMiniprogram.TouchEvent) {
    const detailId = String(e.currentTarget.dataset.detail || '')
    wx.navigateTo({ url: `/pages/detail/detail?id=${detailId}` })
  },

  onShareAppMessage(): WechatMiniprogram.Page.ICustomShareContent {
    return {
      title: 'YutuHub · 连接校园知识，让 AI 加速成长',
      path: '/pages/index/index'
    }
  }
})

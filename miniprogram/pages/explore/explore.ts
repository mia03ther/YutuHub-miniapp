import { CHANNEL_TOPIC_MAP, EXPLORE_CHANNELS, EXPLORE_TOPICS } from '../../data'
import type { FeedItem, RecommendItem } from '../../data'
import { fetchFeed, fetchRecommends } from '../../services/feed'
import { openReportSheet } from '../../services/report'

const PAGE_SIZE = 10

Page({
  data: {
    channels: EXPLORE_CHANNELS,
    topics: EXPLORE_TOPICS,
    activeTopic: EXPLORE_TOPICS[0],
    activeTopicId: '',
    feed: [] as FeedItem[],
    loading: true,
    loadingMore: false,
    error: '',
    page: 1,
    hasMore: false,
    picks: [] as RecommendItem[],
    following: false
  },

  onLoad(options: Record<string, string | undefined>) {
    const channel = options ? options.channel : undefined
    if (channel) {
      this.applyChannel(channel)
    }
    this.loadDiscussions(true)
    this.loadPicks()
  },

  onShow() {
    this.applyChannel(getApp<IAppOption>().globalData.pendingChannel)

    const tabBar = this.getTabBar() as unknown as
      | {
          setData: (data: Record<string, unknown>) => void
        }
      | undefined
    if (tabBar) {
      tabBar.setData({ selected: 1 })
    }
  },

  onPullDownRefresh() {
    this.loadDiscussions(true)
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 600)
  },

  onReachBottom() {
    if (this.data.loadingMore || !this.data.hasMore || this.data.loading) {
      return
    }
    this.loadDiscussions(false)
  },

  loadDiscussions(reset: boolean) {
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

  loadPicks() {
    fetchRecommends()
      .then(items => {
        this.setData({ picks: items.slice(0, 3) })
      })
      .catch(() => {
        // Picks are decorative — silently keep the empty rail.
      })
  },

  onRetry() {
    this.loadDiscussions(true)
  },

  /**
   * Highlight the topic behind a channel key. `wx.switchTab` cannot carry
   * query params, so the home page hands the key over via globalData.
   */
  applyChannel(channel: string | undefined) {
    const app = getApp<IAppOption>()
    app.globalData.pendingChannel = undefined

    const topic = channel ? CHANNEL_TOPIC_MAP[channel] : undefined
    if (!topic) {
      return
    }

    this.setData({
      activeTopic: topic,
      activeTopicId: `topic-${topic}`
    })
  },

  onTopicTap(e: WechatMiniprogram.TouchEvent) {
    const topic = String(e.currentTarget.dataset.topic)
    this.setData({ activeTopic: topic, activeTopicId: `topic-${topic}` })
    this.loadDiscussions(true)
  },

  onChannelTap(e: WechatMiniprogram.TouchEvent) {
    const title = String(e.currentTarget.dataset.title)
    this.setData({ activeTopic: title, activeTopicId: `topic-${title}` })
    this.loadDiscussions(true)
  },

  onToggleFollow() {
    const following = !this.data.following
    this.setData({ following })
    wx.showToast({
      title: following ? '已关注该频道' : '已取消关注',
      icon: 'none'
    })
  },

  onFeedTap(e: WechatMiniprogram.TouchEvent) {
    const detailId = String(e.currentTarget.dataset.detail || '')
    if (detailId) {
      wx.navigateTo({ url: `/pages/detail/detail?id=${detailId}` })
    }
  },

  onReportTap(e: WechatMiniprogram.TouchEvent) {
    const id = String(e.currentTarget.dataset.id || '')
    if (!id) {
      return
    }
    openReportSheet({ targetId: id, targetType: 'post' })
  },

  onPickTap() {
    wx.navigateTo({ url: '/pages/explore/explore' })
  },

  onSearchTap() {
    wx.showToast({ title: '搜索功能开发中', icon: 'none' })
  },

  onShareAppMessage(): WechatMiniprogram.Page.ICustomShareContent {
    return {
      title: 'YutuHub 发现 · 找到同频的人',
      path: '/pages/explore/explore'
    }
  }
})

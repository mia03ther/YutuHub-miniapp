import {
  CHANNEL_TOPIC_MAP,
  EXPLORE_CHANNELS,
  EXPLORE_TOPICS
} from '../../data'
import type { FeedItem, RecommendItem } from '../../data'
import { fetchFeed, fetchRecommends } from '../../services/feed'

Page({
  data: {
    channels: EXPLORE_CHANNELS,
    topics: EXPLORE_TOPICS,
    activeTopic: EXPLORE_TOPICS[0],
    activeTopicId: '',
    feed: [] as FeedItem[],
    loading: true,
    error: '',
    picks: [] as RecommendItem[],
    following: false
  },

  onLoad(options: Record<string, string | undefined>) {
    const channel = options ? options.channel : undefined
    if (channel) {
      this.applyChannel(channel)
    }
    this.loadDiscussions()
    this.loadPicks()
  },

  onShow() {
    this.applyChannel(getApp<IAppOption>().globalData.pendingChannel)

    const tabBar = this.getTabBar() as unknown as {
      setData: (data: Record<string, unknown>) => void
    } | undefined
    if (tabBar) {
      tabBar.setData({ selected: 1 })
    }
  },

  loadDiscussions() {
    this.setData({ loading: true, error: '' })

    fetchFeed({ limit: 20 })
      .then((result) => {
        this.setData({ feed: result.items, loading: false })
      })
      .catch((err: Error) => {
        this.setData({ loading: false, error: err.message })
      })
  },

  loadPicks() {
    fetchRecommends()
      .then((items) => {
        this.setData({ picks: items.slice(0, 3) })
      })
      .catch(() => {
        // Picks are decorative — silently keep the empty rail.
      })
  },

  onRetry() {
    this.loadDiscussions()
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
  },

  onChannelTap(e: WechatMiniprogram.TouchEvent) {
    const title = String(e.currentTarget.dataset.title)
    this.setData({ activeTopic: title, activeTopicId: `topic-${title}` })
  },

  onToggleFollow() {
    this.setData({ following: !this.data.following })
    wx.showToast({
      title: this.data.following ? '已关注该频道' : '已取消关注',
      icon: 'none'
    })
  },

  onFeedTap(e: WechatMiniprogram.TouchEvent) {
    const detailId = String(e.currentTarget.dataset.detail || '')
    if (detailId) {
      wx.navigateTo({ url: `/pages/detail/detail?id=${detailId}` })
    }
  },

  onPickTap() {
    wx.showToast({
      title: '资料详情开发中',
      icon: 'none'
    })
  },

  onSearchTap() {
    wx.showToast({
      title: '搜索功能开发中',
      icon: 'none'
    })
  }
})
import {
  CHANNEL_TOPIC_MAP,
  EXPLORE_CHANNELS,
  EXPLORE_TOPICS,
  FEED_ITEMS,
  RECOMMEND_ITEMS
} from '../../data/mock'

Page({
  data: {
    channels: EXPLORE_CHANNELS,
    topics: EXPLORE_TOPICS,
    activeTopic: EXPLORE_TOPICS[0],
    feed: FEED_ITEMS,
    picks: RECOMMEND_ITEMS.slice(0, 3),
    following: false
  },

  onLoad(options: Record<string, string | undefined>) {
    const channel = options ? options.channel : undefined
    const topic = channel ? CHANNEL_TOPIC_MAP[channel] : undefined
    if (!topic) {
      return
    }
    this.setData({ activeTopic: topic })
  },

  onShow() {
    const tabBar = this.getTabBar() as unknown as {
      setData: (data: Record<string, unknown>) => void
    } | undefined
    if (tabBar) {
      tabBar.setData({ selected: 1 })
    }
  },

  onTopicTap(e: WechatMiniprogram.TouchEvent) {
    const topic = String(e.currentTarget.dataset.topic)
    this.setData({ activeTopic: topic })
  },

  onChannelTap(e: WechatMiniprogram.TouchEvent) {
    const title = String(e.currentTarget.dataset.title)
    this.setData({ activeTopic: title })
  },

  onToggleFollow() {
    this.setData({ following: !this.data.following })
    wx.showToast({
      title: this.data.following ? '已关注该频道' : '已取消关注',
      icon: 'none'
    })
  },

  onFeedTap() {
    wx.showToast({
      title: '内容详情开发中',
      icon: 'none'
    })
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
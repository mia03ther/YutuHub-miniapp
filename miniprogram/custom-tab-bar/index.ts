Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/index/index', text: '首页' },
      { pagePath: '/pages/explore/explore', text: '探索' },
      { pagePath: '/pages/profile/profile', text: '我的' }
    ]
  },

  methods: {
    onTap(e: WechatMiniprogram.TouchEvent) {
      const index = Number(e.currentTarget.dataset.index)
      const item = this.data.list[index]
      if (!item || index === this.data.selected) {
        return
      }
      wx.switchTab({ url: item.pagePath })
    }
  }
})
Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    title: {
      type: String,
      value: ''
    },
    subtitle: {
      type: String,
      value: ''
    },
    logoText: {
      type: String,
      value: '屿'
    },
    showLogo: {
      type: Boolean,
      value: true
    },
    sticky: {
      type: Boolean,
      value: true
    },
    bordered: {
      type: Boolean,
      value: true
    },
    showBack: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) {
        wx.navigateBack()
        return
      }
      wx.switchTab({ url: '/pages/index/index' })
    }
  }
})
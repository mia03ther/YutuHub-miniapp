App<IAppOption>({
  globalData: {
    apiBase: 'https://api.yutuhub.com/api',
    mockMode: true,
    loginCode: ''
  },

  onLaunch() {
    wx.login({
      success: (res) => {
        this.globalData.loginCode = res.code
        wx.setStorageSync('loginCode', res.code)
      },
      fail: () => {
        this.globalData.loginCode = ''
      }
    })
  }
})
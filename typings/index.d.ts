/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    apiBase: string,
    mockMode: boolean,
    loginCode: string,
    /** wx.switchTab cannot carry query params — explore reads this instead. */
    pendingChannel?: string
  },
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
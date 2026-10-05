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
  /** Fetch a fresh wx.login code and cache it asynchronously. */
  login(): void,
  /** Pre-open the privacy consent gate before any private-API call. */
  warmPrivacyAuthorization(): void,
}
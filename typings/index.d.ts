/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    apiBase: string,
    mockMode: boolean,
    loginCode: string
  },
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
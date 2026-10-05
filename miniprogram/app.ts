import { handlePrivacyAuthorization } from './services/auth'
import { reportEvent } from './utils/platform'
import { writeStorage } from './utils/storage'

/**
 * Environment switch. Flip `mockMode` to false once the REST API is reachable
 * and the request-domain whitelist is configured in the WeChat console.
 */
const API_BASE = 'https://api.yutuhub.com/api'

interface AppMethods {
  login(): void
  warmPrivacyAuthorization(): void
}

App<IAppOption>({
  globalData: {
    apiBase: API_BASE,
    mockMode: true,
    loginCode: '',
    pendingChannel: undefined
  },

  onLaunch() {
    this.login()
    this.warmPrivacyAuthorization()
  },

  /**
   * Fetch a login code once at launch. Written asynchronously so the render
   * thread is never blocked on disk I/O.
   */
  login(): void {
    wx.login({
      success: res => {
        this.globalData.loginCode = res.code
        writeStorage('loginCode', res.code)
      },
      fail: () => {
        this.globalData.loginCode = ''
      }
    })
  },

  /**
   * Pre-open the privacy consent gate so the first private-API call does not
   * surface a system dialog mid-interaction.
   */
  warmPrivacyAuthorization(): void {
    try {
      handlePrivacyAuthorization(() => undefined)
    } catch {
      // Older base libraries have no privacy gate; nothing to warm up.
    }
  },

  onNeedPrivacyAuthorization(resolve: () => void) {
    handlePrivacyAuthorization(() => resolve())
  },

  onUnhandledRejection() {
    // Call sites already surface their own messages; swallow the rest so the
    // platform does not surface a raw rejection dialog.
  },

  onError(message: unknown) {
    reportEvent('runtime_error', {
      message: String(message).slice(0, 200)
    })
  }
} as WechatMiniprogram.App.Options<IAppOption> & AppMethods)

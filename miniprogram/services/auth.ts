/**
 * WeChat login, session persistence and the platform privacy-authorisation
 * hook required for review.
 */

import { MOCK_USER } from '../data'
import { isMockMode, mockDelay, request } from './request'
import { readStorage, removeStorage, writeStorage } from '../utils/storage'

const SESSION_KEY = 'yutuhub_session'

export interface Session {
  code: string
  openid: string
  token: string
}

export interface CurrentUser {
  nickname: string
  wechatName: string
  school: string
  avatar: string
  signature: string
  level: string
  points: number
  followers: number
  following: number
  credits: number
}

/**
 * Exchange a wx.login code for a session.
 * Backend contract: POST /api/auth/login { code } → { code, openid, token }
 */
export function login(code: string): Promise<Session> {
  if (isMockMode()) {
    return mockDelay<Session>({
      code,
      openid: 'mock_openid_2026',
      token: 'mock_token'
    })
  }

  return request<Session>({
    url: '/auth/login',
    method: 'POST',
    data: { code }
  })
}

/** Trigger a fresh wx.login and persist the resulting session. */
export function loginAndStore(): Promise<Session> {
  return new Promise<Session>((resolve, reject) => {
    wx.login({
      success: res => {
        login(res.code)
          .then(session => {
            saveSession(session).then(() => resolve(session))
          })
          .catch(reject)
      },
      fail: () => reject(new Error('微信登录失败'))
    })
  })
}

export function saveSession(session: Session): Promise<void> {
  return writeStorage(SESSION_KEY, session)
}

export function getSession(): Promise<Session | null> {
  return readStorage<Session>(SESSION_KEY).then(stored =>
    stored && stored.token ? stored : null
  )
}

export function clearSession(): Promise<void> {
  return removeStorage(SESSION_KEY)
}

export function logout(): Promise<void> {
  return clearSession().then(() => {
    wx.showToast({ title: '已退出登录', icon: 'none' })
  })
}

export function fetchCurrentUser(): Promise<CurrentUser> {
  if (isMockMode()) {
    return mockDelay<CurrentUser>({ ...MOCK_USER })
  }
  return request<CurrentUser>({ url: '/users/me' })
}

/** Minimal privacy-authorisation shapes (absent from the bundled typings). */
interface PrivacyAuthorizeOptions {
  success?: () => void
  fail?: (err: { errMsg: string }) => void
}

interface RequirePrivacyAuthorizeParams extends PrivacyAuthorizeOptions {
  /** Base library ignores this; kept for signature parity with the docs. */
  complete?: () => void
}

/**
 * The platform calls this when an API that counts as private information is
 * invoked before the user has accepted the privacy policy. It is mandatory
 * from base library 2.32.3 and is checked during review.
 */
export function handlePrivacyAuthorization(
  resolve: () => void
): WechatMiniprogram.GeneralCallbackResult {
  const requireFn = (
    wx as unknown as {
      requirePrivacyAuthorize?: (params: RequirePrivacyAuthorizeParams) => void
    }
  ).requirePrivacyAuthorize

  if (typeof requireFn !== 'function') {
    resolve()
    return { errMsg: 'requirePrivacyAuthorize:ok' }
  }

  requireFn.call(wx, {
    success: resolve,
    fail: () => {
      // Older base libraries fall through to the explicit consent dialog.
      wx.showModal({
        title: '隐私保护指引',
        content:
          '使用屿途需要授权基础信息（头像、昵称）与内容发布权限。拒绝后将无法发布内容。',
        confirmText: '去设置',
        cancelText: '暂不',
        success: modal => {
          if (modal.confirm) {
            const openContract = (
              wx as unknown as {
                openPrivacyContract?: (params: { fail?: () => void }) => void
              }
            ).openPrivacyContract

            if (typeof openContract === 'function') {
              openContract.call(wx, {
                fail: () => {
                  wx.navigateTo({ url: '/pages/privacy/privacy' })
                }
              })
              return
            }
            wx.navigateTo({ url: '/pages/privacy/privacy' })
            return
          }
          resolve()
        },
        fail: () => resolve()
      })
    }
  })

  return { errMsg: 'ok' }
}

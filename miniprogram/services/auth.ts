/**
 * WeChat login and local session storage.
 *
 * wx.login is already issued in app.ts onLaunch; this module owns turning
 * that code into a session and persisting it locally.
 */

import { MOCK_USER } from '../data'
import { isMockMode, mockDelay, request } from './request'

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
      success: (res) => {
        login(res.code)
          .then((session) => {
            saveSession(session)
            resolve(session)
          })
          .catch(reject)
      },
      fail: () => reject(new Error('微信登录失败'))
    })
  })
}

export function saveSession(session: Session): void {
  wx.setStorageSync(SESSION_KEY, session)
}

export function getSession(): Session | null {
  const stored = wx.getStorageSync(SESSION_KEY)
  return stored && stored.token ? (stored as Session) : null
}

export function clearSession(): void {
  wx.removeStorageSync(SESSION_KEY)
}

export function logout(): void {
  clearSession()
  wx.showToast({ title: '已退出登录', icon: 'none' })
}

export function fetchCurrentUser(): Promise<CurrentUser> {
  if (isMockMode()) {
    return mockDelay<CurrentUser>({ ...MOCK_USER })
  }
  return request<CurrentUser>({ url: '/users/me' })
}
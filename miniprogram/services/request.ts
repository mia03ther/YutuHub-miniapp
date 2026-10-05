/**
 * Unified data access entry point.
 *
 * Every service function checks `mockMode` first:
 *   mockMode = true  → return mock data (with a small artificial delay so
 *                      loading / empty / error states are visible in demos)
 *   mockMode = false → go through wx.request against the REST API
 *
 * Switching to the real backend is therefore a single flag change in app.ts.
 */

/** Mirrors the response envelope returned by the Node.js API. */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  code?: number
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

/** Plain JSON payload accepted by wx.request. */
export type RequestPayload = Record<string, unknown> | string

export interface RequestOptions {
  url: string
  method?: HttpMethod
  data?: unknown
  header?: Record<string, string>
  timeout?: number
}

interface GlobalConfig {
  apiBase: string
  mockMode: boolean
}

/**
 * getApp() is unavailable while app.ts is still evaluating, so fall back to
 * mock mode instead of throwing at module load time.
 */
export function getConfig(): GlobalConfig {
  try {
    return getApp<IAppOption>().globalData
  } catch {
    return { apiBase: '', mockMode: true }
  }
}

export function isMockMode(): boolean {
  return getConfig().mockMode
}

/** Resolve after `delay` ms — used so mock reads still exercise loading UI. */
export function mockDelay<T>(value: T, delay = 400): Promise<T> {
  return new Promise<T>(resolve => {
    setTimeout(() => resolve(value), delay)
  })
}

/** Reject with a normalised Error so callers never see a raw wx failure. */
export function mockError(message: string, delay = 400): Promise<never> {
  return new Promise<never>((_resolve, reject) => {
    setTimeout(() => reject(new Error(message)), delay)
  })
}

/**
 * Perform a real HTTP request against the REST API.
 * Only called when mockMode is false.
 */
export function request<T>(options: RequestOptions): Promise<T> {
  const { apiBase } = getConfig()

  return new Promise<T>((resolve, reject) => {
    wx.request({
      url: `${apiBase}${options.url}`,
      method: options.method || 'GET',
      data: options.data as RequestPayload,
      timeout: options.timeout || 10000,
      header: {
        'content-type': 'application/json',
        ...options.header
      },
      success: res => {
        const body = res.data as ApiResponse<T>
        const ok = res.statusCode >= 200 && res.statusCode < 300

        if (ok && body && body.success) {
          resolve(body.data as T)
          return
        }
        reject(
          new Error((body && body.error) || `请求失败 (${res.statusCode})`)
        )
      },
      fail: err => {
        reject(new Error(err.errMsg || '网络异常，请稍后重试'))
      }
    })
  })
}

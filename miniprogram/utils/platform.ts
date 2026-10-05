/**
 * Typed access to platform APIs that the bundled WeChat typings predate.
 *
 * `wx.security.*` (content safety) and `wx.reportEvent` both landed after the
 * version of `miniprogram-api-typings` this project depends on. Declaring the
 * shapes locally keeps the call sites fully typed without patching vendored
 * type files.
 */

interface MsgSecCheckParams {
  content: string
  version: 2
  scene: 2
  success: (res: SecCheckResult) => void
  fail: (err: { errMsg: string }) => void
}

interface ImgSecCheckParams {
  img: string
  success: (res: SecCheckResult) => void
  fail: (err: { errMsg: string }) => void
}

interface SecCheckResult {
  errCode: number
  errMsg: string
  result?: {
    suggest: 'pass' | 'review' | 'risky'
    label?: number
  }
}

export interface SecurityApi {
  msgSecCheck(params: MsgSecCheckParams): void
  imgSecCheck(params: ImgSecCheckParams): void
}

interface EventApi {
  reportEvent(eventId: string, data: Record<string, string | number>): void
}

function resolve<T>(key: string): T | undefined {
  return (wx as unknown as Record<string, T>)[key]
}

/** Returns the content-safety API, or undefined when unavailable. */
export function getSecurityApi(): SecurityApi | undefined {
  return resolve<SecurityApi>('security')
}

/** Reports an analytics event when the platform supports it. */
export function reportEvent(
  eventId: string,
  data: Record<string, string | number>
): void {
  const api = resolve<EventApi>('reportEvent')
  if (api) {
    api.reportEvent(eventId, data)
  }
}

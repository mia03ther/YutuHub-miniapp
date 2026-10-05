/**
 * Content safety checks required before any user text or image is published.
 *
 * `wx.security.msgSecCheck` / `imgSecCheck` only work once the account has the
 * content-security capability enabled in the WeChat console. When it is not
 * available the caller gets `unsupported` and can fall back to the backend
 * moderation endpoint.
 */

import { getSecurityApi } from '../utils/platform'
import { request } from './request'

export type CheckOutcome = 'pass' | 'review' | 'risky' | 'unsupported'

interface SecCheckResult {
  errCode: number
  errMsg: string
  result?: {
    suggest: 'pass' | 'review' | 'risky'
    label?: number
  }
}

function classify(res: SecCheckResult): CheckOutcome {
  if (res.errCode === 0 && res.result) {
    const suggest = res.result.suggest
    return suggest === 'pass' ? 'pass' : (suggest as CheckOutcome)
  }
  return 'unsupported'
}

function describe(outcome: CheckOutcome): string {
  if (outcome === 'risky') {
    return '内容包含违规信息，请修改后再发布'
  }
  if (outcome === 'review') {
    return '内容需要人工审核，暂时无法发布'
  }
  return '内容审核服务未开通，请稍后重试'
}

/** Resolves when publishing may continue; rejects with a user-facing message. */
export function checkText(content: string): Promise<CheckOutcome> {
  const api = getSecurityApi()

  if (!api) {
    return Promise.resolve('unsupported')
  }

  return new Promise<CheckOutcome>((resolve, reject) => {
    api.msgSecCheck({
      content,
      version: 2,
      scene: 2,
      success: (res: SecCheckResult) => {
        const outcome = classify(res)
        if (outcome === 'pass') {
          resolve('pass')
          return
        }
        reject(new Error(describe(outcome)))
      },
      fail: () => reject(new Error(describe('unsupported')))
    })
  })
}

/** Same resolve / reject contract as checkText. */
export function checkImage(filePath: string): Promise<CheckOutcome> {
  const api = getSecurityApi()

  if (!api) {
    return Promise.resolve('unsupported')
  }

  return new Promise<CheckOutcome>((resolve, reject) => {
    api.imgSecCheck({
      img: filePath,
      success: (res: SecCheckResult) => {
        const outcome = classify(res)
        if (outcome === 'pass') {
          resolve('pass')
          return
        }
        reject(new Error(describe(outcome)))
      },
      fail: () => reject(new Error(describe('unsupported')))
    })
  })
}

/**
 * Server-side fallback used when the mini program capability is not enabled.
 * Resolves normally when the backend raises no moderation error.
 */
export async function checkTextViaApi(content: string): Promise<void> {
  try {
    await request({
      url: '/moderation/text',
      method: 'POST',
      data: { content },
      timeout: 8000
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : ''
    if (message.includes('审核') || message.includes('违规')) {
      throw new Error(message)
    }
  }
}

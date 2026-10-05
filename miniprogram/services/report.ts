/**
 * Content reporting. WeChat review requires a reporting entry point that is
 * reachable from every piece of user-generated content.
 */

import { request } from './request'

export type ReportReason =
  'porn' | 'political' | 'ad' | 'plagiarism' | 'fraud' | 'abuse' | 'other'

interface ReportPayload {
  targetId: string
  targetType: 'post' | 'comment'
  reason: ReportReason
  detail?: string
  /** Set by the backend from the session; sent for optimistic UI only. */
  openid?: string
}

export const REPORT_REASONS: ReadonlyArray<{
  value: ReportReason
  label: string
}> = [
  { value: 'porn', label: '色情低俗' },
  { value: 'political', label: '违法违规' },
  { value: 'ad', label: '广告或垃圾营销' },
  { value: 'plagiarism', label: '抄袭他人内容' },
  { value: 'fraud', label: '欺诈信息' },
  { value: 'abuse', label: '不友善或人身攻击' },
  { value: 'other', label: '其他' }
]

/** POST /api/reports */
export function submitReport(payload: ReportPayload): Promise<{ id: number }> {
  return request<{ id: number }>({
    url: '/reports',
    method: 'POST',
    data: payload,
    timeout: 8000
  })
}

/**
 * Opens the platform's native report sheet. When unavailable we fall back to
 * our own reason picker so the entry point is never a dead end.
 */
export function openReportSheet(options: {
  targetId: string
  targetType?: 'post' | 'comment'
}): void {
  if (typeof wx.reportAnalytics === 'function') {
    // Keep the platform-level complaint path warm without relying on it.
    wx.reportAnalytics('report_entry', {
      target: options.targetId
    })
  }

  const labels = REPORT_REASONS.map(item => item.label)
  wx.showActionSheet({
    itemList: labels,
    alertText: '取消',
    success: res => {
      const picked = REPORT_REASONS[res.tapIndex]
      if (!picked) {
        return
      }
      wx.showLoading({ title: '提交中', mask: true })
      submitReport({
        targetId: options.targetId,
        targetType: options.targetType || 'post',
        reason: picked.value
      })
        .then(() => {
          wx.hideLoading()
          wx.showToast({
            title: '已收到，我们会尽快处理',
            icon: 'none',
            duration: 2000
          })
        })
        .catch((err: Error) => {
          wx.hideLoading()
          wx.showToast({ title: err.message, icon: 'none' })
        })
    }
  })
}
